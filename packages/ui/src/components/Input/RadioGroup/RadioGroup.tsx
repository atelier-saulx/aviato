import React, {
  Children,
  cloneElement,
  ChangeEvent,
  ElementRef,
  useEffect,
} from 'react'
import { ComponentProps } from '@stitches/react'
import { useUncontrolled, useUuid } from '@aviato/hooks'
import { styled } from '~/theme'
import { Radio } from './Radio'
import { InputWrapper } from '../InputWrapper'
import { onChange } from '~/types/events'
import { Group } from '~/components/Layout'
import { noop } from '@aviato/utils'

const StyledRadioGroup = styled('div', {})

export interface OnRadioGroupChange
  extends onChange<ChangeEvent<HTMLInputElement>> {
  value: string
}

export interface RadioGroupProps {
  value?: string
  defaultValue?: string
  label?: string
  description?: string
  error?: string
  direction?: 'horizontal' | 'vertical'
  onChange?: (value: string, payload: OnRadioGroupChange) => void
}

type StitchedProps = ComponentProps<typeof StyledRadioGroup>
type ForwardProps = Omit<StitchedProps, 'onChange'> & RadioGroupProps

export const RadioGroup = React.forwardRef<
  ElementRef<typeof Group>,
  ForwardProps
>((properties, forwardedRef) => {
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
    event: ChangeEvent<HTMLInputElement>
  }) => {
    onChange(value, {
      value,
      index,
      event,
    })
  }

  const [radioGroupValue, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: '',
    rule: (value) => typeof value === 'string',
    onChange: () => {},
  })

  const childrenArray = Children.toArray(children) as React.ReactElement[]
  const radioChildren = childrenArray.filter((item) => item.type === Radio)

  /**
   * Set default value if none is set.
   */
  useEffect(() => {
    if (radioGroupValue === '' && radioChildren.length > 0) {
      setValue(radioChildren?.[0].props?.value)
    }
  })

  const mappedRadioChildren = radioChildren.map((radio, index) => {
    return cloneElement(radio, {
      name: uuid,
      key: `RadioGroupItem-${index}`,
      checked: radioGroupValue === radio.props.value,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event?.currentTarget ?? {}

        handleChange({ value, index, event })

        return setValue(value)
      },
    })
  })

  return (
    <InputWrapper label={label} description={description} error={error}>
      <StyledRadioGroup ref={forwardedRef} {...remainingProps}>
        <Group
          role="radiogroup"
          direction={direction === 'horizontal' ? 'row' : 'column'}
          css={{ paddingTop: '$xxs', paddingBottom: '$xxs' }}
        >
          {mappedRadioChildren}
        </Group>
      </StyledRadioGroup>
    </InputWrapper>
  )
})
