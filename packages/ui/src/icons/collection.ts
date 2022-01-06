import { FunctionComponent } from 'react'

import { SVGProperties } from './types'
import * as IconComponents from './components'

export const icons = {
  ...IconComponents,
}

export type IconName = keyof typeof icons

export type Icon = FunctionComponent<SVGProperties>

/**
 * Returns the corresponding icon, based on the input string.
 *
 * Example:
 * input === 'IconPlus'
 * output === <IconPlus />
 */
export const getIconFromType = (input: IconName): Icon | null => {
  if (input && typeof input === 'string') {
    const targetIcon = input[0].toUpperCase() + input.slice(1)
    return icons[targetIcon]
  }

  return null
}

/**
 * Returns a random icon, e.g. <IconPlus />
 */
export const getRandomIcon = (): Icon => {
  const values = Object.values(icons)

  return values[Math.floor(Math.random() * values.length)]
}

/**
 * Returns a random icon string, e.g. "IconPlus"
 */
export const getRandomIconName = (): string => {
  const keys = Object.keys(icons)
  return keys[Math.floor(Math.random() * keys.length)]
}
