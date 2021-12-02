import React from 'react'
import { styled } from '~/theme'

const StyledTempAvatar = styled('div', {
  alignItems: 'center',
  backgroundColor: '$PrimaryMain',
  borderRadius: '300px',
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '9px',
  fontWeight: '600',
  lineHeight: '24px',
  marginRight: '8px',
  height: '24px',
  width: '24px',
  justifyContent: 'center',
})

export default function TempAvatar() {
  return <StyledTempAvatar>M</StyledTempAvatar>
}
