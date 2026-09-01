import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://<user>.github.io/books/
export default defineConfig({
  base: '/books/',
  plugins: [react()],
})
