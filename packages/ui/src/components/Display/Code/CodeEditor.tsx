import React, { useState, forwardRef, ElementRef } from 'react'
import { LiveEditor } from 'react-live'
import { noop } from '@aviato/utils'

import { styled } from '~/theme'
import { useClipboard } from '~/hooks'
import { useTheme } from '~/providers'
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

const EditorWrapper = styled('div', {
  fontFamily: 'monospace',
  background: '$Background0dp',

  lineHeight: '1.55',
  fontSize: '15px',

  '* > textarea:focus': {
    outline: 'none',
  },
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

  const { activeTheme } = useTheme()
  const trimmedCode = children.trim()
  const clipboard = useClipboard()
  const prismTheme = getPrismTheme(activeTheme)

  const [activeCode, setActiveCode] = useState(trimmedCode)

  const handleChange = (value: string) => {
    setActiveCode(value)
    onChange(value)
  }

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

      <EditorWrapper>
        <LiveEditor
          theme={prismTheme}
          code={trimmedCode}
          language={language}
          onChange={(value) => handleChange(value)}
        />
      </EditorWrapper>
    </StyledEditor>
  )
})

CodeEditor.displayName = 'CodeEditor'
