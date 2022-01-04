import React, {
  FunctionComponent,
  Children,
  cloneElement,
  ChangeEvent,
  BaseSyntheticEvent,
} from 'react'
import { noop } from '@aviato/utils'
import { useUncontrolled, useUuid } from '@aviato/hooks'
import { DefaultProps, styled } from '~/theme'
import { Radio } from './Radio'
import { InputWrapper } from '../InputWrapper'
import { DefaultChangePayload } from '~/types/events'
import { Group } from '~/components/Layout'

const RadioGroupWrapper = styled('div', {
  position: 'relative',
})

export interface OnRadioGroupChangePayload
  extends DefaultChangePayload<HTMLInputElement> {
  value: string
}

export interface RadioGroupProps extends DefaultProps {
  value?: string
  defaultValue?: string
  label?: string
  description?: string
  error?: string
  direction?: 'horizontal' | 'vertical'
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
    direction = 'horizontal',
    children,
    ...remainingProps
  } = properties

  const uuid = useUuid({ prefix: 'radio' })

  const handleChange = ({
    value,
    index,
    event,
  }: {
    value: string
    index: number
    event: BaseSyntheticEvent
  }) => {
    onChange({
      value,
      index,
      event,
    })
  }

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: '',
    onChange: () => {},
    rule: (value) => typeof value === 'string',
  })

  const childrenArray = Children.toArray(children) as React.ReactElement[]
  const radioChildren = childrenArray.filter((item) => item.type === Radio)

  const mappedRadioChildren = radioChildren.map((radio, index) => {
    return cloneElement(radio, {
      name: uuid,
      key: `RadioGroupItem-${index}`,
      checked: _value === radio.props.value,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const updatedValue = event.currentTarget.value

        handleChange({ value: updatedValue, index, event })

        return setValue(updatedValue)
      },
    })
  })

  return (
    <InputWrapper label={label} description={description} error={error}>
      <RadioGroupWrapper {...remainingProps}>
        <Group
          role="radiogroup"
          direction={direction === 'horizontal' ? 'row' : 'column'}
          css={{ paddingTop: '$sm' }}
        >
          {mappedRadioChildren}
        </Group>
      </RadioGroupWrapper>
    </InputWrapper>
  )
}
