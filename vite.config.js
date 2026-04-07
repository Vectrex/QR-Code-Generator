import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  build: {
    lib: {
      entry: ['src/lib.js'],
    },
  },
  plugins: [
    tailwindcss(),
  ],
})
