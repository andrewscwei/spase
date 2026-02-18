import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/spase/' : '/',
  build: {
    outDir: path.resolve(__dirname, '../.gh-pages'),
    rollupOptions: {
      treeshake: 'smallest',
    },
    target: 'esnext',
  },
  resolve: {
    alias: {
      spase: path.resolve(__dirname, '../'),
    },
  },
  root: __dirname,
}))
