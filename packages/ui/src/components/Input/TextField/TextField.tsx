import React, { ElementRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useUuid } from '@aviato/hooks'
import { StitchedCSS } from '~/theme'

import { Input, InputProps, StyledInput } from '../Input'

export const TextFieldStyles: StitchedCSS = {
  padding: '10px 12px',
  height: 'auto',
  maxHeight: 'auto',
  resize: 'none',
}

export interface TextFieldProps {
  autosize?: boolean
  maxRows?: number
  minRows?: number
}

type ForwardProps = InputProps & TextFieldProps

export const TextField = React.forwardRef<
  ElementRef<typeof StyledInput>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    autosize = false,
    multiline = false,
    minRows,
    maxRows,
    ...remainingProps
  } = properties

  const uuid = useUuid({ prefix: 'text-field' })

  if (autosize) {
    return (
      <Input
        ref={forwardedRef}
        component={TextareaAutosize}
        css={TextFieldStyles}
        id={uuid}
        multiline={multiline}
        maxRows={maxRows}
        minRows={minRows}
        {...remainingProps}
      />
    )
  }

  return (
    <Input
      ref={forwardedRef}
      component="textarea"
      css={TextFieldStyles}
      id={uuid}
      multiline={multiline}
      {...remainingProps}
    />
  )
})
