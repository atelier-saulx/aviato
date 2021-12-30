import React, { ElementRef, useState } from 'react'
import { ComponentProps } from '@stitches/react'
import { useUncontrolled, useMove, useMergedRef } from '@aviato/hooks'
import { noop } from '@aviato/utils'
import { styled } from '~/theme'
import { getChangeValue } from './utils'
import { Track } from './Track'

export type Mark = {
  value: number
  label?: React.ReactNode
}

const StyledSlider = styled('div', {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  cursor: 'pointer',
  width: '100%',
  height: 16,
  touchAction: 'none',
})

export interface SliderProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  marks?: Mark[]
  label?: React.ReactNode | ((value: number) => React.ReactNode)
  showLabelOnHover?: boolean
  labelAlwaysVisible?: boolean
  onChange?(value: string): void
}

type ForwardProps = ComponentProps<typeof StyledSlider> & SliderProps

export const Slider = React.forwardRef<
  ElementRef<typeof StyledSlider>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    value,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    marks = [],
    label = (f) => f,
    showLabelOnHover = true,
    labelAlwaysVisible = false,
    onChange = noop,
    ...remainingProps
  } = properties

  const [sliderValue, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: 0,
    rule: (value) => typeof value === 'number',
    onChange,
  })

  const sliderLabel = typeof label === 'function' ? label(sliderValue) : label
  const [isHovering, setIsHovering] = useState(false)

  const handleChange = (newValue: number) => {
    const nextValue = getChangeValue({ value: newValue, min, max, step })
    setValue(nextValue)
  }

  const { ref: container, isActive } = useMove(({ x }) => handleChange(x))

  const isLabelVisible =
    labelAlwaysVisible || isActive || (showLabelOnHover && isHovering)

  return (
    <StyledSlider
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={useMergedRef(container, forwardedRef)}
      {...remainingProps}
    >
      <Track
        value={sliderValue}
        label={sliderLabel}
        marks={marks}
        min={min}
        max={max}
        isLabelVisible={isLabelVisible}
      />

      <input type="hidden" value={sliderValue} />
    </StyledSlider>
  )
})
