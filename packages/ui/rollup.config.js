import path from 'path'
import packageJson from './package.json'
import remove from 'rollup-plugin-delete'
import typescript from 'rollup-plugin-typescript2'
import alias from 'rollup-plugin-alias'

const plugins = []

const isProduction = !process.env.ROLLUP_WATCH
if (isProduction) {
  plugins.push(remove({ targets: './dist/*' }))
}

const baseConfig = {
  watch: {
    clearScreen: false,
  },
  external: [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ],
}

const indexConfig = {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
  ],
  ...baseConfig,
  plugins: plugins.concat([
    typescript({
      clean: true,
      tsconfig: isProduction ? 'tsconfig.build.json' : 'tsconfig.json',
      typescript: require('typescript'),
    }),
    alias({
      '~': path.join(__dirname, '/src'),
    }),
  ]),
}

export default [indexConfig]
