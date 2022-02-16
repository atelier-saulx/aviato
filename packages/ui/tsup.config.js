import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  const isWatching = !!options.watch
  const shouldCreateTypeDefinitions = !isWatching

  return {
    format: ['esm', 'cjs'],
    clean: !isWatching,
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
