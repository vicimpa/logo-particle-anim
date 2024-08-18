export type TFrame = (dtime: number, time: number) => any;

var FRAMES = new Set<TFrame>();

var dtime = 0;
var time = performance.now();

function loop(_time: number) {
  requestAnimationFrame(loop);
  dtime = _time - time;
  time = _time;
  FRAMES.forEach(run);
}

requestAnimationFrame(loop);

function run<T extends TFrame>(frame: T) {
  return frame(dtime, time) as ReturnType<T>;
}

export function frames<T extends TFrame>(frame: T) {
  FRAMES.add(frame);
  return () => { FRAMES.delete(frame); };
}
