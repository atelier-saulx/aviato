import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { DefaultProps, styled } from '~/theme'
import { getInitialsFromUsername } from './utils'

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

type AvatarSize = 'small' | 'medium' | 'large'

export interface AvatarProps extends DefaultProps {
  username?: string
  size?: AvatarSize
}

type ForwardProps = ComponentProps<typeof StyledAvatar> & AvatarProps

export const Avatar = React.forwardRef<
  ElementRef<typeof DIV_TAG>,
  ForwardProps
>((properties, forwardedRef) => {
  const { username = '', size = 'medium', ...remainingProps } = properties

  return (
    <StyledAvatar size={size} {...remainingProps} ref={forwardedRef}>
      {getInitialsFromUsername(username)}
    </StyledAvatar>
  )
})
