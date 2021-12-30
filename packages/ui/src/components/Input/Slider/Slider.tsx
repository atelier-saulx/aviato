/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { ElementRef, useRef, useState } from 'react'
import { styled } from '~/theme'
import { noop } from '@aviato/utils'
import { useUncontrolled, useMove, useMergedRef } from '@aviato/hooks'
import { getChangeValue } from './getChangeValue'
import { ComponentProps } from '@stitches/react'
import { Marks } from './Marks'
import { Conditional } from '~/components'

const StyledSlider = styled('div', {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  cursor: 'pointer',
  width: '100%',
  height: 16,
})

const Track = styled('div', {
  position: 'absolute',
  height: '6px',
  width: '100%',
  backgroundColor: '$OtherInputBorderDefault',
  borderRadius: '4px',
  top: '50%',
  transform: 'translateY(-50%)',
})

const Bar = styled('div', {
  position: 'absolute',
  height: '6px',
  backgroundColor: '$OtherInputBorderActive',
  borderRadius: '4px',
  left: '0%',
  width: '0%',
})

const Thumb = styled('div', {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  height: '16px',
  width: '16px',
  backgroundColor: '$PrimaryMainContrast',
  border: '4px solid $OtherInputBorderActive',
  color: '$OtherInputBorderActive',
  borderRadius: '50%',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '0%',
  zIndex: 2,
})

const Label = styled('div', {
  position: 'absolute',
  top: '-40px',
  backgroundColor: '$OtherForegroundInverted',
  fontSize: '13px',
  color: '$TextInverted',
  padding: '5px',
  borderRadius: '4px',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',

  transitionProperty: 'transform, opacity',
  transitionDuration: '150ms',
  transitionTimingFunction: 'cubic-bezier(0.51, 0.3, 0, 1.21)',
  transformOrigin: 'center bottom',
  opacity: '1',
  transform: 'translateY(0px) skew(0deg, 0deg)',

  variants: {
    mode: {
      visible: {
        opacity: 1,
      },
      hidden: {
        opacity: 0,
      },
    },
  },
})

export interface SliderProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  marks?: { value: number; label?: React.ReactNode }[]
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

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: 0,
    rule: (value) => typeof value === 'number',
    onChange,
  })

  const thumb = useRef<HTMLDivElement>()
  const _label = typeof label === 'function' ? label(_value) : label
  const [isHovering, setIsHovering] = useState(false)

  const handleChange = (newValue: number) => {
    const nextValue = getChangeValue({ value: newValue, min, max, step })
    setValue(nextValue)
  }

  const { ref: container, active } = useMove(({ x }) => handleChange(x))

  const handleThumbMouseDown = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (event.cancelable) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const isLabelVisible =
    labelAlwaysVisible || active || (showLabelOnHover && isHovering)

  const labelMode = isLabelVisible ? 'visible' : 'hidden'

  return (
    <StyledSlider
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={useMergedRef(container, forwardedRef)}
      {...remainingProps}
    >
      <Track>
        <Bar style={{ width: `${_value}%` }} />

        <Thumb
          ref={thumb}
          onMouseDown={handleThumbMouseDown}
          style={{ left: `${_value}%` }}
        >
          <Label mode={labelMode}>{_label}</Label>
        </Thumb>

        <Conditional test={marks.length > 0}>
          <Marks marks={marks} min={min} max={max} value={_value} />
        </Conditional>
      </Track>

      <input type="hidden" value={_value} />
    </StyledSlider>
  )
})
