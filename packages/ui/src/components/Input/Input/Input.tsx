import React, { ElementRef } from 'react'
import { useUuid } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'
import { StitchedCSS } from '~/theme'

import { BaseInput, BaseInputProps, StyledInput } from './BaseInput'

const InputStyles: StitchedCSS = {}

export interface InputProps extends BaseInputProps {}

type ForwardProps = ComponentProps<typeof StyledInput> & InputProps

export const Input = React.forwardRef<
  ElementRef<typeof StyledInput>,
  ForwardProps
>((properties, forwardedRef) => {
  const { ...remainingProps } = properties

  const uuid = useUuid({ prefix: 'input' })

  return (
    <BaseInput
      ref={forwardedRef}
      css={InputStyles}
      id={uuid}
      {...remainingProps}
    />
  )
})
