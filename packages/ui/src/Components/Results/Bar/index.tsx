import React, { FunctionComponent } from 'react'
import { TextFormat, TextValue } from '../../../textParser'
import { Text } from '../../Text'
import { useColor } from '../../../theme'
import useHover from '../../../hooks/events/useHover'
import useMultipleEvents from '../../../hooks/events/useMultipleEvents'
import useTooltip from '../../../hooks/overlay/useTooltip'

export type BarGraphProps = {
  data: { value: number | { [key: string]: number }; label: TextValue }[]
  label?: TextValue
  legend?: { [key: string]: TextValue }
  value?: TextValue
  format?: TextFormat
}

const BarSegment = ({
  total,
  len,
  value,
  index,
  legend,
  label,
  left,
  format,
}) => {
  const [hover, isHover] = useHover()
  const barSegment = (
    <div
      {...useMultipleEvents(
        useTooltip(
          <div
            style={{
              paddingTop: 8,
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 8,
            }}
          >
            <Text weight="semibold">{legend ? legend[label] : label}</Text>
            <div
              style={{
                display: 'flex',
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid ' + useColor({ color: 'divider' }),
                justifyContent: 'space-between',
              }}
            >
              <Text>{{ value, format }}</Text>
              <Text color={{ color: 'primary' }}>
                {`${(((value || 0) / total) * 100).toFixed()}%`}
              </Text>
            </div>
          </div>,
          { width: 220 }
        ),
        hover
      )}
      style={{
        backgroundColor: isHover
          ? useColor({ color: 'secondary' })
          : useColor({
              color: 'primary',
              tone: 2,
              opacity: (index / len) * 0.3 + 0.7,
            }),
        width: `${((value || 0) / total) * 100}%`,
        top: 0,
        left: `${((left || 0) / total) * 100}%`,
        position: 'absolute',
        bottom: 0,
      }}
    />
  )
  return barSegment
}

const BarGraph: FunctionComponent<BarGraphProps> = ({
  data,
  label,
  value,
  legend,
  format = 'number-short',
}) => {
  let t = 0
  let high
  for (let i = 0; i < data.length; i++) {
    let value = 0

    if (typeof data[i].value === 'object') {
      // @ts-ignore
      for (const k in data[i].value) {
        value += data[i].value[k] || 0
      }
    } else {
      // @ts-ignore
      value = data[i].value || 0
    }
    t += value
    if (high === undefined || value > high) {
      high = value
    }
  }

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      {label || value ? (
        <div
          style={{
            display: 'flex',
            paddingBottom: 12,
            marginBottom: 20,
            justifyContent: 'space-between',
            borderBottom: '1px solid ' + useColor({ color: 'divider' }),
          }}
        >
          <Text weight="medium">{label}</Text>
          <Text weight="medium">{value}</Text>
        </div>
      ) : null}
      <div
        style={{
          width: '100%',
          display: 'flex',
        }}
      >
        <div
          style={{
            paddingRight: 24,
          }}
        >
          {data.map((v, i) => {
            return (
              <div
                key={i}
                style={{
                  marginTop: 8,
                  height: 32,
                  alignContent: 'center',
                  display: 'flex',
                  paddingTop: 2,
                  marginBottom: 8,
                }}
              >
                <Text>{v.label}</Text>
              </div>
            )
          })}
        </div>
        <div
          style={{
            flexGrow: 2,
          }}
        >
          {data.map((v, i) => {
            let value: number = 0
            let segments = null

            if (typeof v.value === 'object') {
              segments = []
              let len = 0
              let largest
              for (const k in v.value) {
                len++
                value += v.value[k]
                if (largest === undefined || largest.value < v.value[k]) {
                  largest = {
                    value: v.value[k],
                    key: k,
                  }
                }
              }
              let i = 0
              let add = 0
              for (const k in v.value) {
                if (k !== largest.key) {
                  segments.push(
                    <BarSegment
                      key={k}
                      label={k}
                      legend={legend}
                      left={add}
                      total={value}
                      index={i}
                      len={len}
                      value={v.value[k]}
                      format={format}
                    />
                  )
                  add += v.value[k]
                }
                i++
              }
              if (largest) {
                segments.push(
                  <BarSegment
                    key={largest.key}
                    label={largest.key}
                    legend={legend}
                    left={add}
                    total={value}
                    index={i}
                    len={len}
                    value={largest.value}
                    format={format}
                  />
                )
              }
            } else {
              value = v.value
            }

            return (
              <div
                key={i}
                style={{
                  minWidth: 75,
                  marginBottom: 8,
                  display: 'flex',
                  position: 'relative',
                  // justifyContent: 'flex-end',
                  marginTop: 8,
                  overflow: 'hidden',
                  borderRadius: 4,
                  transition: 'width 0.5s',
                  width: ((value || 0) / high) * 100 + '%',
                  height: 32,
                  backgroundColor: segments
                    ? null
                    : useColor({
                        color: 'primary',
                        tone: 2,
                      }),
                }}
              >
                {segments}
                <Text
                  singleLine
                  noSelect
                  weight="semibold"
                  color={{ color: 'background' }}
                  style={{
                    zIndex: 1,
                    marginTop: 4,
                    marginBottom: 4,
                    marginLeft: 8,
                  }}
                >
                  {[
                    { format, value },

                    ` (${(((value || 0) / t) * 100).toFixed(1)}%)`,
                  ]}
                </Text>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { BarGraph }
