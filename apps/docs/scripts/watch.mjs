import open from 'open'
import concurrently from 'concurrently'
import process from 'process'

const stream = {}

stream.writable = true
stream.write = (data) => {
  checkTab(data)
  process.stdout.write(data)
}

let hasOpenedBrowserTab = false
let portAddress = 3000

const checkTab = (data) => {
  if (hasOpenedBrowserTab) return

  const hasPortMessage = data.includes('0.0.0.0:')
  if (hasPortMessage) {
    const splitMessage = data.replace('\n', '').split(':')
    const targetAddress = splitMessage[splitMessage.length - 1]

    portAddress = Number(targetAddress)
  }

  const hasCompiledMessage = 'compiled client and server successfully'
  const hasCompiled = data.includes(hasCompiledMessage)
  if (hasCompiled) {
    hasOpenedBrowserTab = true
    open(`http://localhost:${portAddress}/`)
  }
}

const onSuccess = () => {
  process.stdout.write('Success!')
  process.exit()
}

const onFailure = () => {
  process.stdout.write('onFailure!')
  process.exit()
}

const commands = []
commands.push({
  name: 'watch',
  command: 'next dev',
})

concurrently(commands, {
  killOthers: ['failure', 'success'],
  restartTries: 0,
  maxProcesses: 8,
  prefix: 'none',
  outputStream: stream,
}).then(onSuccess, onFailure)
