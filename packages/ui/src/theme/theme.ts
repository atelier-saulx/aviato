/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { resolveColor, resolveSize } from './utils'
import { createGlobalStyle } from 'styled-components'

import TokenConfigFile from './token.config.json'

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

type TokenType = 'color' | 'size'

export type TokenConfiguration = {
  [key in TokenType]: {
    [key in TokenPrimitive]: ColorTokenConfig | SizeTokenConfig
  }
}

const tokenConfiguration: () => TokenConfiguration = () => {
  return TokenConfigFile as unknown as TokenConfiguration
}

export type ColorTokenCollection = {
  [key: string]: ColorTokenConfig
}

export type SizeTokenCollection = {
  [key: string]: SizeTokenConfig
}

type StyleElement = {
  token: string
  value: string | number
}

function getColorCollection(): StyleElement[] {
  const tokenConfig = tokenConfiguration()
  if (!tokenConfig.color) return []

  return Object.entries(tokenConfig.color).map(([token, value]) => {
    return {
      token,
      value: `${value}`,
    }
  })
}

function getSizeCollection(): StyleElement[] {
  const tokenConfig = tokenConfiguration()
  if (!tokenConfig.size) return []

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

  // Merge token collections together
  const mergedCollection = [...colors, ...sizes]

  // Sort alphabetically
  const sortMethod = (a, b) => b.token.localeCompare(a.token)
  const sortedCollection = mergedCollection.sort(sortMethod)

  return sortedCollection
}

function globalCSSVariables(): string {
  return getStyleCollection()
    .map(({ token, value }) => `--${token}: ${value};`)
    .join('')
}

function useColor(
  token: ColorToken,
  config: TokenConfiguration = tokenConfiguration()
): string {
  try {
    return resolveColor(token, config.color as ColorTokenCollection)
  } catch (error) {
    console.warn('Color-resolve failed - error: ', error)
  }
}

function useSize(
  token: SizeToken,
  config: TokenConfiguration = tokenConfiguration()
): string {
  try {
    return resolveSize(token, config.size as SizeTokenCollection)
  } catch (error) {
    console.warn('Size-resolve failed - error: ', error)
  }
}

const GlobalStyle = createGlobalStyle<{ cssVariables }>`
  :root {
    ${(props) => props.cssVariables};
  }
`

export { globalCSSVariables, GlobalStyle }
