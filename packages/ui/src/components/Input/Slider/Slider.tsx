import React, {
  ElementRef,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from 'react'
import { ComponentProps } from '@stitches/react'
import { useUncontrolled, useMove, useMergedRef } from '@aviato/hooks'
import { noop } from '@aviato/utils'
import { styled } from '~/theme'
import { getChangeValue, getPosition } from './utils'
import { Track } from './Track'
import { Thumb } from './Thumb'

type CaptureEvent = KeyboardEvent<HTMLDivElement>
type Direction = 'left' | 'right'

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
  const [inputValue, setInputValue] = useState<number>(position / 100)
  const { ref: container, isActive } = useMove(({ x }) => setInputValue(x))

  const sliderLabel =
    typeof label === 'function' ? label(Math.round(sliderValue)) : label

  const [isHovering, setIsHovering] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const isInteracting = isActive || isFocused

  /**
   * Dragging clamp logic:
   * - If dragging, clamp to decimal places for smooth UX.
   * - If releasing, snap to closest step value.
   */
  useEffect(() => {
    const setWithDecimals = smoothDrag && isActive

    const targetValue = getChangeValue({
      value: inputValue,
      min,
      max,
      step: setWithDecimals ? 0.01 : step,
    })

    const roundedValue = Math.round((targetValue + Number.EPSILON) * 100) / 100

    setValue(roundedValue)
  }, [smoothDrag, isActive, inputValue, step])

  const isLabelVisible =
    labelAlwaysVisible || isInteracting || (showLabelOnHover && isHovering)

  const onKeyDown = ({
    direction,
    event,
  }: {
    direction: Direction
    event: CaptureEvent
  }) => {
    event.preventDefault()
    thumb.current.focus()

    const increment = Math.abs(step) > 1 ? step : 1
    const delta = direction === 'right' ? increment : -increment

    const newValue = Math.min(Math.max(sliderValue + delta, min), max)
    const newPosition = getPosition({ value: newValue, min, max })

    setInputValue(newPosition / 100)
  }

  const handleKeydownCapture = (event: KeyboardEvent<HTMLDivElement>) => {
    const { code } = event.nativeEvent

    const keyMap: { [key: string]: Direction } = {
      ArrowDown: 'left',
      ArrowLeft: 'left',
      ArrowUp: 'right',
      ArrowRight: 'right',
    }

    const direction = keyMap[code]
    if (direction) {
      onKeyDown({ direction, event })
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
