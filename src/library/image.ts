const can = document.createElement('canvas');
const ctx = can.getContext('2d')!;

if (!ctx)
  throw new Error('Can not load canvas!');

export async function getImageData(src: string, size = 1) {
  const img = await loadImage(src);
  const width = img.width * size | 0;
  const height = img.height * size | 0;
  can.width = width;
  can.height = height;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
}

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}