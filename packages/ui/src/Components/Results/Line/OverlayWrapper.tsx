import React, { useState, useRef, useContext } from 'react'
import { useColor } from '../../../theme'
import useHover from '../../../hooks/events/useHover'
import useThrottledCallback from '../../../hooks/useThrottledCallback'
import { InnerShared } from '../../Overlay/Shared'
import { SubText } from '../../Text/SubText'
import { Text } from '../../Text'
import { GraphContext } from '.'

const OverlayNested = ({
  isHover,
  x,
  xInfo,
  p,
  selected,
  legend,
  isStacked,
  valueFormat,
}) => {
  let extraInfo = null

  if (isStacked) {
    const [selectedKey, setSelected] = useState<string>('')
    const ctx = useContext(GraphContext)
    ctx.hover = setSelected

    extraInfo = (
      <div
        style={{
          marginTop: 10,
        }}
      >
        {selectedKey ? (
          <div
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: '1px solid ' + useColor({ color: 'divider' }),
            }}
          >
            <Text weight="semibold">
              {legend ? legend[selectedKey] : selectedKey}
            </Text>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text>
                {{
                  value: selected.segments[selectedKey],
                  format: valueFormat || 'number-short',
                }}
              </Text>
              <Text color={{ color: 'primary' }}>
                {Math.round(
                  (selected.segments[selectedKey] / selected.y) * 100
                )}
                %
              </Text>
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div
      style={{
        opacity: x && isHover ? 1 : 0,
        transition: 'opacity 0.5s',
        transform: x
          ? `translate3d(${p.x}px,0px,0px)`
          : 'translate3d(0px,0px,0px)',
        width: '1px',
        height: '100%',
        backgroundColor: useColor({ color: 'foreground' }),
      }}
    >
      <div
        style={{
          position: 'relative',
          transform: `translate3d(${-7.5}px, ${p.y - 7.5}px, 0px)`,
        }}
      >
        <div
          style={{
            borderRadius: '50%',
            width: 15,
            border: '2px solid ' + useColor({ color: 'foreground' }),
            backgroundColor: useColor({ color: 'background' }),
            height: 15,
          }}
        />

        <InnerShared
          style={{
            position: 'absolute',
            left: isFlippedX ? -110 : 24,
            top: -30,
            minWidth: isStacked && extraInfo ? 175 : 100,
            transform:
              isFlippedX && extraInfo ? 'translateX(-44%)' : 'translateX(0%)',
          }}
          width="auto"
        >
          <div
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <SubText singleLine>{xInfo}</SubText>
            <Text weight="semibold">
              {{ value: selected.y, format: valueFormat || 'number-short' }}
            </Text>
            {extraInfo}
          </div>
        </InnerShared>
      </div>
    </div>
  )
}

let isFlippedX = false

const getY = (
  x,
  width,
  r,
  isHover,
  data,
  format,
  isStacked,
  legend,
  valueFormat
) => {
  let u = x / width
  const s = Math.floor(u * data.length)

  if (u < 0) {
    return null
  }

  const selected = data[s]

  let curve = r.current.curve
  if (!curve) {
    for (let i = 0; i < r.current.children.length; i++) {
      const c = r.current.children[i]
      if (c.getAttribute('data') === 'line') {
        curve = c
        r.current.curve = c
        break
      }
    }
  }

  if (curve && selected) {
    const totalLength = curve.getTotalLength()

    if (!totalLength) {
      return null
    }

    let tries = 4
    let p

    while (tries) {
      p = curve.getPointAtLength(u * totalLength)
      if (p.x < x) {
        u = u * (x / p.x)
      } else if (p.x > x) {
        u = u * (x / p.x)
      }
      tries--
    }

    let xInfo

    if (format === 'date' || format === 'date-time-human') {
      xInfo = [
        { value: selected.x, format: 'time-precise' },
        ' - ',
        { value: selected.x, format: 'date' },
      ]
    } else {
      xInfo = 'x: ' + selected.x
    }

    return (
      <OverlayNested
        legend={legend}
        isStacked={isStacked}
        isHover={isHover}
        x={x}
        p={p}
        xInfo={xInfo}
        selected={selected}
        valueFormat={valueFormat}
      />
    )
  }

  return null
}

const Overlay = ({
  isHover,
  x,
  width,
  data,
  r,
  format,
  isStacked,
  legend,
  valueFormat,
}) => {
  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {x
        ? getY(
            x,
            width,
            r,
            isHover,
            data,
            format,
            isStacked,
            legend,
            valueFormat
          )
        : null}
    </div>
  )
}

export default ({
  width,
  height,
  labelHeight = 0,
  labels,
  children,
  data,
  isStacked,
  legend,
  valueFormat,
  format,
}) => {
  // need format
  const [x, setCoord] = useState()

  const [hover, isHover] = useHover()

  const ref = useRef<any>()
  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
      }}
      // @ts-ignore
      onMouseMove={useThrottledCallback((event) => {
        const { x } = event.currentTarget.getBoundingClientRect()

        let mousePosX = event.clientX

        if (window.innerWidth - mousePosX < 200) {
          isFlippedX = true
        } else {
          isFlippedX = false
        }

        // @ts-ignore
        setCoord(event.pageX - x)
      }, [])}
      {...hover}
    >
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
      >
        {labels.map((v, i) => {
          const y = (i + 1) * labelHeight - 9
          return (
            <path
              key={i}
              d={`M0,${y}L${width},${y}`}
              stroke={useColor({
                color: 'divider',
              })}
            />
          )
        })}
        {children}
      </svg>
      <Overlay
        valueFormat={valueFormat}
        isStacked={isStacked}
        legend={legend}
        format={format}
        isHover={isHover}
        x={x}
        width={width}
        data={data}
        r={ref}
      />
    </div>
  )
}
