import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/finde-den-schatz/', // Setze das Basisverzeichnis auf deinen Repository-Namen
  build: {
    outDir: 'dist'
  },
  plugins: [react()],
})
