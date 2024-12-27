import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      overlay: false,
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
});
