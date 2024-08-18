import { Vec2 } from "./Vec2";

export class Point extends Vec2 {
  start = this.clone();
  need = this.clone();
  color: string;

  constructor(
    color: number,
    x: number,
    y: number,
  ) {
    super(x, y);
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
    const mod = this.start.cminus(mouse);
    const length = mod.hypot() / size;

    if (length > 1)
      this.need.set(this.start);
    else {
      const delta = mod.cnorm().times(size).times(length ** length);
      this.need.set(
        this.start.cplus(delta)
      );
    }

    const delta = this.need.cplus(new Vec2().rand().times(2).minus(1).times(10))
      .cminus(this)
      .times(.01)
      .times(dtime);

    this.plus(delta);
  }
}