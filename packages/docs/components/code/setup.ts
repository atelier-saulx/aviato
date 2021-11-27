import Prism from 'prismjs'
import { noop } from '@aviato/ui/utils'

let scriptWasSetup = false

export function setupPrism() {
  if (scriptWasSetup) return
  scriptWasSetup = true

  const registerButton = Prism?.plugins?.toolbar?.registerButton ?? noop

  registerButton('select-code', (env: any) => {
    var button = document.createElement('button')
    button.innerHTML = 'Select Code'
    button.style.marginLeft = '10px'

    button.addEventListener('click', function () {
      if ((document as any).body.createTextRange) {
        var range = (document as any).body.createTextRange()
        range.moveToElementText(env.element)
        range.select()
      } else if (window.getSelection) {
        var selection = window.getSelection()
        var range = (document as any).createRange()
        range.selectNodeContents(env.element)
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
    })

    return button
  })

  registerButton('copy-code', (env: any) => {
    var button = document.createElement('button')
    button.innerHTML = 'Copy Code'
    button.style.marginLeft = '10px'

    button.addEventListener('click', function () {
      if ((document as any).body.createTextRange) {
        var range = (document as any).body.createTextRange()
        range.moveToElementText(env.element)
        range.select()
      } else if (window.getSelection) {
        var selection = window.getSelection()
        var range = (document as any).createRange()
        range.selectNodeContents(env.element)
        selection?.removeAllRanges()
        selection?.addRange(range)
      }

      document.execCommand('copy')

      if ((window as any).getSelection) {
        ;(window as any).getSelection().removeAllRanges()
      } else if ((document as any).selection) {
        ;(document as any).selection.empty()
      }
    })

    return button
  })
}
