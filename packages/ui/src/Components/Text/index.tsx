import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor, Color } from '../../theme'
import { getTextValue, TextValue, isHtml } from '../../textParser'
import useDate from './useDate'
import '@compiled/react'

type TextProps = {
  style?: CSSProperties
  color?: Color
  children?: TextValue
  noSelect?: boolean
  singleLine?: boolean
  overflow?: boolean
  weight?: 'regular' | 'medium' | 'semibold'
  className?: string
}

export const Text: FunctionComponent<TextProps> = ({
  children,
  style,
  color = { color: 'foreground' },
  noSelect,
  singleLine,
  weight = 'regular',
  className,
}) => {
  useDate(children)

  const v = getTextValue(children)
  const html = isHtml(v)

  return (
    <div
      className={className}
      css={{
        strong: {
          fontWeight: 600,
        },
      }}
      style={{
        fontSize: '15px',
        lineHeight: '24px',
        letterSpacing: '-0.015em',
        fontWeight:
          weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 'normal',
        userSelect: noSelect ? 'none' : 'text',
        color: useColor(color),
        whiteSpace: singleLine ? 'nowrap' : null,
        overflow: singleLine ? 'hidden' : null,
        textOverflow: singleLine ? 'ellipsis' : null,
        ...style,
      }}
      dangerouslySetInnerHTML={html ? { __html: v.html } : null}
    >
      {!html ? v : null}
    </div>
  )
}
