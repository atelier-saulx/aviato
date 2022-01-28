import React, { useState, forwardRef, ElementRef, useCallback } from 'react'
import { LiveEditor } from 'react-live'
import { noop } from '@aviato/utils'

import { useClipboard } from '~/hooks'
import { styled, useTheme } from '~/theme'
import { Tooltip } from '../../Feedback/Tooltip'
import { CodeLanguage } from './types'
import { CopyButton } from './CopyButton'
import { getPrismTheme } from './theme'
import { ComponentProps } from '@stitches/react'

const StyledEditor = styled('div', {
  position: 'relative',
})

const TooltipContainer = styled('div', {
  display: 'inline-block',
  position: 'absolute',
  top: '0px',
  right: '0px',
  padding: '16px',
  zIndex: '2',
})

type StitchedProps = Omit<ComponentProps<typeof StyledEditor>, 'onChange'>

export interface EditorProps extends StitchedProps {
  language: CodeLanguage
  copyLabel?: string
  copiedLabel?: string
  children: string
  onChange?: (value: string) => void
}

export const CodeEditor = forwardRef<
  ElementRef<typeof StyledEditor>,
  EditorProps
>((properties, forwardedRef) => {
  const {
    language,
    copyLabel = 'Copy code',
    copiedLabel = 'Copied',
    children = '',
    onChange = noop,
    ...remainingProps
  } = properties

  const { theme } = useTheme()
  const trimmedCode = children.trim()
  const clipboard = useClipboard()
  const prismTheme = getPrismTheme(theme)

  const [activeCode, setActiveCode] = useState(trimmedCode)

  const handleChange = useCallback((value: string) => {
    setActiveCode(value)
    onChange(value)
  }, [])

  return (
    <StyledEditor ref={forwardedRef} {...remainingProps}>
      <TooltipContainer>
        <Tooltip
          label={clipboard.copied ? copiedLabel : copyLabel}
          position="left"
          placement="center"
          gutter={8}
        >
          <CopyButton
            wasCopied={clipboard.copied}
            onClick={() => clipboard.copy(activeCode)}
          />
        </Tooltip>
      </TooltipContainer>

      <LiveEditor
        code={trimmedCode}
        language={language}
        theme={prismTheme}
        onChange={(value) => {
          handleChange(value)
        }}
        style={{
          fontSize: '15px',
        }}
      />
    </StyledEditor>
  )
})

CodeEditor.displayName = 'CodeEditor'
