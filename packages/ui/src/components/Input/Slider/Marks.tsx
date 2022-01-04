import React, { FunctionComponent } from 'react'
import { Conditional } from '~/components'
import { styled } from '~/theme'
import { isMarkFilled, getPosition } from './utils'

const StyledMarks = styled('div', {})

const MarkWrapper = styled('div', {
  position: 'absolute',
  top: '0',
})

const Mark = styled('div', {
  boxSizing: 'border-box',
  border: '2px solid $OtherInputBorderDefault',
  height: '8px',
  width: '8px',
  borderRadius: '50%',
  backgroundColor: '$PrimaryMainContrast',
  transform: 'translate(-4px, -1px)',
  zIndex: 1,

  variants: {
    type: {
      filled: {
        borderColor: '$OtherInputBorderActive',
      },
      empty: {
        borderColor: '$OtherInputBorderDefault',
      },
    },
  },
})

const Label = styled('div', {
  transform: 'translate(-50%, 0)',
  marginTop: '7px',
  color: '$TextDisabled',
  fontSize: '$xs',
})

export interface MarksProps {
  value: number
  marks?: { value: number; label?: React.ReactNode }[]
  min?: number
  max?: number
  offset?: number
}

export const Marks: FunctionComponent<MarksProps> = (properties) => {
  const {
    marks,
    min,
    max,
    value: sliderValue,
    offset = 0,
    ...remainingProps
  } = properties

  const markItems = marks.map((mark, index) => {
    const isFilled = isMarkFilled({ mark, value: sliderValue, offset })
    const markType = isFilled ? 'filled' : 'empty'
    const leftOffset = getPosition({ value: mark.value, min, max })

    return (
      <MarkWrapper
        style={{ left: `${leftOffset}%` }}
        key={`mark-${index}`}
        {...remainingProps}
      >
        <Mark type={markType} />

        <Conditional test={mark.label}>
          <Label>{mark.label}</Label>
        </Conditional>
      </MarkWrapper>
    )
  })

  return <StyledMarks>{markItems}</StyledMarks>
}
