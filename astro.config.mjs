import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  output: "static",
  adapter: vercel(),
   markdown: {
      shikiConfig: {
         theme: 'everforest-dark',
      },
   },
   image: {
      responsiveStyles: true,
      layout: 'constrained',
   }
});
