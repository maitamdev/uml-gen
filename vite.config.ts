import { defineConfig } from 'vite';
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          mermaid: ['mermaid'],
          marked: ['marked'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
