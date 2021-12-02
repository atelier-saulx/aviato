import React, { FunctionComponent, useCallback, useState } from 'react'
import { Conditional } from '~/components/Utilities/Conditional'
import { Text } from '~/components/Text'
import { noop } from '@aviato/utils'
import { styled, classNames, css } from '~/theme'
import { Arrow } from './assets'
import { PlaceholderIcon } from './temp'

const MenuItemStyles = css({
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

const StyledMenuItem = styled('button', MenuItemStyles)

const StyledChild = styled('div', {
  paddingTop: '2px',
})

const Column = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'center',
})

const IconWrapper = styled('div', {
  padding: '4px',
  paddingRight: '8px',
})

export type MenuItemProps = {
  title: string
  icon?: 'box' | 'paper' | 'circle'
  isActive?: boolean
  isHeader?: boolean
  startOpen?: boolean
  onClick?: (value) => void
}

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  title,
  onClick = noop,
  children,
  isActive = false,
  isHeader = false,
  startOpen = true,
  icon,
  ...remainingProps
}) => {
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
      <StyledMenuItem onClick={toggle} className={classes} {...remainingProps}>
        <Column>
          <Conditional test={icon}>
            <IconWrapper>
              <PlaceholderIcon type={icon} />
            </IconWrapper>
          </Conditional>

          <Conditional test={isCollapsible}>
            <span>
              <Arrow state={isOpen ? 'open' : 'closed'} />
            </span>
          </Conditional>

          <Text weight={isHeader || hasChildren ? 'Bold' : 'Regular'}>
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
}
