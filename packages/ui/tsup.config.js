import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  const isWatching = !!options.watch
  const shouldCreateTypeDefinitions = true

  return {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs', 'iife'],
    clean: true,
    splitting: true,
    sourcemap: isWatching,
    minify: !isWatching,
    dts: shouldCreateTypeDefinitions,
    external: ['react'],
    env: {
      NODE_ENV: isWatching ? 'development' : 'production',
    },
  }
})
