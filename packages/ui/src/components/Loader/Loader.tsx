import React, { FC } from 'react'
import { StitchedCSS, styled, keyframes, Color } from '~/theme'

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

const Svg = styled('svg', {
  animationName: `${spin}`,
  animationDuration: '0.8s',
  transform: 'rotate(-90deg)',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
})

export const Loader: FC<{
  width?: number
  height?: number
  color?: Color
  css?: StitchedCSS
}> = ({ color, width = 24, height = 24, css }) => {
  return (
    <Svg
      css={{
        color: color || '$TextPrimary',
        ...css,
      }}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM2.4 8C2.4 11.0928 4.90721 13.6 8 13.6C11.0928 13.6 13.6 11.0928 13.6 8C13.6 4.90721 11.0928 2.4 8 2.4C4.90721 2.4 2.4 4.90721 2.4 8Z"
        fill="currentColor"
        fillOpacity="0.48"
      />
      <path
        d="M16 8C16 6.94943 15.7931 5.90914 15.391 4.93853C14.989 3.96793 14.3997 3.08601 13.6569 2.34315C12.914 1.60028 12.0321 1.011 11.0615 0.608964C10.0909 0.206926 9.05057 -4.59221e-08 8 0V2.4C8.7354 2.4 9.4636 2.54485 10.143 2.82627C10.8225 3.1077 11.4398 3.52019 11.9598 4.0402C12.4798 4.56021 12.8923 5.17755 13.1737 5.85697C13.4552 6.5364 13.6 7.2646 13.6 8H16Z"
        fill="currentColor"
      />
    </Svg>
  )
}
