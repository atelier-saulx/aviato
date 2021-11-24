import React, {
  FunctionComponent,
  CSSProperties,
  useEffect,
  useState,
} from 'react'
import { useColor, Color } from '../../theme'
import '@compiled/react'

type LoaderProps = {
  style?: CSSProperties
  size?: number
  color?: Color
  delay?: number
  fadeIn?: boolean
}

export const Loader: FunctionComponent<LoaderProps> = ({
  style,
  size = 20,
  color = { color: 'foreground' },
  delay = 0,
  fadeIn,
}) => {
  const stroke = useColor(color)

  const [ready, setReady] = useState(!fadeIn && !delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const svg = (
    <svg
      css={{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        '@keyframes spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        animationName: 'spin',
        animationDuration: '0.5s',
        transform: 'rotate(-90deg)',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
      }}
      viewBox="0 0 32 32"
      width={size}
      height={size}
    >
      <circle
        cx="16"
        cy="16"
        fill="none"
        r="14"
        strokeWidth="4"
        style={{
          stroke,
          opacity: 0.2,
        }}
      />
      <circle
        cx="16"
        cy="16"
        fill="none"
        r="14"
        strokeWidth="4"
        style={{
          stroke,
          strokeDasharray: 80,
          strokeDashoffset: 60,
        }}
      />
    </svg>
  )

  return (
    <div
      // @ts-ignore
      css={{
        position: 'relative',
        transition: 'opacity 0.5s',
      }}
      style={{
        opacity: ready ? 1 : 0,
        maxWidth: size,
        minWidth: size,
        width: size,
        height: size,
        ...style,
      }}
    >
      {svg}
    </div>
  )
}
