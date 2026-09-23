import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        portal: resolve(import.meta.dirname, 'index.html'),
        original: resolve(import.meta.dirname, 'tese-original.html'),
        inteligente: resolve(import.meta.dirname, 'capital-inteligente.html'),
      },
    },
  },
})
