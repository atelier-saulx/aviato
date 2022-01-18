import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { Text } from '~/components/Text'
import { Conditional } from '~/components/Utilities'
import { IconError } from '~/components/Icons'

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

export interface InputWrapperProps
  extends ComponentProps<typeof StyledInputWrapper> {
  label?: string
  description?: string
  error?: string
}

export const InputWrapper = forwardRef<
  ElementRef<typeof StyledInputWrapper>,
  InputWrapperProps
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
            <Text color="Inherit">{error}</Text>
          </Error>
        </ErrorWrapper>
      </Conditional>
    </StyledInputWrapper>
  )
})
