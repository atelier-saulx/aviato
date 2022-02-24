import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { getIconFromName, IconName } from '~/components'

const StyledListIcon = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  color: '$TextPrimary',

  variants: {
    background: {
      default: {
        background: '$PrimaryLight',
      },

      blue: {
        background: '$AccentSailorblueLight',
      },

      purple: {
        background: '$AccentPurpleLight',
      },

      pink: {
        background: '$AccentPinkLight',
      },

      yellow: {
        background: '$AccentYellowLight',
      },
    },

    size: {
      default: {
        width: 20,
        height: 20,
      },

      large: {
        width: 48,
        height: 48,
      },
    },
  },
})

export type ListIconSize = 'default' | 'large'
export type ListIconBackground = 'default' | 'purple' | 'yellow' | 'pink'

export interface ListIconProps extends ComponentProps<typeof StyledListIcon> {
  icon: IconName
  background?: ListIconBackground
  size?: ListIconSize
}

export const ListIcon = forwardRef<
  ElementRef<typeof StyledListIcon>,
  ListIconProps
>((properties, forwardedRef) => {
  const {
    icon,
    background = 'default',
    size = 'default',
    ...remainingProps
  } = properties

  const TargetIcon = getIconFromName(icon)

  const mappedIconSize = {
    default: 16,
    large: 20,
  }

  const iconSize = mappedIconSize[size]

  return (
    <StyledListIcon
      background={background}
      size={size}
      ref={forwardedRef}
      {...remainingProps}
    >
      <TargetIcon width={iconSize} height={iconSize} />
    </StyledListIcon>
  )
})

ListIcon.displayName = 'ListIcon'
