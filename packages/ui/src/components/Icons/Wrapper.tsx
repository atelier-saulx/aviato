import { styled } from '~/theme'
import React, { FC } from 'react'
import { IconProps } from './types'

const StyledWrapper = styled('div', {})

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
  }
  return (
    <StyledWrapper
      css={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
      {...props}
    />
  )
}
