import React, { FunctionComponent, Children, cloneElement } from 'react'
import { noop } from '@aviato/utils'
import { useUncontrolled } from '~/hooks/state/useUncontrolled'
import { DefaultProps, styled } from '~/theme'
import { Radio } from './Radio'

const StyledRadioGroupWrapper = styled('div', {
  position: 'relative',
})

export interface RadioGroupProps extends DefaultProps {
  onChange?(value: string): void
  value?: string
  defaultValue?: string
}

export const RadioGroup: FunctionComponent<RadioGroupProps> = (properties) => {
  const {
    onChange = noop,
    value,
    defaultValue,
    children,
    ...remainingProps
  } = properties

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: '',
    onChange,
    rule: (value) => typeof value === 'string',
  })

  const radios: any = (Children.toArray(children) as React.ReactElement[])
    .filter((item) => item.type === Radio)
    .map((radio, index) =>
      cloneElement(radio, {
        key: index,
        checked: _value === radio.props.value,
        __staticSelector: 'RadioGroup',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          setValue(event.currentTarget.value),
      })
    )

  return (
    <StyledRadioGroupWrapper {...remainingProps}>
      {radios}
    </StyledRadioGroupWrapper>
  )
}
