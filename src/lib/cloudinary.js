export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};

export function getCloudinaryUrl(publicId, options = {}) {
  const { width = 800, height, quality = 'auto', format = 'auto' } = options;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const transforms = [`q_${quality}`, `f_${format}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(',')}/${publicId}`;
}
