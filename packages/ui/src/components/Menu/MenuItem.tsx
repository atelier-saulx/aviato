import React, { ElementRef, useState } from 'react'
import { Conditional } from '~/components/Utilities/Conditional'
import { Text } from '~/components/Text'
import { noop } from '@aviato/utils'
import { styled, classNames } from '~/theme'
import { Arrow } from './assets'

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
    background: '$ActionMainFocus',
    color: '$TextPrimary',
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

type MenuItemProps = {
  title: string
  isCollapsable?: boolean
  isActive?: boolean
  isHeader?: boolean
  startOpen?: boolean
  onClick?: (value) => void
}

export const MenuItem = React.forwardRef<
  ElementRef<typeof StyledMenuItem>,
  MenuItemProps
>((properties, forwardedRef) => {
  const {
    title,
    onClick,
    children,
    isActive = false,
    isHeader = false,
    startOpen = true,
    ...remainingProps
  } = properties

  const hasChildren = Boolean(children)
  const isCollapsible = !isHeader && hasChildren
  const [isOpen, setIsOpen] = useState(startOpen)
  const click = onClick ?? noop

  const toggle = () => {
    if (!isCollapsible) {
      return click()
    }

    if (hasChildren) {
      setIsOpen(!isOpen)
    } else {
      click()
    }
  }

  const classes = classNames({
    isActive,
    isHeader,
  })

  return (
    <>
      <StyledMenuItem
        ref={forwardedRef}
        onClick={toggle}
        className={classes}
        {...remainingProps}
      >
        <Column>
          <Conditional test={isCollapsible}>
            <span>
              <Arrow state={isOpen ? 'open' : 'closed'} />
            </span>
          </Conditional>
          <Text weight={isHeader ? 'Bold' : 'Regular'}>{title}</Text>
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
