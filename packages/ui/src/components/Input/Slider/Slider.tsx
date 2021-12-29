/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { ElementRef, FunctionComponent, useRef, useState } from 'react'
import { DefaultProps, styled } from '~/theme'
import { noop } from '@aviato/utils'
import { useUncontrolled, useMove, useMergedRef } from '@aviato/hooks'
import { getChangeValue } from './getChangeValue'
import { ComponentProps } from '@stitches/react'

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
  cursor: 'pointer',
  height: '16px',
  width: '16px',
  backgroundColor: '$PrimaryMainContrast',
  border: '4px solid $OtherInputBorderActive',
  color: '$OtherInputBorderActive',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  left: '0%',
})

export interface SliderProps extends DefaultProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
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
    onChange = noop,
    ...remainingProps
  } = properties

  const [hovered, setHovered] = useState(false)
  const thumb = useRef<HTMLDivElement>()

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: 0,
    rule: (value) => typeof value === 'number',
    onChange,
  })

  const handleChange = (val: number) => {
    const nextValue = getChangeValue({ value: val, min, max, step })
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

  return (
    <StyledSlider
      ref={useMergedRef(container, forwardedRef)}
      {...remainingProps}
    >
      <Track>
        <Bar style={{ width: `${_value}%` }} />

        <Thumb
          ref={thumb}
          style={{ left: `${_value}%` }}
          onMouseDown={handleThumbMouseDown}
        />
      </Track>

      <input type="hidden" value={_value} />
    </StyledSlider>
  )
})
