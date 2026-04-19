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
    target: 'esnext',
  },
  plugins: [
    dts(),
  ],
  test: {
    coverage: {
      provider: 'v8',
      reportsDirectory: resolve(__dirname, 'coverage'),
    },
    environment: 'happy-dom',
    globals: true,
    include: [
      '**/*.spec.ts',
      '**/*.test.ts',
    ],
    passWithNoTests: true,
    reporters: [
      'tree',
      ...process.env.GITHUB_ACTIONS === 'true' ? ['github-actions'] : [],
    ],
  },
})
