// @ts-check
import { defineConfig } from 'astro/config';
import sitegraphSitemapIntegration from 'starlight-site-graph/integration';
import tailwindcss from '@tailwindcss/vite';
import mdx from "@astrojs/mdx";

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  vite: {
    plugins: [tailwindcss(), mdx()]
  },

  site: "https://colton.place",
  trailingSlash: "never",

  integrations: [mdx(), react(), sitegraphSitemapIntegration()]
});