import React, { FunctionComponent } from 'react'

import { styled } from '~/theme'
import { Conditional } from '~/components'
import { getLettersFromAlt } from './utils'
import { useImagePreloader } from '~/hooks'

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

type AvatarSize = 'extrasmall' | 'small' | 'medium' | 'large' | 'extralarge'

export interface AvatarProps {
  src: string
  alt: string
  size?: AvatarSize
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  src,
  alt,
  size = 'extralarge',
  children,
  ...remainingProps
}) => {
  const { imagesPreloaded } = useImagePreloader([src])

  const fallbackLetters = getLettersFromAlt(alt)

  return (
    <StyledAvatar size={size} {...remainingProps}>
      <Conditional test={imagesPreloaded}>
        <img src={src} alt={alt} />
      </Conditional>

      <Conditional test={!imagesPreloaded}>
        <div title={alt}>{fallbackLetters ?? children}</div>
      </Conditional>
    </StyledAvatar>
  )
}
