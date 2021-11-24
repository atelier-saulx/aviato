import React from 'react'
import { SubText } from '../../Text/SubText'
import { useColor } from '../../../theme'

const XAxis = ({ maxX, minX, format, width }) => {
  const d = maxX - minX
  const amount = Math.floor(width / 150)
  const rW = width / amount
  const c = []
  // let prevValue
  for (let i = 0; i < amount; i++) {
    const value = (d * (i + 1)) / amount + minX
    // if (Object.is(value, prevValue)) {
    //   continue
    // }
    // prevValue = value

    if (format === 'date-time-human') {
      c.push({ value, format: 'date-time-human' })
    } else if (format === 'date') {
      // (d * i) / amount
      c.push([
        { value, format: 'time-precise' },
        ' - ',
        { value, format: 'date' },
      ])
    } else {
      c.push({ value, format: 'number-short' })
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      {c.map((v, i) => {
        return (
          <div
            key={i}
            style={{
              minWidth: rW,
              display: 'flex',
              justifyContent: 'flex-start',
              paddingTop: 15,
            }}
          >
            <SubText>{v}</SubText>
          </div>
        )
      })}
    </div>
  )
}

export default XAxis
