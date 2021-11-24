import React, { CSSProperties, FunctionComponent, useCallback } from 'react'
import { TextValue } from '../../../textParser'
import { Data, DataEventHandler } from '../../../types'
import { SubText } from '../../Text/SubText'
import { Text } from '../../Text'
import { useColor, Color } from '../../../theme'
import '@compiled/react'

export type JumpProps<T> = {
  items: Data<T>[]
  data: Data<T>
  isHover?: boolean
  label?: TextValue
  onClick?: DataEventHandler
}

const Dot = ({ isHover }) => {
  return (
    <div
      css={{
        borderRadius: '50%',
        width: 26,
        display: 'flex',
        justifyContent: 'center',
        animationDuration: '0.6s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
        alignItems: 'center',
        height: 26,
        '@keyframes fade': {
          from: {
            opacity: 0.5,
          },
          to: {
            opacity: 1,
          },
        },
      }}
      style={{
        backgroundColor: useColor({ color: 'primary', opacity: 0.1 }),
      }}
    >
      <div
        css={{
          width: 12,
          borderRadius: '50%',
          height: 12,
        }}
        style={{
          backgroundColor: useColor({ color: 'background' }),
          border: '2px solid ' + useColor({ color: 'primary' }),
        }}
      />
    </div>
  )
}

const Logic = ({ color, style }: { color: Color; style?: CSSProperties }) => {
  const targetColor = useColor(color)

  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={style}>
      <circle
        cx="12.5656"
        cy="6.17355"
        r="1.76522"
        stroke={targetColor}
        strokeWidth="1.33913"
      />
      <circle
        cx="12.5656"
        cy="12.261"
        r="1.76522"
        stroke={targetColor}
        strokeWidth="1.33913"
      />
      <path
        d="M1 1.3042V7.39115C1 10.0805 3.18018 12.2607 5.86957 12.2607H10.7391"
        stroke={targetColor}
        strokeWidth="1.33913"
        strokeLinecap="round"
      />
      <path d="M10.7391 6.17383H1" stroke={targetColor} strokeWidth="1.33913" />
    </svg>
  )
}

const Jump: FunctionComponent<JumpProps<any>> = ({
  label = 'jump to',
  items,
  data,
  isHover,
  onClick,
}) => {
  const targetValue = items.map((value) => value.index || value.id).join(', ')

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={useCallback(
        (event) => {
          onClick(event, data)
        },
        [onClick, data]
      )}
    >
      <Dot isHover={isHover} />

      <Logic color={{ color: 'primary' }} style={{ marginLeft: 14 }} />

      <SubText style={{ marginLeft: 7.5 }} singleLine noSelect>
        {label}
      </SubText>

      <Text style={{ marginLeft: 5 }} weight="semibold" singleLine>
        {targetValue}
      </Text>
    </div>
  )
}

export { Jump }
