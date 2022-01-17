import React, { forwardRef, ElementRef } from 'react'
import { IconCheck, IconCopy } from '~/icons'
import { styled } from '~/theme'
import { Conditional } from '..'

const StyledCopyButton = styled('div', {
  position: 'relative',
})

const StyledCheck = styled(IconCheck, {
  color: '$TextPrimary',
})

const StyledCopy = styled(IconCopy, {
  color: '$TextPrimary',
})

export interface CopyButtonProps {
  wasCopied: boolean
  onClick: () => void
}

export const CopyButton = forwardRef<
  ElementRef<typeof StyledCopyButton>,
  CopyButtonProps
>((properties, forwardedRef) => {
  const { wasCopied, ...remainingProps } = properties

  return (
    <StyledCopyButton ref={forwardedRef} {...remainingProps}>
      <Conditional test={wasCopied}>
        <StyledCheck />
      </Conditional>

      <Conditional test={!wasCopied}>
        <StyledCopy />
      </Conditional>
    </StyledCopyButton>
  )
})
