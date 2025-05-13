import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'spase',
    },
    outDir: resolve(__dirname, 'build'),
    rollupOptions: {
      treeshake: 'smallest',
    },
    target: 'esnext',
  },
  plugins: [
    dts(),
  ],
  test: {
    coverage: {
      reporter: ['text-summary'],
      provider: 'v8',
    },
    environment: 'happy-dom',
    globals: true,
    include: [
      '**/*.spec.ts',
    ],
  },
})
