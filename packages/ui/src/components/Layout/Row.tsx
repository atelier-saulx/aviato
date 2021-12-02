import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

const RowDiv = styled('div', {
  display: 'flex',
  flexDirection: 'row',
})

export type RowProps = {}

export const Row: FunctionComponent<RowProps> = () => {
  return <RowDiv />
}
