import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor, Color } from '../../theme'
import { getTextValue, TextValue, isHtml } from '../../textParser'
import useDate from './useDate'
import '@compiled/react'

type SubTextProps = {
  style?: CSSProperties
  color?: Color
  noSelect?: boolean
  singleLine?: boolean
  children?: TextValue
  weight?: 'regular' | 'medium' | 'semibold'
}

export const SubText: FunctionComponent<SubTextProps> = ({
  children,
  style,
  color = { color: 'foreground' },
  noSelect,
  singleLine,
  weight = 'regular',
}) => {
  useDate(children)
  const v = getTextValue(children)
  const html = isHtml(v)
  return (
    <div
      css={{
        strong: {
          fontWeight: 600,
        },
      }}
      style={{
        fontWeight:
          weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 'normal',
        fontSize: '13px',
        lineHeight: '20px',
        userSelect: noSelect ? 'none' : 'text',
        color: useColor(color),
        letterSpacing: '-0.015em',
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
