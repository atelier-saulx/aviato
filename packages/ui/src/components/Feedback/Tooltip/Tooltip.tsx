import React from 'react'
import { styled } from '~/theme'
import { Root, Content, Trigger } from '@radix-ui/react-tooltip'

const TooltipContent = styled(Content, {
  padding: '4px 8px',
  borderRadius: 4,
  color: '$TextPrimary',
  backgroundColor: '$CalloutMain',
  border: '1px solid $OtherDivider',
})

const TooltipTrigger = styled(Trigger, {
  cursor: 'pointer',
})

export const Tooltip = ({ children, content, delayDuration = 0 }) => {
  return (
    <Root delayDuration={delayDuration}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Root>
  )
}
