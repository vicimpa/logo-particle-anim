<script lang="ts">
  import { Point } from "$class/Point";
  import { Vec2 } from "$class/Vec2";
  import { onFrame } from "$hooks/onFrame";
  import { getImageData } from "$library/image";

  export let src: string;
  export let size = 1;
  export let padding = 0;
  export let r = 100;
  export let a = 0.1;
  export let p = 1;

  let can: HTMLCanvasElement;
  $: ctx = can?.getContext("2d");

  var mouse = new Vec2();
  var points: Point[] = [];

  let width = 0;
  let height = 0;

  $: getImageData(src, size).then(
    ({ data, width: _width, height: _height }) => {
      const data32 = new Uint32Array(data.buffer);

      width = _width + padding * 2;
      height = _height + padding * 2;

      for (let y = 0; y < _height; y++) {
        for (let x = 0; x < _width; x++) {
          const index = x + y * _width;
          const color = data32[index];

          if (!color) continue;
          if (Math.random() > a) continue;
          points.push(new Point(color, x, y));
        }
      }
    },
  );

  onFrame((dtime, time) => {
    if (!can) return;
    if (!ctx) return;

    if (can.width !== width || can.height !== height)
      Object.assign(can, { width, height });

    ctx.clearRect(0, 0, width, height);

    for (const point of points) {
      point.tick(dtime, time, mouse, r);
      ctx.fillStyle = point.color;
      ctx.fillRect(padding + point.x - p / 2, padding + point.y - p / 2, p, p);
    }
  });
</script>

<svelte:window
  on:mousemove={(e) => {
    if (!can) return;
    mouse.set(e.clientX, e.clientY);
    mouse.minus(can.getBoundingClientRect()).minus(padding);
  }}
/>
<canvas bind:this={can} />
