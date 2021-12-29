import React, { FunctionComponent } from 'react'
import { Conditional } from '~/components'
import { styled } from '~/theme'
import { getPosition } from './getPosition'
import { isMarkFilled } from './isMarkFilled'

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
  color: '$TextDisabled',
  marginTop: '7px',
  fontSize: 13,
})

export interface MarksProps {
  value: number
  marks?: { value: number; label?: React.ReactNode }[]
  min?: number
  max?: number
  offset?: number
}

export const Marks: FunctionComponent<MarksProps> = (properties) => {
  const { marks, min, max, value: sliderValue, offset = 0 } = properties

  const markItems = marks.map((mark, index) => {
    const markType = isMarkFilled({ mark, value: sliderValue, offset })
      ? 'filled'
      : 'empty'

    return (
      <MarkWrapper
        style={{ left: `${getPosition({ value: mark.value, min, max })}%` }}
        key={`mark-${index}`}
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
