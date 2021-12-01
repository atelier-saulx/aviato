import React, { FunctionComponent, useState } from 'react'
import { Conditional } from '~/components/Utilities/Conditional'
import { Text } from '~/components/Text'
import { noop } from '@aviato/utils'
import { styled, classNames } from '~/theme'
import { Arrow } from './assets'

const StyledButton = styled('button', {
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

export type MenuItemProps = {
  title: string
  onClick?: (value) => void
  isCollapsable?: boolean
  isActive?: boolean
  isHeader?: boolean
  startOpen?: boolean
}

type CoercedClick = () => void

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  title,
  onClick,
  children,
  isActive = false,
  isHeader = false,
  startOpen = true,
  ...remainingProps
}) => {
  const hasChildren = Boolean(children)
  const isCollapsable = !isHeader && hasChildren
  const [isOpen, setIsOpen] = useState(startOpen)
  const click = (onClick as CoercedClick) ?? noop

  const toggle = () => {
    if (!isCollapsable) {
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
      <StyledButton onClick={toggle} className={classes} {...remainingProps}>
        <Column>
          <Conditional test={isCollapsable}>
            <span>
              <Arrow state={isOpen ? 'open' : 'closed'} />
            </span>
          </Conditional>
          <Text weight={isHeader ? 'Bold' : 'Regular'}>{title}</Text>
        </Column>
      </StyledButton>

      <Conditional test={isOpen}>
        <StyledChild onClick={(event) => event.stopPropagation()}>
          {children}
        </StyledChild>
      </Conditional>
    </>
  )
}
