import {
  styled,
  Title as AviatoTitle,
  TitleProps as AviatoTitleProps,
  Text as AviatoText,
  TextProps as AviatoTextProps,
} from '@aviato/ui'

import { FunctionComponent } from 'react'

const NextTitleDiv = styled('div', {
  paddingBottom: 10,
})

export type NextTitleProps = AviatoTitleProps & {
  paddingLeft?: number
}

export const NextTitle: FunctionComponent<NextTitleProps> = ({
  children,
  paddingLeft = undefined,
  ...remainingProps
}) => {
  return (
    <NextTitleDiv
      css={{
        paddingLeft,
      }}
    >
      <AviatoTitle {...remainingProps}>{children}</AviatoTitle>
    </NextTitleDiv>
  )
}

const NextTextDiv = styled('div', {
  paddingBottom: 10,
})

export type TextProps = AviatoTextProps & {
  paddingLeft?: number
}

export const NextText: FunctionComponent<TextProps> = ({
  children,
  paddingLeft = undefined,
  ...remainingProps
}) => {
  return (
    <NextTextDiv
      css={{
        paddingLeft,
      }}
    >
      <AviatoText {...remainingProps}>{children}</AviatoText>
    </NextTextDiv>
  )
}

const NextParagraphDiv = styled('div', {
  paddingBottom: 10,
})

export type NextParagraphProps = AviatoTextProps & {
  paddingLeft?: number
}

export const NextParagraph: FunctionComponent<NextParagraphProps> = ({
  children,
  paddingLeft = undefined,
  ...remainingProps
}) => {
  return (
    <NextParagraphDiv
      css={{
        paddingLeft,
      }}
    >
      <AviatoText {...remainingProps}>{children}</AviatoText>
    </NextParagraphDiv>
  )
}
