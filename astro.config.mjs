// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://archive.ekin.zone',
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: 'always',
  },
  fonts: [{
    provider: fontProviders.local(),
    name: "Oswald",
    cssVariable: "--font-family-oswald",
    options: {
      variants: [{
        weight: "200 700",
        style: "normal",
        src: ["./src/assets/fonts/Oswald-VariableFont_wght.woff2"],
      }],
    },
  }],
});
