import packageJson from './package.json'
import remove from 'rollup-plugin-delete'
import typescript from 'rollup-plugin-typescript2'

const plugins = [
  typescript({
    clean: true,
    tsconfig: 'tsconfig.json',
    typescript: require('typescript'),
  }),
]

const isProduction = !process.env.ROLLUP_WATCH
if (isProduction) {
  plugins.push(remove({ targets: './dist/*' }))
}

export default {
  input: './src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
    },
    {
      file: packageJson.module,
      format: 'es',
    },
  ],
  watch: {
    clearScreen: false,
  },
  external: [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ],
  plugins,
}
