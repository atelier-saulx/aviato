import React, { FunctionComponent, useRef, useState, useEffect } from 'react'
import { TextValue, TextFormat } from '../../../textParser'
import { Text } from '../../Text'
import { SubText } from '../../Text/SubText'
import { Title } from '../../Text/Title'
import { useColor, Color } from '../../../theme'
import { Button } from '../../Button'
import AutoSizer from 'react-virtualized-auto-sizer'
import useTooltip from '../../../hooks/overlay/useTooltip'
import { Label } from '../../Text/Label'

// make a slider component

export type ScatterProps = {
  data: {
    time: number
    points: {
      x: number
      y: number
      label: string
      color: Color
      info?: { [key: string]: string | number }
    }[]
  }[]
  xLabel?: TextValue
  yLabel?: TextValue
  info?: {
    [key: string]: { format: TextFormat; label: TextValue }
  }
  xLabelFormat?: TextFormat
  yLabelFormat?: TextFormat
  header?: TextValue
}

const Slider: FunctionComponent<{
  data: {
    time: number
    points: { x: number; y: number; label: string; color: Color }[]
  }[]
  setDragging: (x: boolean) => void
  isDragging: boolean
  setIndex: (x: number) => void
  index: number
  width: number
}> = ({ width, data, isDragging, setDragging, index, setIndex }) => {
  const ref = useRef<{ x: number; index: number }>()

  useEffect(() => {
    let moveHandler
    let up

    if (isDragging) {
      up = () => {
        setDragging(false)
      }

      moveHandler = (event) => {
        if (isDragging) {
          const xx =
            event.pageX -
            ref.current.x +
            ref.current.index * ((width - 120) / data.length)

          const index = Math.min(
            Math.max(0, Math.floor((xx / (width - 120)) * data.length)),
            data.length - 1
          )

          setIndex(index)
        }
      }

      document.addEventListener('mouseup', up)
      document.addEventListener('mousemove', moveHandler)
    }
    return () => {
      document.removeEventListener('mouseup', up)
      document.removeEventListener('mousemove', moveHandler)
    }
  }, [isDragging, ref])

  return (
    <div
      style={{
        width,
        height: 50,
        paddingLeft: 8,
        paddingTop: 20,
      }}
    >
      <div
        style={{
          marginLeft: 90,
          width: width - 100,
          height: 20,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            marginTop: 8,
            position: 'absolute',
            height: 4,
            borderRadius: 2,
            backgroundColor: useColor({ color: 'divider' }),
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            transform: `translate3d(${
              index * ((width - 120) / data.length)
            }px,0px,0px)`,
            transitionTimingFunction: 'linear',
            transition: isDragging ? null : 'transform 1s',
            top: 0,
            borderRadius: '50%',
            width: 20,
            height: 20,
            background: useColor({ color: 'primary' }),
          }}
          onMouseDown={(event) => {
            ref.current = { x: event.pageX, index }
            setDragging(true)
          }}
        />
      </div>
    </div>
  )
}

const ScatterInner: FunctionComponent<
  ScatterProps & { width: number; height: number }
> = ({ data, width, height, header, xLabelFormat, yLabelFormat, info }) => {
  const ref = useRef<number>()

  let [index, setIndex] = useState(0)
  const [isDragging, setDragging] = useState(false)

  if (!data[index]) {
    index = data.length - 1
  }

  ref.current = index

  const [isPlaying, setPlay] = useState(true)

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setIndex(ref.current + 1)
      }, 1e3)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isPlaying])

  let minY
  let maxY
  let minX
  let maxX

  const points = data[index].points

  for (let i = 0; i < points.length; i++) {
    const d = points[i]

    if (d.y > maxY || maxY === undefined) {
      maxY = d.y
    }

    if (d.y < minY || minY === undefined) {
      minY = d.y
    }

    if (d.x > maxX || maxX === undefined) {
      maxX = d.x
    }

    if (d.x < minX || minX === undefined) {
      minX = d.x
    }
  }

  const graphHeight = height - 50 - 50 - 24 - 50
  const graphWidth = width - 100 - 50

  const pxRatios = [
    1 / ((maxX - minX) / graphWidth),
    1 / ((maxY - minY) / graphHeight),
  ]

  const xLabelsP = []
  const labelW = 150
  const labelamount = (graphWidth + 50) / labelW
  const spread = (maxX - minX) / labelamount

  for (let i = 0; i < labelamount; i++) {
    // xLabel format
    // yLabel format
    xLabelsP.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          transform: `translate3d(${i * labelW}px,0px,0px)`,
        }}
      >
        <SubText>
          {{ value: spread * i + minX, format: xLabelFormat || 'number-short' }}
        </SubText>
      </div>
    )
  }
  const xLabels = (
    <div
      style={{
        marginLeft: 100 + 25 + 16,
        marginTop: 8,
        width: graphWidth,
        position: 'relative',
      }}
    >
      {xLabelsP}
    </div>
  )

  const yLabelsP = []
  const labelH = 50
  const labelYamount = (graphHeight + 50) / labelH
  const spreadY = (maxY - minY) / labelYamount

  for (let i = 0; i < labelYamount; i++) {
    // xLabel format
    // yLabel format
    yLabelsP.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          transform: `translate3d(0px,${i * labelH}px,0px)`,
          display: 'flex',
          width: 84,
          justifyContent: 'flex-end',
        }}
      >
        <SubText>
          {{
            value: maxY - spreadY * i,
            format: yLabelFormat || 'number-short',
          }}
        </SubText>
      </div>
    )
  }
  const yLabels = (
    <div
      style={{
        marginLeft: 0,
        marginTop: 4,
        position: 'absolute',
      }}
    >
      {yLabelsP}
    </div>
  )

  // just make it header

  return (
    <div
      style={{
        width,
        height,
        // border: '1px solid blue',
      }}
    >
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Title style={{}}>{header || ''}</Title>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Text>
              {{ value: data[index].time, format: 'date-time-human' }}
            </Text>
            <Button
              style={{
                marginLeft: 16,
              }}
              color={{ color: isPlaying ? 'primary' : 'divider' }}
              icon={'Expand'}
              onClick={() => {
                setPlay(!isPlaying)
              }}
            />
          </div>
        </div>
        <Slider
          data={data}
          width={width}
          isDragging={isDragging}
          setDragging={setDragging}
          index={index}
          setIndex={setIndex}
        />
      </div>
      {yLabels}
      <div
        style={{
          marginLeft: 100,
          padding: 25,
          width: graphWidth + 50,
          height: graphHeight + 50,
          border: '1px solid ' + useColor({ color: 'divider' }),
        }}
      >
        <div
          style={{
            position: 'relative',
            width: graphWidth,
            height: graphHeight,
            // margin: 100,
          }}
        >
          {points.map((v, i) => {
            const color = v.color

            const infoContent = []

            let tooltip = {}

            if (info) {
              for (const key in info) {
                infoContent.push(
                  <Label key={key} label={info[key].label}>
                    <Text>
                      {{
                        format: info[key].format,
                        value: v.info ? v.info[key] : 0,
                      }}
                    </Text>
                  </Label>
                )
              }
              tooltip = useTooltip(
                <div
                  style={{
                    padding: 24,
                  }}
                >
                  {infoContent}
                </div>,
                { width: 200 }
              )
            }

            return (
              <div
                key={v.label}
                style={{
                  position: 'absolute',
                  transitionTimingFunction: 'linear',
                  transition: isDragging
                    ? 'transform 0.1s, background 0.1s'
                    : 'transform 1s, background 0.15s',
                  transform: `translate3d(${
                    (v.x - minX) * pxRatios[0] - 20
                  }px,${(maxY - v.y) * pxRatios[1] - 20}px,0px)`,
                  top: 0,
                  left: 0,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  background: useColor(color),
                  boxShadow:
                    '0px 0px 10px ' +
                    useColor({ color: 'foreground', opacity: 0.05 }),
                }}
                {...tooltip}
              >
                <Text
                  noSelect
                  color={{
                    color:
                      color.color !== 'background'
                        ? 'background'
                        : 'foreground',
                  }}
                  weight="semibold"
                >
                  {v.label}
                </Text>
              </div>
            )
          })}
        </div>
      </div>
      {xLabels}
    </div>
  )
}

const Scatter: FunctionComponent<ScatterProps> = (props) => {
  return (
    <AutoSizer>
      {({ height, width }) => {
        return <ScatterInner width={width} height={height} {...props} />
      }}
    </AutoSizer>
  )
}

export { Scatter }
