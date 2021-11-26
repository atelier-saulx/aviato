import React, { FunctionComponent, useState } from 'react'
import { Text } from '../Text'
import { Conditional } from '../Conditional'

import { noop } from '@aviato/utils'

export type MenuItemProps = {
  title: string
  onClick?: (value) => void
  isCollapsable?: boolean
}

type CoercedClick = () => void

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  title,
  onClick,
  children,
  isCollapsable = true,
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
