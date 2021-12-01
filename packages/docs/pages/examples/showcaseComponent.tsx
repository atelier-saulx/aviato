import React, { FunctionComponent } from 'react'
import { styled } from '@aviato/ui'

import { NextText, Code } from '../../components'

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

export type ShowcaseComponentProps = {
  component: JSX.Element
  code: string
}

const ShowcaseComponent: FunctionComponent<ShowcaseComponentProps> = ({
  component,
  code,
}) => {
  let componentName = ''

  React.Children.forEach(component, (child) => {
    componentName = (child as any)?.type.name
  })

  return (
    <WrapperDiv>
      <NextText>{componentName}</NextText>

      <ComponentWrapperDiv>
        <FlexDiv>{component}</FlexDiv>
      </ComponentWrapperDiv>

      <Code code={code} language={'jsx'} />
    </WrapperDiv>
  )
}

export default ShowcaseComponent
