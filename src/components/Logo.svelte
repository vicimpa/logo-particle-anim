<script lang="ts">
  import { Point } from "$class/Point";
  import { Vec2 } from "$class/Vec2";
  import { onFrame } from "$hooks/onFrame";
  import { getImageData } from "$library/image";
  import { absMin, PI2 } from "$library/math";

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

      for (let y = 0; y < _height; y++) {
        for (let x = 0; x < _width; x++) {
          const index = x + y * _width;
          const color = data32[index];

          if (!color) continue;
          if (Math.random() > a) continue;
          points.push(new Point(color, x + paddingLeft, y + paddingTop, p));
        }
      }
    },
  );

  var angle = 0;
  var delta = 0;

  onFrame((dtime, time) => {
    if (!can) return;
    if (!ctx) return;

    if (can.width !== width || can.height !== height)
      Object.assign(can, { width, height });

    ctx.clearRect(0, 0, width, height);

    // const radius = 200;

    // const center = new Vec2(width, height).times(0.5);

    // const needAngle = mouse.cminus(center).angle();
    // const delta = absMin(needAngle - angle, needAngle - angle + PI2);

    // angle += delta * 0.01 * dtime;

    // const point = Vec2.fromAngle(needAngle).times(radius).plus(center);
    // const point2 = Vec2.fromAngle(angle).times(radius).plus(center);

    // ctx.beginPath();
    // ctx.strokeStyle = "#fff";
    // ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    // ctx.moveTo(center.x, center.y);
    // ctx.lineTo(point.x, point.y);
    // ctx.moveTo(center.x, center.y);
    // ctx.lineTo(point2.x, point2.y);
    // ctx.stroke();
    // ctx.closePath();

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
