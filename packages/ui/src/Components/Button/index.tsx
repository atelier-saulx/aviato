/* eslint-disable no-console */

import React, { CSSProperties, FunctionComponent } from 'react'
import styled from 'styled-components'
// import { useColor, useSize } from '../../theme'

const StyledButton = styled.button({
  alignItems: 'flex-start',
  background: 'red', // useColor({ token: 'secondary' }),
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: '500',
  letterSpacing: '-0.015em',
  lineHeight: '24px',
  margin: '6px',
  padding: '4px 8px',
})

export type ButtonProps = {
  text?: string
  style?: CSSProperties
}

export const Button: FunctionComponent<ButtonProps> = ({
  text,
  style,
  children,
}) => {
  // const primaryColor = useColor('color-background')
  // const secondaryColor = useColor('color-secondary')
  // const tertiaryColor = useColor('color-tertiary')
  // const backgroundColor = useColor('color-background')
  // const sizeSmall = useSize('size-sm')
  // const sizeMedium = useSize('size-md')

  // console.log('>>>>>> primaryColor: ', primaryColor)
  // console.log('>>>>>> secondaryColor: ', secondaryColor)
  // console.log('>>>>>> tertiaryColor: ', tertiaryColor)
  // console.log('>>>>>> backgroundColor: ', backgroundColor)
  // console.log('>>>>>> sizeSmall: ', sizeSmall)
  // console.log('>>>>>> sizeMedium: ', sizeMedium)

  return (
    <div
      style={{
        ...style,
      }}
    >
      <StyledButton>{text ?? children}</StyledButton>
    </div>
  )
}
