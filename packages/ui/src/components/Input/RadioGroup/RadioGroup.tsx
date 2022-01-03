import React, { FunctionComponent, Children, cloneElement } from 'react'
import { noop } from '@aviato/utils'
import { useUncontrolled, useUuid } from '@aviato/hooks'
import { DefaultProps, styled } from '~/theme'
import { Radio } from './Radio'
import { InputWrapper } from '../InputWrapper'
import { DefaultChangePayload } from '~/types/events'

const StyledRadioGroupWrapper = styled('div', {
  position: 'relative',
})

export interface OnRadioGroupChangePayload extends DefaultChangePayload {
  value: string
}

export interface RadioGroupProps extends DefaultProps {
  value?: string
  defaultValue?: string
  label?: string
  description?: string
  error?: string
  onChange?: (payload: OnRadioGroupChangePayload) => void
}

export const RadioGroup: FunctionComponent<RadioGroupProps> = (properties) => {
  const {
    value,
    defaultValue,
    onChange = noop,
    label,
    description,
    error,
    children,
    ...remainingProps
  } = properties

  const uuid = useUuid({ prefix: 'radio' })

  const handleChange = (value: string) => {
    onChange({
      value,
    })
  }

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: '',
    onChange: handleChange,
    rule: (value) => typeof value === 'string',
  })

  const childrenArray = Children.toArray(children) as React.ReactElement[]
  const radioChildren = childrenArray.filter((item) => item.type === Radio)

  const mappedRadioChildren = radioChildren.map((radio, index) => {
    return cloneElement(radio, {
      name: uuid,
      key: `RadioGroupItem-${index}`,
      checked: _value === radio.props.value,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        return setValue(event.currentTarget.value)
      },
    })
  })

  return (
    <InputWrapper label={label} description={description} error={error}>
      <StyledRadioGroupWrapper {...remainingProps}>
        {mappedRadioChildren}
      </StyledRadioGroupWrapper>
    </InputWrapper>
  )
}
