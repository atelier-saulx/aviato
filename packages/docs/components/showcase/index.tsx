import { FunctionComponent } from 'react'
import { DisplayComponent } from './displayComponent'
import { NextTitle, NextParagraph } from '../text'

import { styled, Conditional } from '@aviato/ui'

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
    <div>
      <Conditional test={Boolean(title)}>
        <NextTitle weight="Bold" paddingLeft={20}>
          {title}
        </NextTitle>
      </Conditional>

      <Conditional test={Boolean(description)}>
        <NextParagraph>{description}</NextParagraph>
      </Conditional>

      <DisplayComponent>{children}</DisplayComponent>
    </div>
  )
}
