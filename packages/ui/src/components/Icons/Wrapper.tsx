import { styled } from '~/theme'
import React, { FC } from 'react'
import { IconProps } from './types'

const StyledWrapper = styled('div', {})

const StyledClickableWrapper = styled('div', {
  '&:hover': {
    transform: 'scale(1.1)',
  },
  transition: 'transform 0.15s',
  cursor: 'pointer',
})

export const Wrapper: FC<IconProps> = (p) => {
  let { onClick, ...props } = p

  if (onClick) {
    const onClickOrginal = onClick
    // @ts-ignore wrapper for error handling
    onClick = async (e) => {
      e.stopPropagation()
      e.preventDefault()
      try {
        onClickOrginal(e)
      } catch (e) {
        // do nothing shake icon or something
      }
    }
    return <StyledClickableWrapper onClick={onClick} {...props} />
  }
  return <StyledWrapper {...props} />
}
