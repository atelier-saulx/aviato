import React, { useRef, useEffect, useState } from 'react'
import { Title } from '../../Text/Title'
import genPath from './genPath'
import genLabels from './genLabels'
import XAxis from './XAxis'
import OverlayWrapper from './OverlayWrapper'
import Labels from './Labels'

const StackedGraph = ({
  width,
  height,
  data,
  format,
  label,
  spread,
  legend,
  valueFormat,
}) => {
  const ref = useRef<any>()
  let maxY, minY
  let maxX, minX

  const [xWidth, updateW] = useState(0)

  const dataStacked = []

  for (const key in data) {
    const s = data[key]

    for (let i = 0; i < s.length; i++) {
      if (dataStacked[i]) {
        dataStacked[i].y += s[i].y
        dataStacked[i].segments[key] = s[i].y
      } else {
        dataStacked.push({
          x: s[i].x,
          y: s[i].y,
          segments: {
            [key]: s[i].y,
          },
        })
      }
    }
  }

  for (let i = 0; i < dataStacked.length; i++) {
    const { x, y, segments } = dataStacked[i]
    if (maxY === undefined || y > maxY) {
      maxY = y
    }
    if (minY === undefined || y < minY) {
      minY = y
    }
    if (maxX === undefined || x > maxX) {
      maxX = x
    }
    if (minX === undefined || x < minX) {
      minX = x
    }

    for (const key in segments) {
      const y = segments[key]

      if (maxY === undefined || y > maxY) {
        maxY = y
      }
      if (minY === undefined || y < minY) {
        minY = y
      }
    }
  }

  const svgWidth = width - xWidth

  const svgHeight = height - 50 - (label ? 36 : 0)

  const ySpread = maxY - minY

  useEffect(() => {
    updateW(ref.current.getBoundingClientRect().width)
  }, [ySpread])

  const { labels, labelHeight } = genLabels(svgHeight, ySpread, maxY)

  const [paths] =
    dataStacked.length < 2
      ? []
      : xWidth
      ? genPath(
          svgWidth,
          svgHeight,
          dataStacked,
          minY,
          ySpread,
          spread,
          true,
          legend
        )
      : [null, []]

  return (
    <div
      style={{
        width,
        height,
      }}
    >
      {label ? (
        <Title
          size="small"
          style={{
            marginBottom: 16,
          }}
        >
          {label}
        </Title>
      ) : null}
      <div
        style={{
          width,
          height: svgHeight,
          display: 'flex',
        }}
      >
        <div
          ref={ref}
          style={{
            paddingRight: 24,
          }}
        >
          <Labels
            valueFormat={valueFormat}
            labels={labels}
            labelHeight={labelHeight}
          />
        </div>
        <OverlayWrapper
          valueFormat={valueFormat}
          width={svgWidth}
          height={svgHeight}
          labelHeight={labelHeight}
          labels={labels}
          data={dataStacked}
          isStacked
          legend={legend}
          format={format}
        >
          {paths}
        </OverlayWrapper>
      </div>
      <div
        style={{
          paddingLeft: xWidth + 'px',
        }}
      >
        <XAxis maxX={maxX} minX={minX} format={format} width={svgWidth} />
      </div>
    </div>
  )
}

export default StackedGraph
