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
      tsconfig: 'tsconfig.json',
      typescript: require('typescript'),
    }),
    alias({
      '~': path.join(__dirname, '/src'),
    }),
  ]),
}

const themeConfig = {
  input: './theme/index.ts',
  output: [
    {
      file: 'dist/theme/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/theme/index.es.js',
      format: 'es',
    },
  ],
  ...baseConfig,
  plugins: plugins.concat([
    typescript({
      clean: true,
      tsconfig: 'tsconfig.theme.json',
      typescript: require('typescript'),
    }),
  ]),
}

const utilsConfig = {
  input: './utils/index.ts',
  output: [
    {
      file: 'dist/utils/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/utils/index.es.js',
      format: 'es',
    },
  ],
  ...baseConfig,
  plugins: plugins.concat([
    typescript({
      clean: true,
      tsconfig: 'tsconfig.utils.json',
      typescript: require('typescript'),
    }),
  ]),
}

export default [indexConfig, themeConfig, utilsConfig]
