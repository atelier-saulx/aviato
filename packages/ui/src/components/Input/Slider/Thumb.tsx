import React, { forwardRef, ElementRef, MouseEvent, TouchEvent } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'

const StyledThumb = styled('div', {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  height: '20px',
  width: '20px',
  borderRadius: '20px',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '0%',
  zIndex: 2,
  willChange: 'transform',

  variants: {
    mode: {
      inactive: {},
      active: {
        background: '$PrimaryLightSelected',
      },
    },
  },
})

const ThumbPoint = styled('div', {
  height: '16px',
  width: '16px',
  borderRadius: '16px',
  backgroundColor: '$PrimaryMainContrast',
  border: '4px solid $OtherInputBorderActive',
})

const Label = styled('div', {
  position: 'absolute',
  top: '-40px',
  backgroundColor: '$OtherForegroundInverted',
  padding: '5px',
  borderRadius: '4px',
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
  fontSize: '$xs',
  color: '$TextInverted',
  willChange: 'transform',

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

type ThumbEvent = MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>

export interface ThumbProps extends ComponentProps<typeof StyledThumb> {
  label: string
  position: number
  isLabelVisible: boolean
  isActive: boolean
  value: number
  min: number
  max: number
}

export const Thumb = forwardRef<ElementRef<typeof StyledThumb>, ThumbProps>(
  (properties, forwardedRef) => {
    const {
      label,
      position,
      isLabelVisible,
      isActive,
      value: sliderValue,
      min,
      max,
      ...remainingProps
    } = properties

    const hasValidLabel = label !== ''
    const labelMode = isLabelVisible && hasValidLabel ? 'visible' : 'hidden'

    const handleThumbDown = (event: ThumbEvent) => {
      if (event.cancelable) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    return (
      <StyledThumb
        tabIndex={0}
        role="slider"
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={sliderValue}
        style={{ left: `${position}%` }}
        mode={isActive ? 'active' : 'inactive'}
        onMouseDown={handleThumbDown}
        onTouchStart={handleThumbDown}
        onClick={(event) => event.stopPropagation()}
        ref={forwardedRef}
        {...remainingProps}
      >
        <ThumbPoint />

        <Label mode={labelMode}>{label}</Label>
      </StyledThumb>
    )
  }
)

Thumb.displayName = 'Thumb'
