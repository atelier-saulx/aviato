import React, { FunctionComponent, useState } from 'react'
import { Conditional } from '~/components/Conditional'
import { Text } from '~/components/Text'
import { noop } from '@aviato/utils'
import { styled, classNames } from '~/theme'

const StyledButton = styled('button', {
  width: '100%',
  padding: '4px 12px',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  color: '$TextSecondary',
  borderRadius: 4,

  '&:hover': {
    background: '$ActionMainHover',
  },
  '&:active': {
    background: '$ActionMainFocus',
    color: '$TextPrimary',
  },

  '&.active': {
    color: '$TextPrimary',
    background: '$PrimaryLightSelected',
  },
  '&.header': {
    fontWeight: 700,
  },
})

export type MenuItemProps = {
  title: string
  onClick?: (value) => void
  isCollapsable?: boolean
  isActive?: boolean
  isHeader?: boolean
}

type CoercedClick = () => void

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  title,
  onClick,
  children,
  isCollapsable = false,
  isActive = false,
  isHeader = false,
}) => {
  const hasChildren = Boolean(children)
  const [isOpen, setIsOpen] = useState(hasChildren)
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
    active: isActive,
  })

  return (
    <>
      <StyledButton onClick={toggle} className={classes}>
        <Text weight={isHeader ? 'bold' : 'regular'}>{title}</Text>
      </StyledButton>

      <Conditional test={isOpen}>
        <div onClick={(event) => event.stopPropagation()}>{children}</div>
      </Conditional>
    </>
  )
}
