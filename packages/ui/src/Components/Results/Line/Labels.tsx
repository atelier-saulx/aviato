import React from 'react'
import { SubText } from '../../Text/SubText'

export default ({ labels, labelHeight, valueFormat }) => {
  // let prevValue
  return labels.map((v, i) => {
    const value = v.label
    // if (valueFormat === 'number-short' && ~~value === ~~prevValue) {
    //   return <div style={{ height: labelHeight }} />
    // }
    // prevValue = value
    return (
      <div
        key={i}
        style={{
          height: labelHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <SubText singleLine>{{ value, format: valueFormat }}</SubText>
        </div>
      </div>
    )
  })
}
