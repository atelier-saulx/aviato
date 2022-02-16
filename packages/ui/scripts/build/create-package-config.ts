import path from 'path'
import fs from 'fs-extra'
import { RollupOptions, OutputOptions, ModuleFormat } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import nodeExternals from 'rollup-plugin-node-externals'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import visualizer from 'rollup-plugin-visualizer'
import alias, { Alias } from '@rollup/plugin-alias'

interface PkgConfigInput {
  basePath: string
  format: string
  entry?: string
  publicPath?: string
  externals?: string[]
  sourcemap: boolean
  minify: boolean
  analyze: boolean
}

export async function createPackageConfig(
  config: PkgConfigInput
): Promise<RollupOptions> {
  const unparsedPackageJson = fs
    .readFileSync(path.join(config.basePath, './package.json'))
    .toString('utf-8')

  const packageJson = JSON.parse(unparsedPackageJson)

  const aliasEntries: Alias[] = ['~'].map((alias) => ({
    find: new RegExp(`^${alias}`),
    replacement: path.resolve(config.basePath, 'src'),
  }))

  const plugins = [
    commonjs(),
    nodeExternals(),
    nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
    esbuild({
      minify: config.format === 'umd',
      sourceMap: false,
      tsconfig: path.join(config.basePath, 'tsconfig.json'),
    }),
    json(),
    alias({ entries: aliasEntries }),
    replace({ preventAssignment: true }),
  ]

  let externals

  if (config.format === 'umd') {
    externals = [
      ...(config?.externals || []),
      ...Object.keys({
        ...packageJson.peerDependencies,
      }),
    ]
  } else {
    externals = [
      ...(config?.externals || []),
      ...Object.keys({
        ...packageJson.peerDependencies,
        ...packageJson.dependencies,
      }),
    ]
  }

  const output: OutputOptions = {
    name: packageJson.name,
    format: config.format as ModuleFormat,
    externalLiveBindings: false,
    sourcemap: config.sourcemap,
  }

  if (config.format === 'es') {
    output.dir = path.resolve(config.basePath, 'dist', 'esm')
    output.preserveModules = true
  }

  if (config.format === 'cjs') {
    output.dir = path.resolve(config.basePath, 'dist', 'cjs')
    output.preserveModules = true
    output.exports = 'named'
  }

  if (config.format === 'umd') {
    output.file = path.resolve(config.basePath, 'umd/index.umd.js')

    output.globals = {
      react: 'React',
      'react-dom': 'ReactDOM',
    }
  }

  if (config.analyze && config.format === 'umd') {
    plugins.push(
      visualizer({
        title: packageJson.name,
        filename: path.join(config.basePath, 'lib/stats.html'),
        projectRoot: path.join(config.basePath, 'src'),
        sourcemap: true,
        gzipSize: true,
      }),

      visualizer({
        title: packageJson.name,
        filename: path.join(config.basePath, 'lib/stats.json'),
        projectRoot: path.join(config.basePath, 'src'),
        json: true,
        sourcemap: true,
        gzipSize: true,
      })
    )
  }

  return {
    input: path.resolve(config.basePath, 'src/index.ts'),
    output,
    external: externals,
    plugins,
  }
}
