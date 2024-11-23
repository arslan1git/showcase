import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(800),
  category: z.string().min(3).max(40),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url);
        const contentType = res.headers.get("content-type");
        return contentType?.includes("image") || url.match(/\.(jpg|jpeg|png|gif|webp)$/i);
      } catch {
        return false;
      }
    }, "URL must be a valid image link"),
  pitch: z.string().min(10),
});