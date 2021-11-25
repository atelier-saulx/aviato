import React, { FunctionComponent, useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

export type CodeProps = {
  code: string
  language: string
}

export const Code: FunctionComponent<CodeProps> = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <pre data-toolbar-order="select-code,copy-code">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}
