import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  CLOUDINARY_USERNAME: z.string(),
});

const env = envSchema.parse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  CLOUDINARY_USERNAME: process.env.NEXT_PUBLIC_CLOUDINARY_USERNAME,
});

export default env;
