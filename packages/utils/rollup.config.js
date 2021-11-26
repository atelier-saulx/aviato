import typescript from 'rollup-plugin-typescript2'
import packageJson from './package.json'

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
  plugins: [
    typescript({
      clean: true,
      tsconfig: 'tsconfig.json',
      typescript: require('typescript'),
    }),
  ],
}
