import React, { FunctionComponent } from 'react'

import { styled } from '@aviato/ui'
import { NextText } from '../../components'

const WrapperDiv = styled('div', {
  margin: '20px',
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

export type DisplayComponentProps = {
  name?: string
}

const DisplayComponent: FunctionComponent<DisplayComponentProps> = ({
  name,
  children,
}) => {
  let actualComponentName = ''

  React.Children.forEach(children, (child) => {
    actualComponentName = (child as any)?.type?.name ?? ''
  })

  const componentName = name ?? actualComponentName

  return (
    <WrapperDiv>
      <NextText>{componentName}</NextText>

      <ComponentWrapperDiv>
        <FlexDiv>{children}</FlexDiv>
      </ComponentWrapperDiv>
    </WrapperDiv>
  )
}

export default DisplayComponent
