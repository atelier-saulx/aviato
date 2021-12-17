import open from 'open'
import concurrently from 'concurrently'
import process from 'process'

const log = (data) => {
  process.stdout.write(data)
}

const stream = {}

stream.writable = true
stream.write = (data) => {
  checkTab(data)
  log(data)
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
}).then(
  // This code is necessary to make sure the parent
  // terminates when the child process is closed.

  function onSuccess() {
    process.exit()
  },
  function onFailure() {
    process.exit()
  }
)
