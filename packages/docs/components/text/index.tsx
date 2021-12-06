import {
  styled,
  Title as AviatoTitle,
  TitleProps as AviatoTitleProps,
  Text as AviatoText,
  TextProps as AviatoTextProps,
} from '@aviato/ui'

import { FunctionComponent } from 'react'

export type NextTitleProps = AviatoTitleProps & {
  paddingLeft?: number
}

export const NextTitle: FunctionComponent<NextTitleProps> = ({
  children,
  paddingLeft = undefined,
  ...remainingProps
}) => {
  return (
    <AviatoText
      css={{
        paddingLeft,
        paddingBottom: 10,
      }}
    >
      {children}
    </AviatoText>
  )
}

export type TextProps = AviatoTextProps & {
  paddingLeft?: number
}

export const NextText: FunctionComponent<TextProps> = ({
  children,
  paddingLeft = undefined,
  ...remainingProps
}) => {
  return (
    <AviatoText
      css={{
        paddingLeft,
        paddingBottom: 10,
      }}
    >
      {children}
    </AviatoText>
  )
}

export type NextParagraphProps = AviatoTextProps & {
  paddingLeft?: number
}

export const NextParagraph: FunctionComponent<NextParagraphProps> = ({
  children,
  paddingLeft = undefined,
  ...remainingProps
}) => {
  return (
    <AviatoText
      css={{
        paddingLeft,
        paddingBottom: 10,
      }}
    >
      {children}
    </AviatoText>
  )
}
