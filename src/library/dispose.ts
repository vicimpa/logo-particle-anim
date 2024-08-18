export type TDispose = (void | (() => void));

export const dispose = (...args: TDispose[]) => {
  return () => {
    args.forEach((arg) => arg instanceof Function && arg());
  };
};