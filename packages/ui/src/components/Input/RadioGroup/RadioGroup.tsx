import React, { forwardRef, cloneElement, ChangeEvent, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { noop, filterChildrenByType } from '@aviato/utils'

import { useUncontrolled, useUuid } from '~/hooks'
import { styled } from '~/theme'
import { Group } from '~/components/Layout'
import { onChange } from '~/types'
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

      setValue(value)
    }

    const radioChildren = filterChildrenByType(children, Radio)

    const getDefaultValue = () => {
      return radioChildren?.[0].props?.value ?? ''
    }

    const [radioGroupValue, setValue] = useUncontrolled({
      value,
      defaultValue,
      finalValue: getDefaultValue(),
      rule: (value) => typeof value === 'string',
    })

    const mappedRadioChildren = radioChildren.map((radio, index) => {
      const { value } = radio.props ?? {}

      return cloneElement(radio, {
        name: uuid,
        key: `RadioGroupItem-${index}`,
        checked: radioGroupValue === value,
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          handleChange({ value, index, event })
        },
      })
    })

    return (
      <InputWrapper label={label} description={description} error={error}>
        <StyledRadioGroup ref={forwardedRef} {...remainingProps}>
          <Group
            role="radiogroup"
            direction={direction}
            css={{ paddingTop: '$xxs', paddingBottom: '$xxs' }}
          >
            {mappedRadioChildren}
          </Group>
        </StyledRadioGroup>
      </InputWrapper>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
