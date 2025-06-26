import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),compression({
      algorithm: 'brotliCompress', // ou 'gzip'
      ext: '.br', // ou .gz
      threshold: 1024, // ne compresse pas les fichiers < 1 Ko
    })],
})


