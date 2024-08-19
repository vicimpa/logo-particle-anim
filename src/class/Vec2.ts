import { PI2, atan2, cos, hypot, random, sin } from "$library/math";

export type TVec2 = {
  x: number,
  y: number;
} | [
  x: number,
  y: number
];

export type AVec2 =
  | []
  | [xy: number]
  | [x: number, y: number]
  | [vec: TVec2];

function _vec<T extends (x: number, y: number) => any>(
  args: AVec2,
  run: T
): ReturnType<T> {
  var [x = 0] = args;

  if (typeof x === "number") {
    var [_, y = x] = args;
    return run(x, y);
  }

  if (Array.isArray(x))
    return run(...x);

  return run(x.x, x.y);
}

export class Vec2 {
  x = 0;
  y = 0;

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }

  constructor(...args: AVec2) {
    _vec(args, (x, y) => {
      this.x = x;
      this.y = y;
    });
  }

  static fromAngle(angle: number) {
    return new this(cos(angle), sin(angle));
  }
  static fromRandom() {
    return new this(random(), random());
  }

  clone() {
    return new Vec2(this);
  }

  set(...args: AVec2) {
    _vec(args, (x, y) => {
      this.x = x;
      this.y = y;
    });

    return this;
  }

  hypot() {
    return hypot(...this);
  }

  angle() {
    var a = atan2(this.y, this.x);
    return a < 0 ? a + PI2 : a;
  }

  plus(...args: AVec2) {
    _vec(args, (x, y) => {
      this.x += x;
      this.y += y;
    });

    return this;
  }

  minus(...args: AVec2) {
    _vec(args, (x, y) => {
      this.x -= x;
      this.y -= y;
    });

    return this;
  }

  times(...args: AVec2) {
    _vec(args, (x, y) => {
      this.x *= x;
      this.y *= y;
    });

    return this;
  }

  div(...args: AVec2) {
    _vec(args, (x, y) => {
      this.x /= x;
      this.y /= y;
    });

    return this;
  }

  pow(...args: AVec2) {
    _vec(args, (x, y) => {
      this.x **= x;
      this.y **= y;
    });

    return this;
  }

  rem(...args: AVec2) {
    _vec(args, (x, y) => {
      this.x = this.x % x;
      this.y = this.y % y;
    });

    return this;
  }

  norm() {
    return this.div(this.hypot());
  }

  cplus(...args: AVec2) {
    return this.clone().plus(...args);
  }

  cminus(...args: AVec2) {
    return this.clone().minus(...args);
  }

  ctimes(...args: AVec2) {
    return this.clone().times(...args);
  }

  cdiv(...args: AVec2) {
    return this.clone().div(...args);
  }

  crem(...args: AVec2) {
    return this.clone().rem(...args);
  }

  cpow(...args: AVec2) {
    return this.clone().pow(...args);
  }

  cnorm() {
    return this.clone().norm();
  }
}