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

const checkTab = (data) => {
  const targetMessage = 'compiled client and server successfully'
  const serverReady = data.includes(targetMessage)

  if (serverReady && !hasOpenedBrowserTab) {
    hasOpenedBrowserTab = true
    open('http://localhost:3000/')
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
