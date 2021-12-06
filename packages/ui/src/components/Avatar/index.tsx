import { ComponentProps } from '@stitches/react'
import React, { ElementRef, forwardRef } from 'react'
import { styled } from '~/theme'

const DIV_TAG = 'div'

const StyledAvatar = styled(DIV_TAG, {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$PrimaryMain',
  color: '$PrimaryContrastHigh',
  display: 'flex',
  fontSize: '9px',
  fontWeight: '600',
  lineHeight: '24px',
  height: '24px',
  width: '24px',

  variants: {
    size: {
      small: {
        fontSize: '7px',
        width: '20px;',
        height: '20px',
        borderRadius: '20px',
      },
      medium: {
        width: '24px',
        height: '24px',
        borderRadius: '24px',
      },
      large: {
        fontSize: '12px',
        width: '36px',
        height: '36px',
        borderRadius: '24px',
      },
    },
  },
})

export function initialsFromUsername(fullUserName: string) {
  const fullName = fullUserName.split(' ')
  if (fullName.length > 1) {
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0)
    return initials.toUpperCase()
  } else {
    const initials = fullName.shift().charAt(0)
    return initials.toUpperCase()
  }
}

type AvatarSize = 'small' | 'medium' | 'large'

export type AvatarProps = {
  username?: string
  size?: AvatarSize
}

type ForwardProps = ComponentProps<typeof StyledAvatar> & AvatarProps

export const Avatar = forwardRef<ElementRef<typeof DIV_TAG>, ForwardProps>(
  (properties, forwardedRef) => {
    const { username = '', size = 'medium', ...remainingProps } = properties

    return (
      <StyledAvatar size={size} {...remainingProps} ref={forwardedRef}>
        {initialsFromUsername(username)}
      </StyledAvatar>
    )
  }
)
