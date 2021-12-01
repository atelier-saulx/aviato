import React, { FunctionComponent } from 'react'

import { styled } from '@aviato/ui'

const WrapperDiv = styled('div', {
  marginLeft: '20px',
  marginBottom: '20px',
})

const ComponentWrapperDiv = styled('div', {
  display: 'flex',
  flexFlow: 'column nowrap',
  border: '1px dashed rgba(5, 24, 41, 0.2)',
  padding: '20px',
  borderRadius: '7px',
  backgroundColor: 'transparent',
})

const FlexDiv = styled('div', {
  display: 'flex',
})

export type DisplayComponentProps = {}

export const DisplayComponent: FunctionComponent<DisplayComponentProps> = ({
  children,
}) => {
  return (
    <WrapperDiv>
      <ComponentWrapperDiv>
        <FlexDiv>{children}</FlexDiv>
      </ComponentWrapperDiv>
    </WrapperDiv>
  )
}
