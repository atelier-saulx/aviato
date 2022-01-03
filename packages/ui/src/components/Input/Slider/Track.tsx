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
  isLabelVisible: boolean
  marks: Mark[]
  min: number
  max: number
  position: number
}

export const Track: FunctionComponent<TrackProps> = (properties) => {
  const {
    value: sliderValue,
    label,
    isLabelVisible,
    marks,
    min,
    max,
    position,
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
      >
        <Label mode={labelMode}>{label}</Label>
      </Thumb>

      <Marks marks={marks} min={min} max={max} value={sliderValue} />
    </StyledTrack>
  )
}
