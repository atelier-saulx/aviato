import React, { forwardRef, ElementRef, ReactNode } from 'react'
import { isText } from '@aviato/utils'
import { Text } from '~/components/Text'
import { StitchedCSS, Color, styled } from '~/theme'
import { removeOverlay } from '~/components/BasedUI/Overlay'
import { PropsEventHandler } from '~/components/BasedUI/types'

const StyledContextItem = styled('div', {
  display: 'flex',
  height: '32px',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '16px',
  paddingRight: '16px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$ActionLightHover',
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
  onClick?: PropsEventHandler
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  inset?: boolean
  children?: ReactNode | string
}

export const ContextDivider = styled('div', {
  marginTop: 4,
  borderTop: '1px solid $OtherDivider',
  marginBottom: 4,
})

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
        console.error(err)
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
    <StyledContextItem onClick={onClick} css={css} ref={forwardedRef}>
      {child}
      {rightIcon}
    </StyledContextItem>
  )
})

ContextItem.displayName = 'ContextItem'
