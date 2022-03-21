import React, { FunctionComponent } from 'react'

import { styled } from '~/theme'
import { Conditional } from '~/components'
import { getLettersFromLabel } from './utils'
import { useImagePreloader } from '~/hooks'
import { BaseSize } from '~/types'

const StyledAvatar = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$PrimaryMain',
  color: '$PrimaryMainContrast',
  overflow: 'hidden',

  variants: {
    size: {
      extrasmall: {
        minWidth: '24px',
        maxWidth: '24px',
        height: '24px',
        borderRadius: '24px',
      },
      small: {
        minWidth: '28px',
        maxWidth: '28px',
        height: '28px',
        borderRadius: '28px',
      },
      medium: {
        minWidth: '32px',
        maxWidth: '32px',
        height: '32px',
        borderRadius: '32px',
      },
      large: {
        minWidth: '36px',
        maxWidth: '36px',
        height: '36px',
        borderRadius: '36px',
      },
      extralarge: {
        minWidth: '40px',
        maxWidth: '40px',
        height: '40px',
        borderRadius: '40px',
      },
    },
  },
})

export interface AvatarProps {
  src?: string
  label: string
  size?: BaseSize
  onClick?: () => void
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  src,
  label,
  size = 'extralarge',
  children,
  ...remainingProps
}) => {
  const { imagesPreloaded } = useImagePreloader([src])

  const fallbackLetters = getLettersFromLabel(label)

  return (
    <StyledAvatar size={size} {...remainingProps}>
      <Conditional test={imagesPreloaded}>
        <img src={src} alt={label} />
      </Conditional>

      <Conditional test={!imagesPreloaded}>
        <div title={label}>{fallbackLetters ?? children}</div>
      </Conditional>
    </StyledAvatar>
  )
}

Avatar.displayName = 'Avatar'
