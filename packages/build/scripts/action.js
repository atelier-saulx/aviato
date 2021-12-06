/* eslint-disable no-console */

import path from 'path'
import concurrently from 'concurrently'
import process from 'process'

const myArgs = process.argv.slice(2)

const action = myArgs[0]
const projects = myArgs[1]

if (typeof action !== 'string') {
  console.log('Action arg malformed')
  process.exit()
}

if (typeof projects !== 'string') {
  console.log('Project args malformed')
  process.exit()
}

const commands = []

const projectDir = path.join('../')

const parsedProjects = projects.split(',')
parsedProjects.forEach((projectName) => {
  commands.push({
    name: projectName,
    command: `yarn ${action}`,
    cwd: path.resolve(projectDir, projectName),
  })
})

const onSuccess = () => {
  console.log('Success!')
}

const onFailure = () => {
  console.log('onFailure!')
  process.exit()
}

const maxProcesses = action === 'build' ? 1 : 8

concurrently(commands, {
  killOthers: ['failure'],
  restartTries: 0,
  maxProcesses,
  prefix: 'name',
}).then(onSuccess, onFailure)
