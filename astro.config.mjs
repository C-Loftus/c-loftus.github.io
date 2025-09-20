// @ts-check
import { defineConfig } from 'astro/config';
import sitegraphSitemapIntegration from 'starlight-site-graph/integration';
import tailwindcss from '@tailwindcss/vite';
import mdx from "@astrojs/mdx";
import { remarkModifiedTime } from './remark-modified-time.mjs';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  vite: {
    plugins: [tailwindcss(), mdx()]
  },
  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },

  site: "https://colton.place",

  integrations: [mdx(), react(), sitegraphSitemapIntegration({
    sitemapConfig: {
      contentRoot: "./src/pages",
    },
    graphConfig: {
      depth: 2,
      repelForce: 350,
      linkDistance: 75
    }
  })]
});
