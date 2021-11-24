import { resolveColor, resolveSize } from './utils'
import { createGlobalStyle } from 'styled-components'

import TokenConfig from './token.config.json'

export type ColorToken =
  | 'color-primary'
  | 'color-primaryAccent'
  | 'color-secondary'
  | 'color-secondaryAccent'
  | 'color-tertiary'
  | 'color-tertiaryAccent'
  | 'color-background'
  | 'color-foreground'
  | 'color-divider'
  | 'color-error'

export type SizeToken =
  | 'size-xxxxs'
  | 'size-xxxs'
  | 'size-xxs'
  | 'size-xs'
  | 'size-sm'
  | 'size-md'
  | 'size-lg'
  | 'size-xl'
  | 'size-xxl'
  | 'size-xxxl'
  | 'size-xxxxl'

export type TokenPrimitive = ColorToken | SizeToken

export type ColorTokenConfig =
  | string
  | {
      color: string
      opacity?: number
    }

type SizeTokenConfig =
  | string
  | {
      size: string
    }

type TokenConfig = ColorTokenConfig | SizeTokenConfig

export type TokenConfiguration = {
  [key in string]: {
    [key: string]: TokenConfig
  }
}

const tokenConfiguration: () => TokenConfiguration = () => {
  const colors = TokenConfig.color ?? {}
  const sizes = TokenConfig.size ?? {}

  return { ...colors, ...sizes }
}

export type ColorTokenCollection = {
  [key: string]: ColorTokenConfig
}

export type SizeTokenCollection = {
  [key: string]: SizeTokenConfig
}

const GlobalStyle = createGlobalStyle<{ cssVariables }>`
  :root {
    ${(props) => props.cssVariables};
  }
`

type StyleElement = {
  token: string
  value: string | number
}

function getColorCollection(): StyleElement[] {
  const tokenConfig = tokenConfiguration()

  return Object.entries(tokenConfig.color).map(([token]) => {
    return {
      token,
      value: useColor(token as ColorToken, tokenConfig),
    }
  })
}

function getSizeCollection(): StyleElement[] {
  const tokenConfig = tokenConfiguration()

  return Object.entries(tokenConfig.size).map(([token]) => {
    return {
      token,
      value: useSize(token as SizeToken, tokenConfig),
    }
  })
}

function getStyleCollection(): StyleElement[] {
  const colors = getColorCollection()
  const sizes = getSizeCollection()

  return [...colors, ...sizes]
}

function globalCSSVariables(): string {
  return getStyleCollection()
    .map(({ token, value }) => `--${token}: ${value};`)
    .join('')
}

function useColor(token: ColorToken, config?: TokenConfiguration): string {
  try {
    const tokenConfig = config ?? tokenConfiguration()
    return resolveColor(token, tokenConfig.color as ColorTokenCollection)
  } catch (error) {
    console.warn('Color-resolve failed - error: ', error)
  }
}

function useSize(token: SizeToken, config?: TokenConfiguration): string {
  try {
    const tokenConfig = config ?? tokenConfiguration()
    return resolveSize(token, tokenConfig.size as SizeTokenCollection)
  } catch (error) {
    console.warn('Size-resolve failed - error: ', error)
  }
}

export { globalCSSVariables, GlobalStyle, useColor, useSize }
