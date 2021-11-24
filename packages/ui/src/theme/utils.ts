import { SizeToken, SizeTokenCollection } from '.'
import { ColorToken, ColorTokenCollection } from './theme'

export function convertHexToRGBA(input: string, opacity: number): string {
  const colorHex = input.replace('#', '')

  const r = parseInt(colorHex.slice(0, 2), 16)
  const g = parseInt(colorHex.slice(2, 4), 16)
  const b = parseInt(colorHex.slice(4, 6), 16)

  if (opacity === 1) {
    return `rgb(${r},${g},${b})`
  }

  return `rgba(${r},${g},${b},${opacity})`
}

export function convertRGBToRGBA(input: string, opacity: number): string {
  return input.replace(')', `, ${opacity})`).replace('rgb', 'rgba')
}

export function resolveColor(
  token: ColorToken,
  config: ColorTokenCollection
): string {
  const tokenConfig = config[token]
  if (!tokenConfig) {
    throw new Error(`Missing color token: ${token}`)
  }

  let color
  let opacity = 1.0

  if (typeof tokenConfig === 'string') {
    color = tokenConfig
  } else {
    const { color: inputColor, opacity: inputOpacity = 1.0 } = tokenConfig
    color = inputColor
    opacity = Math.min(Math.max(inputOpacity, 0), 1)
  }

  if (color.includes('#')) {
    return convertHexToRGBA(color, opacity)
  } else if (color.includes('rgb(')) {
    return convertRGBToRGBA(color, opacity)
  } else if (color.includes('rgba(')) {
    return color
  }

  throw new Error(`Cannot match color token: ${token}`)
}

export function resolveSize(
  token: SizeToken,
  config: SizeTokenCollection
): string {
  const tokenConfig = config[token]
  if (!tokenConfig) {
    throw new Error(`Missing size token: ${token}`)
  }

  if (typeof tokenConfig === 'string') {
    return tokenConfig
  }

  return tokenConfig.size
}

export function setCSSProperty(
  target: CSSStyleDeclaration = document.documentElement.style,
  variable: string,
  property: string
) {
  target.setProperty(`--${variable}`, `${property}`)
}
