<script lang="ts" context="module">
  class Point {
    _x: number;
    _y: number;

    color: string;

    time = 0;

    _dx = 0;
    _dy = 0;

    constructor(
      color: number,
      public x: number,
      public y: number,
    ) {
      this._x = x;
      this._y = y;
      this._dx = Math.random();
      this._dy = Math.random();
      this.color = this.intToRgb(color);
    }

    intToRgb(int: number) {
      return `rgba(${int & 0xff}, ${(int >> 8) & 0xff}, ${(int >> 16) & 0xff}, ${(int >> 24) & 0xff})`;
    }

    tick(dtime: number, time: number) {
      this._x = this.x + Math.cos(time * 0.01 * this._dx) * 2;
      this._y = this.y + Math.sin(time * 0.01 * this._dy) * 2;
    }
  }
</script>

<script lang="ts">
  import { onFrame } from "$hooks/onFrame";
  import { getImageData } from "$library/image";

  export let src: string;

  let a = 0.1;

  let can: HTMLCanvasElement;
  $: ctx = can?.getContext("2d");

  const points: Point[] = [];

  let width = 0;
  let height = 0;

  getImageData(src).then(({ data, width: _width, height: _height }) => {
    const data32 = new Uint32Array(data.buffer);

    width = _width;
    height = _height;

    for (let y = 0; y < _height; y++) {
      for (let x = 0; x < _width; x++) {
        const index = x + y * width;
        const color = data32[index];

        if (!color) continue;
        if (Math.random() > a) continue;
        points.push(new Point(color, x, y));
      }
    }
  });

  onFrame((dtime, time) => {
    if (!can) return;
    if (!ctx) return;

    if (can.width !== width || can.height !== height)
      Object.assign(can, { width, height });

    ctx.clearRect(0, 0, width, height);

    for (const point of points) {
      point.tick(dtime, time);
      ctx.fillStyle = point.color;
      ctx.fillRect(point._x - 1, point._y - 1, 2, 2);
    }
  });
</script>

<img {src} />
<canvas bind:this={can} />
