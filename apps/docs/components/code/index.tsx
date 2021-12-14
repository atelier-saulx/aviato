import React, { FunctionComponent, useEffect, useState } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'
import { setupPrism } from './setup'

export type CodeProps = {
  code: string
  language: string
}

export const Code: FunctionComponent<CodeProps> = ({ code, language }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [isMounted])

  if (!isMounted) {
    return null
  }

  Prism.highlightAll()
  setupPrism()

  return (
    <pre data-toolbar-order="select-code,copy-code">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}
