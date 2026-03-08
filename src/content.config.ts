import { z, defineCollection, reference } from 'astro:content';

import { glob } from 'astro/loaders';

const thoughtCollection = defineCollection({
   loader: glob({ pattern: "*.mdx", base: "./src/content/thought/"}),
   schema: z.object({
      title: z.string(),
      brief: z.string(),
      date: z.date(),
   })
});

const mediaCollection = defineCollection({
   loader: glob({ pattern: "*.mdx", base: "./src/content/media"}),
   schema: z.object({
      name: z.string(),
      type: z.enum(["music", "film", "literature", "art", "etc"]),
      brief: z.string().optional(),
      date: z.date(),
   })
});

const essayCollection = defineCollection({
   loader: glob({ pattern: "*.mdx", base: "./src/content/essay" }),
   schema: z.object({
      title: z.string(),
      brief: z.string(),
      date: z.date(),
   })
});

const projectCollection = defineCollection({
   loader: glob({ pattern: "*.mdx", base: "./src/content/project"}),
   schema: z.object({
      writeup: reference('writeup'),
      title: z.string(),
      date: z.date(),
   })
})

const writeupCollection = defineCollection({
   loader: glob({ pattern: "*.mdx", base: "./src/content/writeup" }),
   schema: z.object({
      title: z.string(),
   })
})

const fictionCollection = defineCollection({
   loader: glob({ pattern: "*.md", base: "./src/content/fiction" }),
   schema: z.object({
      title: z.string(),
      brief: z.string(),
      date: z.date(),
   })
})

export const collections = {
   'thought': thoughtCollection,
   'media': mediaCollection,
   'essay': essayCollection,
   'fiction': fictionCollection,
   'project': projectCollection,
   'writeup': writeupCollection,
};
