export const rem = (v: number, a: number): number => {
  if (!isFinite(v)) v = 0;
  if (v < 0) return rem(v + a, a);
  return v % a;
};

export const {
  abs,
  acos,
  acosh,
  asin,
  asinh,
  atan,
  atan2,
  atanh,
  cbrt,
  ceil,
  clz32,
  cos,
  cosh,
  E,
  exp,
  expm1,
  floor,
  fround,
  hypot,
  imul,
  log,
  log10,
  log1p,
  log2,
  LN10,
  LN2,
  LOG10E,
  LOG2E,
  max,
  min,
  pow,
  PI,
  random,
  round,
  sign,
  sin,
  sinh,
  sqrt,
  SQRT1_2,
  SQRT2,
  tan,
  tanh,
  trunc
} = Math;

export const DPI = PI / 2;
export const PI2 = PI * 2;

export const absMin = (...args: number[]) => {
  var min = Infinity, index = -1;

  for (var i = 0; i < args.length; i++) {
    var cur = abs(args[i]);

    if (cur < min) {
      min = cur;
      index = i;
    }
  }

  return args[index] ?? null;
};