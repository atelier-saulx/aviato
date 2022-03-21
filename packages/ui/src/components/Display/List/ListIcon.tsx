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
      purple: {
        background: '$AccentPurpleLight',
      },
      yellow: {
        background: '$AccentYellowLight',
      },
      pink: {
        background: '$AccentPinkLight',
      },
      sailorBlue: {
        background: '$AccentSailorblueLight',
      },
      blue: {
        background: '$AccentBabyblueLight',
      },
      orange: {
        background: '$AccentOrangeLight',
      },
      teal: {
        background: '$AccentTealLight',
      },
      red: {
        background: '$AccentRedLight',
      },
    },

    size: {
      small: {
        width: 20,
        height: 20,
      },
      medium: {
        width: 32,
        height: 32,
      },
      large: {
        width: 48,
        height: 48,
      },
    },
  },
})

export type ListIconSize = 'small' | 'medium' | 'large'

export type ListIconBackground =
  | 'purple'
  | 'yellow'
  | 'pink'
  | 'sailorBlue'
  | 'blue'
  | 'orange'
  | 'teal'
  | 'red'

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
    background = 'blue',
    size = 'small',
    ...remainingProps
  } = properties

  const TargetIcon = getIconFromName(icon)

  const mappedIconSize = {
    small: 16,
    medium: 16,
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
