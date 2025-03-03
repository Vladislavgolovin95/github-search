import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/github-search/',
  build: {
    outDir: './docs',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      src: "/src"
    },
  },
})
