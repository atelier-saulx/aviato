import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Text } from '../Text'

const StyledDiv = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  cursor: 'pointer',

  '&:hover': {
    background: 'red',
  },
})

export type MenuItemProps = {
  title: string
  onClick?: (value) => void
}

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  title,
  onClick,
}) => {
  return (
    <StyledDiv
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Text>{title}</Text>
    </StyledDiv>
  )
}
