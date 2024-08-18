const can = document.createElement('canvas');
const ctx = can.getContext('2d')!;

if (!ctx)
  throw new Error('Can not load canvas!');

export async function getImageData(src: string) {
  const img = await loadImage(src);
  can.width = img.width;
  can.height = img.height;
  ctx.clearRect(0, 0, img.width, img.height);
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height);
}

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}