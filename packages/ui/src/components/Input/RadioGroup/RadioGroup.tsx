import React, {
  forwardRef,
  Children,
  cloneElement,
  ChangeEvent,
  ElementRef,
  useEffect,
  ReactElement,
} from 'react'
import { ComponentProps } from '@stitches/react'
import { useUncontrolled, useUuid } from '@aviato/hooks'
import { noop } from '@aviato/utils'

import { styled } from '~/theme'
import { Group } from '~/components/Layout'
import { onChange } from '~/types/events'
import { Radio } from './Radio'
import { InputWrapper } from '../InputWrapper'

const StyledRadioGroup = styled('div', {})

export interface OnRadioGroupChange
  extends onChange<ChangeEvent<HTMLInputElement>> {
  value: string
}

type StitchedProps = Omit<ComponentProps<typeof StyledRadioGroup>, 'onChange'>

export interface RadioGroupProps extends StitchedProps {
  value?: string
  defaultValue?: string
  label?: string
  description?: string
  error?: string
  direction?: 'horizontal' | 'vertical'
  onChange?: (value: string, payload: OnRadioGroupChange) => void
}

export const RadioGroup = forwardRef<ElementRef<typeof Group>, RadioGroupProps>(
  (properties, forwardedRef) => {
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
    })

    const childrenArray = Children.toArray(children) as ReactElement[]
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
  }
)
