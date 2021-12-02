import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

const DividerDiv = styled('div', {})

export type DividerProps = {}

export const Divider: FunctionComponent<DividerProps> = () => {
  return <DividerDiv />
}
