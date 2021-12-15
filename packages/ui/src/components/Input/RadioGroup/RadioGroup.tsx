import React, { FunctionComponent, Children, cloneElement } from 'react'
import { noop } from '@aviato/utils'
import { useUncontrolled, useUuid } from '@aviato/hooks'
import { DefaultProps, styled } from '~/theme'
import { Radio } from './Radio'

const StyledRadioGroupWrapper = styled('div', {
  position: 'relative',
})

export interface RadioGroupProps extends DefaultProps {
  value?: string
  defaultValue?: string
  onChange?(value: string): void
}

export const RadioGroup: FunctionComponent<RadioGroupProps> = (properties) => {
  const {
    value,
    defaultValue,
    onChange = noop,
    children,
    ...remainingProps
  } = properties

  const uuid = useUuid({ prefix: 'radio' })

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: '',
    onChange,
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
    <StyledRadioGroupWrapper {...remainingProps}>
      {mappedRadioChildren}
    </StyledRadioGroupWrapper>
  )
}
