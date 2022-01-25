import React, { forwardRef, ElementRef } from 'react'

import { useClipboard } from '~/hooks'
import { styled, useTheme } from '~/theme'
import { Tooltip } from '../../Feedback/Tooltip'
import { CodeLanguage } from './types'
import { CopyButton } from './CopyButton'
import { getPrismTheme } from './theme'

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

export interface EditorProps {
  language: CodeLanguage
  readOnly?: boolean
  copyLabel?: string
  copiedLabel?: string
  children: string
}

export const Editor = forwardRef<ElementRef<typeof StyledEditor>, EditorProps>(
  (properties, forwardedRef) => {
    const {
      language,
      copyLabel = 'Copy code',
      copiedLabel = 'Copied',
      children = '',
      ...remainingProps
    } = properties

    const { theme } = useTheme()
    const trimmedCode = children.trim()
    const clipboard = useClipboard()
    const prismTheme = getPrismTheme(theme)

    console.log('Editor: ', { language, prismTheme })

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
              onClick={() => clipboard.copy(trimmedCode)}
            />
          </Tooltip>
        </TooltipContainer>
        Editor goes here
      </StyledEditor>
    )
  }
)
