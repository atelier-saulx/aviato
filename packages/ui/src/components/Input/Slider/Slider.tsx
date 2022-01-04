import React, { ElementRef, useEffect, useState } from 'react'
import { ComponentProps } from '@stitches/react'
import { useUncontrolled, useMove, useMergedRef } from '@aviato/hooks'
import { noop } from '@aviato/utils'
import { styled } from '~/theme'
import { getChangeValue, getPosition } from './utils'
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
  smoothDrag?: boolean
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
    step = 0.1,
    marks = [],
    label = (inputValue) => String(inputValue),
    showLabelOnHover = true,
    labelAlwaysVisible = false,
    smoothDrag = true,
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

  const position = getPosition({ value: sliderValue, min, max })

  const { ref: container, isActive } = useMove(({ x }) => handleChange(x))
  const sliderLabel =
    typeof label === 'function' ? label(Math.round(sliderValue)) : label

  const [isHovering, setIsHovering] = useState(false)
  const [inputValue, setInputValue] = useState<number>(null)

  const handleChange = (value: number) => {
    setInputValue(value)
  }

  /**
   * Dragging clamp logic:
   * - If dragging, clamp to decimal places for smooth UX.
   * - If releasing, snap to closest step value.
   */
  useEffect(() => {
    if (inputValue === null) return

    const setWithDecimals = smoothDrag && isActive

    const targetValue = getChangeValue({
      value: inputValue,
      min,
      max,
      step: setWithDecimals ? 0.01 : step,
    })

    const roundedValue = setWithDecimals
      ? Math.round((targetValue + Number.EPSILON) * 100) / 100
      : Math.round(targetValue)

    setValue(roundedValue)
  }, [smoothDrag, isActive, inputValue, step])

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
        position={position}
        isActive={isActive}
        isLabelVisible={isLabelVisible}
      />

      <input type="hidden" value={sliderValue} />
    </StyledSlider>
  )
})
