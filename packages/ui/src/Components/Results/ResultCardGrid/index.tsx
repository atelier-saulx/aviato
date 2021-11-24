import React, { FunctionComponent, CSSProperties } from 'react'
import { TextValue } from '../../../textParser'
import { Color } from '../../../theme'

import { ResultCard, Filler } from './Card'

export type ResultCardGridItem = {
  value: TextValue
  label: TextValue
  // color
  // icon
}

export type ResultCardGridProps = {
  style?: CSSProperties
  items: ResultCardGridItem[]
}

export const ResultCardGrid: FunctionComponent<ResultCardGridProps> = ({
  style,
  items,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginRight: -16,
        ...style,
      }}
    >
      {items.map((v, i) => {
        return <ResultCard key={i} item={v} />
      })}
      <Filler />
      <Filler />
      <Filler />
      <Filler />
    </div>
  )
}
