import React from 'react'
import { SubText } from '../../..'

export default ({ data }) => {
  const values = [].concat(data)
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
      {values.map((value, index) => {
        return (
          <SubText
            key={index}
            singleLine
            style={{
              marginRight: 5,
            }}
            color={{ color: 'foreground', tone: 2 }}
          >
            {value}
          </SubText>
        )
      })}
    </div>
  )
}
