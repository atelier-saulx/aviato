import React, { FunctionComponent, ReactNode } from 'react'
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

export interface TooltipProps {
  content: ReactNode | string
  delayDuration?: number
  asChild?: boolean
}

export const Tooltip: FunctionComponent<TooltipProps> = ({
  content,
  delayDuration = 0,
  asChild = false,
  children,
}) => {
  return (
    <Root delayDuration={delayDuration}>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Root>
  )
}
