import { useEffect, useState } from 'react'
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
  | 'size-xxs'
  | 'size-xs'
  | 'size-sm'
  | 'size-md'
  | 'size-lg'
  | 'size-xl'
  | 'size-xxl'

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

function parseVariable(input: string, lookupObject: object): string {
  const hasVariable = input.includes('{')
  if (hasVariable) {
    return input.replace(/{([^{}]+)}/g, (_, key) => {
      const matchingVariable = lookupObject[key]
      return matchingVariable ?? input
    })
  }

  return input
}

function getCollection(entries: object | undefined | null): StyleElement[] {
  if (!entries) {
    return []
  }

  return Object.entries(entries).map(([token, value]) => {
    return {
      token,
      value: `${parseVariable(value, entries)}`,
    }
  })
}

function getStyleCollection(): StyleElement[] {
  const tokenConfig = tokenConfiguration()

  const colors = getCollection(tokenConfig.color)
  const sizes = getCollection(tokenConfig.size)

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

const GlobalStyle = createGlobalStyle<{ variables }>`
  :root {
    ${(props) => props.variables};
  }
`

function useGlobalVariables(theme: 'light' | 'dark' = 'light') {
  const [globalVariables, setGlobalVariables] = useState('')

  useEffect(() => {
    const variables = globalCSSVariables()
    setGlobalVariables(variables)
  }, [theme])

  return globalVariables
}

export { useGlobalVariables, GlobalStyle }
