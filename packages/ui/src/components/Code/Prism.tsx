import React, { forwardRef, ElementRef } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { ComponentProps } from '@stitches/react'
import { useClipboard, useHasLoaded } from '@aviato/hooks'

import { styled } from '~/theme'
import { Tooltip } from '../Feedback/Tooltip'
import { CodeLanguage } from './types'
import { Conditional } from '..'
import { CopyButton } from './CopyButton'

const StyledPrism = styled('div', {
  position: 'relative',
})

const TooltipContainer = styled('div', {
  display: 'inline-block',
  position: 'absolute',
  top: '10px',
  right: '10px',
  zIndex: '2',
})

export interface CodeBlock {
  code: string
  language: CodeLanguage
}

export interface PrismProps extends ComponentProps<typeof StyledPrism> {
  copyLabel: string
  copiedLabel: string
  codeBlock: CodeBlock
}

export const Prism = forwardRef<ElementRef<typeof StyledPrism>, PrismProps>(
  (properties, forwardedRef) => {
    const {
      copyLabel = 'Copy code',
      copiedLabel = 'Copied',
      codeBlock,
    } = properties
    const { language, code } = codeBlock

    const hasLoaded = useHasLoaded()
    const clipboard = useClipboard()

    return (
      <StyledPrism ref={forwardedRef}>
        <Conditional test={hasLoaded}>
          <TooltipContainer>
            <Tooltip content={clipboard.copied ? copiedLabel : copyLabel}>
              <CopyButton
                wasCopied={clipboard.copied}
                onClick={() => clipboard.copy(code)}
              />
            </Tooltip>
          </TooltipContainer>
        </Conditional>

        <Highlight {...defaultProps} code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, index) => (
                <div
                  key={`div-${index}`}
                  {...getLineProps({ line, key: index })}
                >
                  {line.map((token, key) => (
                    <span
                      key={`span-${index}`}
                      {...getTokenProps({ token, key })}
                    />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </StyledPrism>
    )
  }
)
