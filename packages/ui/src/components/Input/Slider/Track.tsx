import React, { FunctionComponent } from 'react'
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

export interface TrackProps {
  value: number
  marks: Mark[]
  min: number
  max: number
  position: number
}

export const Track: FunctionComponent<TrackProps> = (properties) => {
  const {
    value: sliderValue,
    marks,
    min,
    max,
    position,
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
