import { z, defineCollection } from 'astro:content';

const thoughtCollection = defineCollection({
   type: 'content',
   schema: z.object({
      title: z.string(),
      brief: z.string(),
   })
});

const mediaCollection = defineCollection({
   type: 'content',
   schema: z.object({
      name: z.string(),
      type: z.enum(["music", "film", "literature", "art", "etc"]),
      brief: z.string().optional(),
   })
});

const essayCollection = defineCollection({
   type: 'content',
   schema: z.object({
      title: z.string(),
      brief: z.string(),
   })
});

export const collections = {
   'thought': thoughtCollection,
   'media': mediaCollection,
   'essay': essayCollection,
};
