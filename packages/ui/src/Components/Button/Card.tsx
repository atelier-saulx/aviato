import React, { FunctionComponent, EventHandler, SyntheticEvent } from 'react'
import { Text } from '../Text'
import { Color, useColor } from '../../theme'
import useHover from '../../hooks/events/useHover'
import { iconFromString, IconName } from '../../icons'
import { SubText } from '../Text/SubText'
import { TextValue } from '../../textParser'
import { Loader } from '../Loader/Loader'
import { AsyncEvent } from '../../types'
import useAsyncClick from './useAsyncClick'
import '@compiled/react'

type GenericEventHandler = EventHandler<SyntheticEvent>

type CardProps = {
  icon: IconName
  onClick?: AsyncEvent | GenericEventHandler
  label?: TextValue
  width?: number
  onHover?: GenericEventHandler
  frameColor?: Color
  children?: TextValue
}

export const Card: FunctionComponent<CardProps> = ({
  onClick,
  children = '',
  label = '',
  onHover,
  width = '100%',
  icon,
  frameColor = { color: 'primary' },
}) => {
  const [hover, isHover] = useHover(onHover)
  const Icon = icon && iconFromString(icon)
  const [isLoading, handler] = useAsyncClick(onClick)

  return (
    <div
      {...hover}
      onClick={isLoading ? null : handler}
      style={{
        width,
        border: isHover
          ? '1px solid ' + useColor({ color: 'primary' })
          : '1px solid ' + useColor({ color: 'divider' }),
        backgroundColor: isHover
          ? useColor({ color: 'primary', opacity: 0.05 })
          : null,
      }}
      css={{
        padding: 20,
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: 4,
        transition: 'hover 0.15s, background-color 0.15s',
      }}
    >
      {isLoading ? (
        <Loader />
      ) : Icon ? (
        <Icon framed frameColor={frameColor} />
      ) : null}
      <Text
        weight="semibold"
        noSelect
        singleLine
        style={{
          marginTop: 15,
        }}
      >
        {label}
      </Text>
      <SubText color={{ color: 'foreground', tone: 2 }} noSelect>
        {children}
      </SubText>
    </div>
  )
}
