import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { classNames, styled } from '~/theme'
import { Conditional } from '~/components/Utilities'

const InputWrapper = styled('div', {
  position: 'relative',
})

const StyledInput = styled('input', {
  display: 'block',
  border: '1px solid #ced4da',
  backgroundColor: '#fff',
  height: '36px',
  minHeight: '36px',
  lineHeight: '34px',
  fontSize: '15px',
  width: '100%',
  textAlign: 'left',
  borderRadius: '4px',
  transition: 'border-color 100ms ease',

  paddingLeft: '12px',

  '&.hasLeftIcon': {
    paddingLeft: '32px',
  },

  '&.hasRightIcon': {
    paddingRight: '32px',
  },
})

export const IconWrapper = styled('span', {
  position: 'absolute',
  top: '0',
  bottom: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  width: '36px',
  height: '36px',
  zIndex: '1',

  variants: {
    type: {
      start: {
        left: '0',
      },
      end: {
        right: '0',
      },
    },
  },
})

export interface InputProps {
  component?: React.ElementType
  type?: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url' | 'number'
  placeholder?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

type ForwardProps = ComponentProps<typeof StyledInput> & InputProps

export const Input = React.forwardRef<
  ElementRef<typeof StyledInput>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    component = 'input',
    leftIcon = null,
    rightIcon = null,
    ...remainingProps
  } = properties

  const hasLeftIcon = Boolean(leftIcon)
  const hasRightIcon = Boolean(rightIcon)

  const classes = classNames({
    hasLeftIcon,
    hasRightIcon,
  })

  return (
    <InputWrapper>
      <Conditional test={leftIcon}>
        <IconWrapper type="start">{leftIcon}</IconWrapper>
      </Conditional>

      <StyledInput
        as={component}
        ref={forwardedRef}
        className={classes}
        {...remainingProps}
      />

      <Conditional test={rightIcon}>
        <IconWrapper type="end">{rightIcon}</IconWrapper>
      </Conditional>
    </InputWrapper>
  )
})
