import React, { forwardRef, ElementRef, SyntheticEvent, ReactNode } from 'react'
import { isText } from '@aviato/utils'
import { Text } from '~/components/Text'
import { StitchedCSS, Color, styled } from '~/theme'
import { removeOverlay } from '~/components/BasedUI/Overlay'

const StyledContextItem = styled('div', {
  display: 'flex',
  height: '32px',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '16px',
  paddingRight: '16px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$ActionLight',
  },
  '&:active': {
    backgroundColor: '$ActionLightSelected',
  },
})

const LeftWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const IconMarginWrapper = styled('div', {
  marginRight: 16,
  height: 16,
  width: 16,
})

export type ContextItemProps = {
  css?: StitchedCSS
  color?: Color
  onClick?: (e?: SyntheticEvent) => void | true | false
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  inset?: boolean
  children?: ReactNode | string
}

export const ContextItem = forwardRef<
  ElementRef<typeof StyledContextItem>,
  ContextItemProps
>((props, forwardedRef) => {
  let {
    onClick,
    css,
    color = '$TextPrimary',
    children,
    leftIcon = null,
    inset,
    rightIcon = null,
  } = props

  if (onClick) {
    const onClickOriginal = onClick
    // @ts-ignore - this is a hack to make the onClick work, async is very important
    onClick = async (e) => {
      e.preventDefault()
      e.stopPropagation()
      try {
        if (!(await onClickOriginal(e))) {
          removeOverlay()
        }
      } catch (err) {
        // send animation
      }
    }
  }

  // TODO: fix the color stuff everywhere
  let child = isText(children) ? (
    <Text css={{ userSelect: 'none' }} color="inherit">
      {children}
    </Text>
  ) : (
    children
  )

  if (leftIcon || inset) {
    child = (
      <LeftWrapper>
        <IconMarginWrapper>{leftIcon || null}</IconMarginWrapper>
        {child}
      </LeftWrapper>
    )
  }

  if (!css) {
    css = {}
  }

  if (!css.color) {
    css.color = color
  }

  return (
    <StyledContextItem
      onClick={onClick}
      css={css}
      color={color}
      ref={forwardedRef}
    >
      {child}
      {rightIcon}
    </StyledContextItem>
  )
})

ContextItem.displayName = 'ContextItem'
