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

export const getIconFromString = (input: IconName): Icon | null => {
  if (input && typeof input === 'string') {
    const targetIcon = input[0].toUpperCase() + input.slice(1)
    return icons[targetIcon]
  }

  return null
}

export const getRandomIcon = (): Icon => {
  const values = Object.values(icons)
  return values[Math.floor(Math.random() * values.length)]
}
