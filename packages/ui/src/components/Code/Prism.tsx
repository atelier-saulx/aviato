/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { forwardRef, ElementRef, Children } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { ComponentProps } from '@stitches/react'
import { useClipboard } from '@aviato/hooks'

import { styled } from '~/theme'
import { Tooltip } from '../Feedback/Tooltip'
import { CodeLanguage } from './types'

const StyledPrism = styled('div', {})

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

    const clipboard = useClipboard()

    return (
      <StyledPrism>
        <Tooltip content={clipboard.copied ? copiedLabel : copyLabel}>
          Test
        </Tooltip>

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
