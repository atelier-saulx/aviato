import { styled, StitchedCSS, Color } from '~/theme'
import React, { ElementRef, forwardRef } from 'react'
import { Text } from '~/components/Text'

export const StyledSelect = styled('div', {
  justifyContent: 'space-between',
  borderRadius: 4,
  alignItems: 'center',
  border: '1px solid $OtherDivider',
  backgroundColor: '$Background1dp',
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 7,
  paddingBottom: 7,
  cursor: 'pointer',
  userSelect: 'none',
  height: 38,
  overflow: 'hidden',
  display: 'flex',
  width: '100%',
  '&:hover': {
    border: '1px solid $OtherInputBorderHover',
  },
})

export const StyledLeftLabel = styled('div', {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 12,
  paddingRight: 12,
  backgroundColor: '$ActionLight',
  borderRight: '1px solid $OtherDivider',
})

export const StyledRightLabel = styled('div', {
  flexGrow: 1,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 12,
  paddingRight: 12,
  borderRight: '1px solid $OtherDivider',
})

export const StyledSelectLabel = styled('div', {
  justifyContent: 'space-between',
  borderRadius: 4,
  border: '1px solid $OtherDivider',
  backgroundColor: '$Background1dp',
  cursor: 'pointer',
  userSelect: 'none',
  height: 38,
  overflow: 'hidden',
  display: 'flex',
  width: '100%',
  '&:hover': {
    border: '1px solid $OtherInputBorderHover',
  },
})

export type SelectLabelProps = {
  onClick?: () => void
  css?: StitchedCSS
  color?: Color
  label: string
  children?: React.ReactNode
}

export const SelectLabel = forwardRef<
  ElementRef<typeof StyledSelectLabel>,
  SelectLabelProps
>(({ children, onClick, css, color = '$TextPrimary', label }, ref) => {
  return (
    <StyledSelectLabel ref={ref} onClick={onClick} css={{ color, ...css }}>
      <StyledLeftLabel>
        <Text>{label}</Text>
      </StyledLeftLabel>
      <StyledRightLabel>{children}</StyledRightLabel>
    </StyledSelectLabel>
  )
})
