import React, { FunctionComponent } from 'react'

import { styled } from '@aviato/ui'

const WrapperDiv = styled('div', {
  marginLeft: '0px',
  marginBottom: '20px',
})

const ComponentWrapperDiv = styled('div', {
  display: 'flex',
  flexFlow: 'column nowrap',
  padding: '20px',
  paddingLeft: '0px',
  borderRadius: '4px',
  background: '$PrimaryLight',
})

const InnerDiv = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  filter: 'drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.12))',
  margin: '60px 0px',
})

export type DisplayComponentProps = {}

export const DisplayComponent: FunctionComponent<DisplayComponentProps> = ({
  children,
}) => {
  return (
    <WrapperDiv>
      <ComponentWrapperDiv>
        <InnerDiv>{children}</InnerDiv>
      </ComponentWrapperDiv>
    </WrapperDiv>
  )
}
