import React, { FunctionComponent, useCallback, useState } from 'react'
import { Text } from '../Text'
import { FooterProps } from './types'
import { useColor } from '../../theme'
import { iconFromString } from '../../icons'
import useHover from '../../hooks/events/useHover'
import { Loader } from '../Loader/Loader'

const Footer: FunctionComponent<FooterProps> = ({
  width,
  framed,
  paddingRight,
  icon = 'add',
  data,
  floating,
  paddingLeft,
  label = { en: 'Add item' },
  onClick,
  items,
  style,
}) => {
  const Icon = icon ? iconFromString(icon) : null
  const [hover, isHover, isActive] = useHover()
  const [loading, setLoading] = useState(false)
  return (
    <div
      style={{
        cursor: 'pointer',
        marginLeft: paddingLeft || 0,
        marginRight: paddingRight || 0,
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        border: framed ? '1px solid ' + useColor({ color: 'divider' }) : null,
        borderTop: '1px solid ' + useColor({ color: 'divider' }),
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderTopLeftRadius: floating ? 4 : null,
        borderTopRightRadius: floating ? 4 : null,
        height: 48,
        width,
        backgroundColor: isActive
          ? useColor({ color: 'background', tone: 2 })
          : null,
        justifyContent: 'space-between',
        ...style,
      }}
      onClick={useCallback(
        (e) => {
          setLoading(true)
          // @ts-ignore
          const p = onClick(e, data || items)
          if (p instanceof Promise) {
            p.then((v) => {
              setLoading(false)
            })
          } else {
            setLoading(false)
          }
        },
        [data, items, onClick]
      )}
      {...hover}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {Icon ? (
          <Icon
            style={{ marginRight: 15, marginLeft: 1 }}
            color={{ color: 'foreground', tone: isHover ? 1 : 3 }}
          />
        ) : null}
        <Text
          singleLine
          noSelect
          color={{ color: 'foreground', tone: isHover ? 1 : 3 }}
          weight="semibold"
        >
          {label}
        </Text>
      </div>
      {loading ? <Loader color={{ color: 'foreground', tone: 3 }} /> : null}
    </div>
  )
}

export { Footer }
