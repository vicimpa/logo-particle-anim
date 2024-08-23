<script lang="ts">
  import { Point } from "$class/Point";
  import { Vec2 } from "$class/Vec2";
  import { onFrame } from "$hooks/onFrame";
  import { getImageData } from "$library/image";
  import { PI2, random } from "$library/math";

  export let src: string;
  export let size = 1;
  export let r = 100;
  export let a = 0.1;
  export let p = 1;

  export let padding = 0;
  export let paddingX = padding;
  export let paddingY = padding;
  export let paddingTop = paddingY;
  export let paddingLeft = paddingX;
  export let paddingRight = paddingX;
  export let paddingBottom = paddingY;

  let can: HTMLCanvasElement;
  $: ctx = can?.getContext("2d");

  var mouse = new Vec2(-1000);
  var points: Point[] = [];

  let width = 0;
  let height = 0;

  $: getImageData(src, size).then(
    ({ data, width: _width, height: _height }) => {
      const data32 = new Uint32Array(data.buffer);

      width = _width + paddingLeft + paddingRight;
      height = _height + paddingTop + paddingBottom;

      const center = new Vec2(width, height).times(0.5);

      for (let y = 0; y < _height; y++) {
        for (let x = 0; x < _width; x++) {
          const index = x + y * _width;
          const color = data32[index];

          if (!color) continue;
          if (Math.random() > a) continue;
          const point = new Point(color, x + paddingLeft, y + paddingTop, p);

          point.set(
            Vec2.fromAngle(PI2 * random())
              .times(random())
              .times(0.5)
              .times(width, height)
              .plus(center),
          );

          // point.x = random() * width;
          // point.y = random() * height;
          points.push(point);
        }
      }
      console.log(points.length);
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
      point.render(ctx);
    }
  });
</script>

<svelte:window
  on:mousemove={(e) => {
    if (!can) return;
    mouse.set(e.clientX, e.clientY);
    mouse.minus(can.getBoundingClientRect());
  }}
/>
<canvas bind:this={can} />
