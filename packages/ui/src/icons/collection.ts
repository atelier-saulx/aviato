import { FunctionComponent } from 'react'

import {
  IconAlignCenter,
  IconAlignJustify,
  IconAlignLeft,
  IconAlignRight,
  IconAperture,
  IconCheck,
  IconChevronBack,
  IconChevronDown,
  IconClipboard,
  IconCopy,
  IconDark,
  IconDelete,
  IconEdit,
  IconEmail,
  IconExpand,
  IconExpanded,
  IconLight,
  IconLoading,
  IconMinus,
  IconModel,
  IconMore,
  IconPlus,
  IconSchedule,
  IconSearch,
  IconSettings,
  IconSort,
  IconTarget,
  IconUserGroups,
} from './components'

import { SVGProperties } from './types'

export const icons = {
  IconAlignCenter,
  IconAlignJustify,
  IconAlignLeft,
  IconAlignRight,
  IconAperture,
  IconCheck,
  IconChevronBack,
  IconChevronDown,
  IconClipboard,
  IconCopy,
  IconDark,
  IconDelete,
  IconEdit,
  IconEmail,
  IconExpand,
  IconExpanded,
  IconLight,
  IconLoading,
  IconMinus,
  IconModel,
  IconMore,
  IconPlus,
  IconSchedule,
  IconSearch,
  IconSettings,
  IconSort,
  IconTarget,
  IconUserGroups,
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
