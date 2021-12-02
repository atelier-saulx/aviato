import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

const ColumnDiv = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export type ColumnProps = {}

export const Column: FunctionComponent<ColumnProps> = () => {
  return <ColumnDiv />
}
