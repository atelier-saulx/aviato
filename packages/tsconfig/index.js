const { execSync } = require('child_process')
const { promisify } = require('util')
const fs = require('fs')
const writeFile = promisify(fs.writeFile)
const access = promisify(fs.access)
const { join } = require('path')
const cwd = process.cwd()

// this can go

const hasTS = async (base = cwd) => {
  try {
    await access(join(base, 'src/index.ts'))
  } catch (e) {
    await access(join(base, 'src/index.tsx'))
  }
}

hasTS()
  .then(async () => {
    const { name, dependencies } = require(require.resolve('./package.json', {
      paths: [cwd],
    }))

    if (dependencies) {
      const res = execSync('yarn workspaces list --json -v', { cwd })
        .toString()
        .split('\n')

      const tsconfig = {
        extends: '../../tsconfig.json',
        compilerOptions: {
          rootDir: 'src',
          outDir: 'dist',
        },
        include: ['src/**/*', 'src/**/*.json'],
        exclude: Array.from(
          new Set(['node_modules', 'test', 'dist', 'tmp', 'examples'])
        ),
        references: [],
      }

      const map = {}
      let target

      for (const string of res) {
        if (string) {
          const obj = JSON.parse(string)
          map[obj.location] = obj
          if (obj.name === name) {
            target = obj
          }
        }
      }

      await Promise.all(
        target.workspaceDependencies.map(async (location) => {
          if (map[location].name in dependencies) {
            const exists = await hasTS(join(cwd, '../../', location))
              .then((r) => true)
              .catch((e) => false)
            if (exists) {
              tsconfig.references.push({ path: join('../../', location) })
            }
          }
        })
      )

      return writeFile('tsconfig.json', JSON.stringify(tsconfig, null, 2))
    }
  })
  .then(() => console.info('✅ tsconfig.json up to date'))
  .catch((e) => {
    console.log(e)
    console.info('⚠️  no src/index.ts file')
  })
