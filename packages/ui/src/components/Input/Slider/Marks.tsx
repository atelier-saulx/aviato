import React, { FunctionComponent } from 'react'
import { Conditional } from '~/components/Utilities/Conditional'
import { styled } from '~/theme'
import { isMarkFilled, getPosition } from './utils'
import { Mark } from './types'

const StyledMarks = styled('div', {
  '& > div:first-child > div': {
    borderTopRightRadius: '0',
    borderBottomRightRadius: '0',
  },

  '& > div:last-child > div': {
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
  },
})

const MarkContainer = styled('div', {
  position: 'absolute',
  top: '0',
})

const Mark = styled('div', {
  boxSizing: 'border-box',
  border: '2px solid $OtherInputBorderDefault',
  height: '6px',
  width: '6px',
  borderRadius: '50%',
  backgroundColor: '$PrimaryMainContrast',
  transform: 'translate(-50%, 0px)',
  zIndex: 1,

  '&::after': {
    content: `''`,
    display: 'block',
    position: 'absolute',
    width: '4px',
    height: '4px',
    borderRadius: '4px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    backgroundColor: '$PrimaryMainContrast',
    zIndex: 3,
  },

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
  marks?: Mark[]
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
      <MarkContainer
        style={{ left: `${leftOffset}%` }}
        key={`mark-${index}`}
        {...remainingProps}
      >
        <Mark type={markType} />

        <Conditional test={mark.label}>
          <Label>{mark.label}</Label>
        </Conditional>
      </MarkContainer>
    )
  })

  return <StyledMarks>{markItems}</StyledMarks>
}

Marks.displayName = 'Marks'
