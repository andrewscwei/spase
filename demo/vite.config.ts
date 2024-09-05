import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  root: __dirname,
  base: mode === 'production' ? '/spase/' : '/',
  build: {
    outDir: path.resolve(__dirname, '../.gh-pages'),
    target: 'esnext',
  },
  resolve: {
    alias: {
      spase: path.resolve(__dirname, '../'),
    },
  },
}))
