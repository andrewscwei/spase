import path from 'node:path'
import { defineConfig } from 'vite'

const __dirname = import.meta.dirname

export default defineConfig(({ mode }) => ({
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
  root: __dirname,
}))
