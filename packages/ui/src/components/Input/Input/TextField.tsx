import React, { ElementRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useUuid } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'
import { StitchedCSS } from '~/theme'

import { BaseInput, BaseInputProps, StyledInput } from './BaseInput'

const TextFieldStyles: StitchedCSS = {
  padding: '10px 12px',
  height: 'auto',
  maxHeight: 'auto',
  resize: 'none',
}

export interface TextFieldProps extends BaseInputProps {
  autosize?: boolean
  maxRows?: number
  minRows?: number
}

type ForwardProps = ComponentProps<typeof StyledInput> & TextFieldProps

export const TextField = React.forwardRef<
  ElementRef<typeof StyledInput>,
  ForwardProps
>((properties, forwardedRef) => {
  const { autosize = false, minRows, maxRows, ...remainingProps } = properties

  const uuid = useUuid({ prefix: 'text-field' })

  if (autosize) {
    return (
      <BaseInput
        ref={forwardedRef}
        component={TextareaAutosize}
        css={TextFieldStyles}
        id={uuid}
        maxRows={maxRows}
        minRows={minRows}
        {...remainingProps}
      />
    )
  }

  return (
    <BaseInput
      ref={forwardedRef}
      component="textarea"
      css={TextFieldStyles}
      id={uuid}
      {...remainingProps}
    />
  )
})
