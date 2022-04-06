import React, {
  forwardRef,
  ElementRef,
  ReactNode,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react'
import { isText } from '@aviato/utils'
import { Text } from '~/components/Text'
import { StitchedCSS, Color, styled } from '~/theme'
import { removeOverlay } from '~/components/Overlay/OverlayPortal'
import { PropsEventHandler } from '~/types'

const StyledContextItem = styled('div', {
  display: 'flex',
  height: '32px',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '16px',
  paddingRight: '16px',
  cursor: 'pointer',
  // '&:hover': {
  //   backgroundColor: '$ActionLightHover',
  // },
  '&:active': {
    backgroundColor: '$ActionLightSelected',
  },
  '&:focus': {
    backgroundColor: '$ActionLightHover',
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
  noFocus?: boolean
  tabIndex?: number
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
    tabIndex = 0,
    noFocus,
    rightIcon = null,
  } = props

  if (onClick) {
    const onClickOriginal = onClick
    // will become a  hook (a useCallback)
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

  if (noFocus) {
    return (
      <StyledContextItem ref={forwardedRef} onClick={onClick} css={css}>
        {child}
        {rightIcon}
      </StyledContextItem>
    )
  }

  // only relevant if focusable

  const [isHover, setHover] = useState(false)

  const ref = useRef(forwardRef)

  useEffect(() => {
    if (isHover) {
      // @ts-ignore
      ref.current.focus()
    } else {
      // @ts-ignore
      ref.current.blur()
    }
  }, [isHover, ref])

  return (
    <StyledContextItem
      data-aviato-context-item
      tabIndex={tabIndex}
      // @ts-ignore
      ref={ref}
      onMouseEnter={useCallback(() => setHover(true), [])}
      onMouseLeave={useCallback(() => setHover(false), [])}
      onClick={onClick}
      css={css}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter') {
                if (onClick) {
                  onClick(e)
                }
              }
            }
          : null
      }
    >
      {child}
      {rightIcon}
    </StyledContextItem>
  )
})

ContextItem.displayName = 'ContextItem'
