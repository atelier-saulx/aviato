import React, { ElementRef, useEffect, useRef, useState } from 'react'
import { ComponentProps } from '@stitches/react'
import { useUncontrolled, useMove, useMergedRef } from '@aviato/hooks'
import { noop } from '@aviato/utils'
import { styled } from '~/theme'
import { getChangeValue, getPosition } from './utils'
import { Track } from './Track'
import { Thumb } from './Thumb'

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
  height: 24,
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

  const thumb = useRef<HTMLDivElement>()

  const [sliderValue, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: 0,
    rule: (value) => typeof value === 'number',
    onChange,
  })

  const position = getPosition({ value: sliderValue, min, max })

  const { ref: container, isActive } = useMove(({ x }) => setInputValue(x))

  const sliderLabel =
    typeof label === 'function' ? label(Math.round(sliderValue)) : label

  const [isHovering, setIsHovering] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const isInteracting = isActive || isFocused

  const [inputValue, setInputValue] = useState<number>(null)

  /**
   * Dragging clamp logic:
   * - If dragging, clamp to decimal places for smooth UX.
   * - If releasing, snap to closest step value.
   */
  useEffect(() => {
    if (inputValue === null) return

    const setWithDecimals = smoothDrag && isInteracting

    const targetValue = getChangeValue({
      value: inputValue,
      min,
      max,
      step: setWithDecimals ? 0.01 : step,
    })

    const roundedValue = Math.round((targetValue + Number.EPSILON) * 100) / 100

    setValue(roundedValue)
  }, [smoothDrag, isInteracting, inputValue, step])

  const isLabelVisible =
    labelAlwaysVisible || isInteracting || (showLabelOnHover && isHovering)

  const handleKeydownCapture = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.nativeEvent.code) {
      case 'ArrowUp':
      case 'ArrowRight': {
        event.preventDefault()
        thumb.current.focus()
        setValue(Math.min(Math.max(sliderValue + 1, min), max))
        break
      }

      case 'ArrowDown':
      case 'ArrowLeft': {
        event.preventDefault()
        thumb.current.focus()
        setValue(Math.min(Math.max(sliderValue - 1, min), max))
        break
      }
    }
  }

  return (
    <StyledSlider
      tabIndex={-1}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDownCapture={handleKeydownCapture}
      onMouseDownCapture={() => container.current?.focus()}
      ref={useMergedRef(container, forwardedRef)}
      {...remainingProps}
    >
      <Track
        value={sliderValue}
        min={min}
        max={max}
        position={position}
        marks={marks}
      >
        <Thumb
          ref={thumb}
          label={sliderLabel}
          position={position}
          isLabelVisible={isLabelVisible}
          isActive={isInteracting}
          value={sliderValue}
          min={min}
          max={max}
        />
      </Track>

      <input type="hidden" value={sliderValue} />
    </StyledSlider>
  )
})
