import { FunctionComponent } from 'react'
import { DisplayComponent } from './displayComponent'
import { NextTitle, NextText } from '../text'

import { styled, Conditional } from '@aviato/ui'

const ComponentWrapperDiv = styled('div', {
  display: 'flex',
  flexFlow: 'column nowrap',
  width: '100%',
  margin: '0 auto',
})

const PaddingTop = styled('div', {
  paddingTop: '20px',
})

export type DisplayComponentProps = {
  title?: string
  description?: string
}

export const ShowcaseComponent: FunctionComponent<DisplayComponentProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <ComponentWrapperDiv>
      <Conditional test={title}>
        <NextTitle weight="Bold" size="ExtraLarge">
          {title}
        </NextTitle>
      </Conditional>

      <Conditional test={description}>
        <NextText color="Secondary">{description}</NextText>
      </Conditional>

      <PaddingTop>
        <DisplayComponent>{children}</DisplayComponent>
      </PaddingTop>
    </ComponentWrapperDiv>
  )
}
