import React, { FunctionComponent, useState } from 'react'
import { Text } from '../Text'
import { Conditional } from '../Conditional'

export type MenuItemProps = {
  title: string
  onClick?: (value) => void
  isCollapsable?: boolean
}

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  title,
  onClick,
  children,
  isCollapsable = true,
}) => {
  const hasChildren = Boolean(children)
  const [isOpen, setIsOpen] = useState(hasChildren)

  const toggle = () => {
    if (!isCollapsable) {
      return onClick?.(this)
    }

    if (hasChildren) {
      setIsOpen(!isOpen)
    } else {
      onClick?.(this)
    }
  }

  return (
    <div
      style={{
        width: '100%',
        lineHeight: '15px',
      }}
    >
      <button
        style={{
          width: '100%',
          position: 'relative',
          textAlign: 'left',
          padding: '4px',
          border: 'none',
          background: 'transparent',
          outline: 'none',
          cursor: 'pointer',
        }}
        onClick={toggle}
        type="button"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
          }}
        >
          <Text>{title}</Text>

          <Conditional test={hasChildren && isCollapsable}>
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
      </button>

      <Conditional test={isOpen}>
        <div onClick={(event) => event.stopPropagation()}>{children}</div>
      </Conditional>
    </div>
  )
}
