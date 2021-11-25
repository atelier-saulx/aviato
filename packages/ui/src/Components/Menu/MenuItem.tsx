import React, { FunctionComponent, useCallback, useState } from 'react'
import { Text } from '../Text'
import { Conditional } from '../Conditional'

export type MenuItemProps = {
  title: string
  onClick?: (value) => void
}

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  title,
  onClick,
  children,
}) => {
  const hasChildren = Boolean(children)
  const [isOpen, setIsOpen] = useState(hasChildren)

  const triggerClick = useCallback(() => {
    onClick?.(this)

    if (hasChildren) {
      setIsOpen(!isOpen)
    }
  }, [isOpen])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        width: '100%',
        cursor: 'pointer',
        padding: '6px',
      }}
      onClick={triggerClick}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
        }}
      >
        <Text>{title}</Text>

        <Conditional test={hasChildren}>
          <span
            style={{
              marginLeft: 'auto',
              marginRight: '6px',
            }}
          >
            {isOpen ? '-' : '+'}
          </span>
        </Conditional>
      </div>

      <Conditional test={isOpen}>
        <div onClick={(event) => event.stopPropagation()}>{children}</div>
      </Conditional>
    </div>
  )
}
