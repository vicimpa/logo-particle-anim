import { PI2, absMin, max, min, random } from "$library/math";

import { Vec2 } from "./Vec2";

export class Point extends Vec2 {
  start: Vec2;
  color: string;

  dir = random() * PI2;
  speed = 0;

  constructor(
    color: number,
    x: number,
    y: number,
    public p: number = 1
  ) {
    super(x, y);
    this.start = new Vec2(x, y);
    this.color = this.intToHex(color);
  }

  intToHex(int: number) {
    return `rgba(${[
      int,
      int >> 8,
      int >> 16,
      int >> 24
    ].map(e => e & 0xff).join(',')})`;
  }

  tick(dtime: number, time: number, mouse: Vec2, size = 100) {
    const delta = this.start.cminus(this);
    const mdelta = mouse.cminus(this);
    const mdistance = mdelta.hypot();

    if (mdistance < size) {
      delta.minus(mdelta.norm().times(size - mdistance).times(.5));
    }

    const needSpeed = max(delta.hypot(), 0);
    const needAngle = delta.angle();

    delta.plus(Vec2.fromRandom());

    this.speed += (needSpeed - this.speed) * 0.01 * dtime;
    this.dir += absMin(needAngle - this.dir, needAngle - this.dir + PI2) * 0.01 * dtime;

    this.plus(Vec2.fromAngle(this.dir).times(this.speed).times(0.01).times(dtime));
  }

  render(ctx: CanvasRenderingContext2D) {
    const { x, y, p, color } = this;

    ctx.fillStyle = color;
    ctx.fillRect(x - p / 2, y - p / 2, p, p);
  }
}