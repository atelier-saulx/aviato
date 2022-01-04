import React, { FunctionComponent, useRef } from 'react'
import { styled } from '~/theme'
import { Mark } from '.'
import { Marks } from './Marks'

const StyledTrack = styled('div', {
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
  willChange: 'transform',
})

const Thumb = styled('div', {
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

export interface TrackProps {
  value: number
  label: string
  marks: Mark[]
  min: number
  max: number
  position: number
  isActive: boolean
  isLabelVisible: boolean
}

export const Track: FunctionComponent<TrackProps> = (properties) => {
  const {
    value: sliderValue,
    label,
    marks,
    min,
    max,
    position,
    isLabelVisible,
    isActive,
    ...remainingProps
  } = properties

  const thumb = useRef<HTMLDivElement>()

  const handleThumbMouseDown = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (event.cancelable) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const hasValidLabel = label !== ''
  const labelMode = isLabelVisible && hasValidLabel ? 'visible' : 'hidden'

  return (
    <StyledTrack {...remainingProps}>
      <Bar style={{ width: `${position}%` }} />

      <Thumb
        ref={thumb}
        onMouseDown={handleThumbMouseDown}
        style={{ left: `${position}%` }}
        mode={isActive ? 'active' : 'inactive'}
      >
        <ThumbPoint />

        <Label mode={labelMode}>{label}</Label>
      </Thumb>

      <Marks marks={marks} min={min} max={max} value={sliderValue} />
    </StyledTrack>
  )
}
