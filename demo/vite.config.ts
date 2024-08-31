import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: path.resolve(__dirname, '../.gh-pages'),
    target: 'esnext',
  },
  resolve: {
    alias: {
      spase: path.resolve(__dirname, '../'),
    },
  },
})
