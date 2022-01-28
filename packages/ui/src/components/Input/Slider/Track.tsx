import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'
import { Marks } from './Marks'
import { Mark } from './types'

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

export interface TrackProps {
  value: number
  min: number
  max: number
  position: number
  marks: Mark[]
}

export const Track: FunctionComponent<TrackProps> = (properties) => {
  const {
    value: sliderValue,
    min,
    max,
    position,
    marks,
    children,
    ...remainingProps
  } = properties

  return (
    <StyledTrack {...remainingProps}>
      <Bar style={{ width: `${position}%` }} />

      {children}

      <Marks marks={marks} min={min} max={max} value={sliderValue} />
    </StyledTrack>
  )
}

Track.displayName = 'Track'
