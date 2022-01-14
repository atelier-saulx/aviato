import React, { ElementRef, forwardRef, useCallback, useState } from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

import { Conditional } from '~/components/Utilities/Conditional'
import { Text } from '~/components/Text'
import { styled, classNames } from '~/theme'

const StyledMenuItem = styled('button', {
  width: '100%',
  padding: '4px 12px',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  borderRadius: 4,
  color: '$TextSecondary',
  background: 'transparent',

  '&:hover': {
    background: '$ActionMainHover',
  },

  '&:active': {
    color: '$TextPrimary',
    background: '$PrimaryLightSelected',
  },
  '&.isActive': {
    color: '$TextPrimary',
    background: '$PrimaryLightSelected',
  },

  '&.isHeader': {
    cursor: 'unset',

    '&:hover': {
      background: 'transparent',
    },
  },
})

const StyledChild = styled('div', {
  paddingTop: '2px',
})

const Column = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'center',
})

export interface MenuItemProps extends ComponentProps<typeof StyledMenuItem> {
  title: string
  isActive?: boolean
  isHeader?: boolean
  startOpen?: boolean
  onClick?: (value) => void
}

export const MenuItem = forwardRef<
  ElementRef<typeof StyledMenuItem>,
  MenuItemProps
>((properties, forwardedRef) => {
  const {
    title,
    onClick = noop,
    children,
    isActive = false,
    isHeader = false,
    startOpen = true,
    ...remainingProps
  } = properties

  const hasChildren = Boolean(children)
  const isCollapsible = !isHeader && hasChildren
  const [isOpen, setIsOpen] = useState(startOpen)

  const toggle = useCallback(() => {
    if (!isCollapsible) {
      return onClick()
    }

    if (hasChildren) {
      setIsOpen(!isOpen)
    } else {
      onClick()
    }
  }, [isCollapsible, isOpen, hasChildren])

  const classes = classNames({
    isActive,
    isHeader,
  })

  return (
    <>
      <StyledMenuItem
        onClick={toggle}
        className={classes}
        ref={forwardedRef}
        {...remainingProps}
      >
        <Column>
          <Text
            weight={isHeader || hasChildren ? 'bold' : 'regular'}
            color={isHeader || hasChildren ? 'Primary' : 'Inherit'}
          >
            {title}
          </Text>
        </Column>
      </StyledMenuItem>

      <Conditional test={isOpen}>
        <StyledChild onClick={(event) => event.stopPropagation()}>
          {children}
        </StyledChild>
      </Conditional>
    </>
  )
})
