import path from 'path'
import generateDts from './generate-dts'

async function generateTypes() {
  const packagePath = path.join(__dirname, '../../')
  await generateDts(packagePath)
}

;(() => {
  generateTypes()
})()
