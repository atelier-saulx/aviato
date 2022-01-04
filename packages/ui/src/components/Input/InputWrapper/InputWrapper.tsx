import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { Text } from '~/components/Text'
import { Conditional } from '~/components/Utilities'
import { IconError } from '~/icons'

const StyledInputWrapper = styled('div', {})

const TextWrapper = styled('div', {
  paddingBottom: 8,
})

const ErrorWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 8,
})

const IconWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '24px',
  marginRight: 8,
  color: '$ErrorMain',
})

const Error = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$ErrorMain',
})

export interface InputWrapperProps {
  label?: string
  description?: string
  error?: string
}

type ForwardProps = ComponentProps<typeof StyledInputWrapper> &
  InputWrapperProps

export const InputWrapper = React.forwardRef<
  ElementRef<typeof StyledInputWrapper>,
  ForwardProps
>((properties, forwardRef) => {
  const { label, description, error, children, ...remainingProps } = properties

  const hasLabel = Boolean(label)
  const hasDescription = Boolean(description)
  const hasLabelOrDescription = hasLabel || hasDescription

  return (
    <StyledInputWrapper {...remainingProps} ref={forwardRef}>
      <Conditional test={hasLabelOrDescription}>
        <TextWrapper>
          <Text weight="semibold">{label}</Text>

          <Text>{description}</Text>
        </TextWrapper>
      </Conditional>

      {children}

      <Conditional test={error}>
        <ErrorWrapper>
          <IconWrapper>
            <IconError />
          </IconWrapper>

          <Error>
            <Text>{error}</Text>
          </Error>
        </ErrorWrapper>
      </Conditional>
    </StyledInputWrapper>
  )
})
