import React, { FunctionComponent, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Text } from '../Text'
import { Conditional } from '../Conditional'

const StyledDiv = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  cursor: 'pointer',

  '&:hover': {
    background: 'rgba(0, 0, 0, 0.2)',
  },
})

export type MenuItemProps = {
  title: string
  onClick?: (value) => void
}

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  title,
  onClick,
  children,
}) => {
  const [isOpen, setIsCollapsed] = useState(false)

  const triggerClick = useCallback(() => {
    onClick?.(this)
    setIsCollapsed(!isOpen)
  }, [isOpen])

  return (
    <StyledDiv
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        cursor: 'pointer',
      }}
      onClick={triggerClick}
    >
      <Text>{title}</Text>
      <Conditional test={isOpen}>{children}</Conditional>
    </StyledDiv>
  )
}
