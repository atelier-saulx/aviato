import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { useClipboard } from '@aviato/hooks'

import { styled, useTheme } from '~/theme'
import { Tooltip } from '../Feedback/Tooltip'
import { Conditional } from '../Utilities/Conditional'
import { CodeLanguage } from './types'
import { CopyButton } from './CopyButton'
import { getPrismTheme } from './theme'

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

const Pre = styled('pre', {
  lineHeight: '1.55',
  borderRadius: '4px',
  fontSize: '15px',
  padding: '10px',
  margin: '0px',
  overflowX: 'auto',
})

const Line = styled('div', {
  display: 'table-row',
})

const LineNo = styled('div', {
  display: 'table-cell',
  textAlign: 'right',
  paddingRight: '1em',
  opacity: '0.5',
  userSelect: 'none',
})

const LineContent = styled('div', {
  display: 'table-cell',
})

export interface CodeBlock {
  code: string
  language: CodeLanguage
}

export interface PrismProps extends ComponentProps<typeof StyledPrism> {
  copyLabel: string
  copiedLabel: string
  language: CodeLanguage
  withLineNumbers?: boolean
  children: string
}

export const Prism = forwardRef<ElementRef<typeof StyledPrism>, PrismProps>(
  (properties, forwardedRef) => {
    const {
      language,
      withLineNumbers = false,
      copyLabel = 'Copy code',
      copiedLabel = 'Copied',
      children = '',
    } = properties

    const { theme } = useTheme()
    const colorMode = theme as 'light' | 'dark'

    const trimmedCode = children.trim()
    const clipboard = useClipboard()

    return (
      <StyledPrism ref={forwardedRef}>
        <TooltipContainer>
          <Tooltip
            label={clipboard.copied ? copiedLabel : copyLabel}
            position="left"
            placement="center"
            withArrow
            arrowSize={4}
            gutter={8}
            transition="fade"
          >
            <CopyButton
              wasCopied={clipboard.copied}
              onClick={() => clipboard.copy(trimmedCode)}
            />
          </Tooltip>
        </TooltipContainer>

        <Highlight
          {...defaultProps}
          code={trimmedCode}
          language={language}
          theme={getPrismTheme(colorMode)}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style}>
              {tokens.map((line, index) => (
                <Line key={index} {...getLineProps({ line, key: index })}>
                  <Conditional test={withLineNumbers}>
                    <LineNo>{index + 1}</LineNo>
                  </Conditional>

                  <LineContent>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </Line>
              ))}
            </Pre>
          )}
        </Highlight>
      </StyledPrism>
    )
  }
)
