import React, { FunctionComponent } from 'react'
import { CodeSnippet, Conditional } from '@aviato/ui'

import { NextText, NextTitle } from '../text'

export interface ShowcaseHeaderProps {
  title: string
  description: string
  props?: string
}

export const ShowcaseHeader: FunctionComponent<ShowcaseHeaderProps> = ({
  title,
  description,
  props: componentProperties,
}) => {
  return (
    <>
      <NextTitle>{title}</NextTitle>

      <NextText color="Secondary">{description}</NextText>

      <Conditional test={componentProperties}>
        <NextText
          weight="semibold"
          size="large"
          css={{ paddingTop: 20, paddingBottom: 12 }}
        >
          Component Properties
        </NextText>

        <CodeSnippet language="typescript">{componentProperties}</CodeSnippet>
      </Conditional>

      <NextText weight="semibold" size="large" css={{ paddingTop: 20 }}>
        Component Documentation
      </NextText>
    </>
  )
}
