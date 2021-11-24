import React from 'react'
import { useColor } from '../../../theme'
import HoverPath from './HoverPath'

const genPathCurve = (points, r) => {
  let d = `M${points[0][0]},${points[0][1]}`
  for (let i = 1; i < points.length - 1; i++) {
    const previous = i - 1
    const next = i + 1
    const c = {
      x: points[i][0],
      y: points[i][1],
    }
    const a1 = Math.atan2(points[previous][1] - c.y, points[previous][0] - c.x)
    const a2 = Math.atan2(points[next][1] - c.y, points[next][0] - c.x)
    const x1 = c.x + r * Math.cos(a1)
    const y1 = c.y + r * Math.sin(a1)
    const x2 = c.x + r * Math.cos(a2)
    const y2 = c.y + r * Math.sin(a2)
    d += 'L' + x1 + ',' + y1 + ' Q' + c.x + ',' + c.y + ' ' + x2 + ',' + y2
  }
  return (d += `L${points[points.length - 1][0]},${
    points[points.length - 1][1]
  }`)
}

const genPath = (
  width,
  height,
  data,
  minY,
  ySpread,
  spread,
  segments,
  legend?: any
) => {
  let stepSize = width / (data.length - 1)
  const pxValue = ySpread / height

  let paths
  const points = []
  // also different for segments
  if (stepSize < 10) {
    const dX = 10 / stepSize
    const condenseAmount = Math.round(dX)
    stepSize = width / (Math.floor(data.length / condenseAmount) - 1)
    const mins = []
    const maxs = []
    const pointArr = {}
    let amount = 0
    let setTotal = false
    for (let i = 0; i < data.length - 1; i += condenseAmount) {
      let v = 0
      let min
      let max
      let c = 0

      const segs = {}

      for (let j = 0; j < condenseAmount; j++) {
        if (data[i + j]) {
          c++
          const y = data[i + j].y
          if (min === undefined || y < min) {
            min = y
          }
          if (max === undefined || y > max) {
            max = y
          }

          // segments

          // need to add points for all segments...
          if (segments) {
            if (data[i + j].segments) {
              for (const key in data[i + j].segments) {
                const y = data[i + j].segments[key]
                if (segs[key] === undefined) {
                  segs[key] = 0
                }
                segs[key] += y

                if (y < min) {
                  min = y
                }
                if (y > max) {
                  max = y
                }
              }
            }
          }

          v += y
        }
      }

      let prevY = 0
      for (const key in segs) {
        if (!pointArr[key]) {
          pointArr[key] = []
        }
        if (!setTotal) {
          amount++
        }
        prevY += segs[key] / c
        pointArr[key].push([
          stepSize * (i / condenseAmount),
          (ySpread - (prevY - minY)) / pxValue,
        ])
      }
      setTotal = true

      const newY = v / c
      mins.push([
        stepSize * (i / condenseAmount),
        (ySpread - (min - minY)) / pxValue,
      ])
      maxs.push([
        stepSize * (i / condenseAmount),
        (ySpread - (max - minY)) / pxValue,
      ])
      points.push([
        stepSize * (i / condenseAmount),
        (ySpread - (newY - minY)) / pxValue,
      ])
    }
    maxs.reverse()

    if (segments) {
      const children = []
      let i = 0
      let prev
      for (const key in pointArr) {
        const p = genPathCurve(
          prev ? [...pointArr[key]].reverse() : pointArr[key],
          stepSize / 2
        )
        const d = prev
          ? genPathCurve(prev, stepSize / 2) +
            `L${maxs[0][0]},${pointArr[key][pointArr[key].length - 1][1]}` +
            p +
            `L${mins[0][0]},${prev[0][1]}`
          : p + `L${maxs[0][0]},${height},L${mins[0][0]},${height}`
        i++
        prev = pointArr[key]
        // add useHover
        children.push(
          <HoverPath
            points={pointArr[key]}
            d={d}
            i={i}
            amount={amount}
            code={key}
            key={key}
            legend={legend}
          />
        )
      }

      const p = genPathCurve(points, stepSize / 2)
      paths = (
        <>
          {children}
          <path
            d={p}
            fill="none"
            stroke={useColor({ color: 'primary' })}
            // @ts-ignore
            data="line"
            strokeWidth={2}
          />
        </>
      )
    } else if (spread) {
      const p = genPathCurve(points, stepSize / 2)
      paths = (
        <>
          <path
            d={
              genPathCurve(mins, stepSize / 2) +
              `\nL${maxs[0][0]},${maxs[0][1]}` +
              genPathCurve(maxs, stepSize / 2) +
              `\nL${mins[0][0]},${mins[0][1]}`
            }
            fill={useColor({ color: 'primary', opacity: 0.08 })}
          />
          <path
            d={p}
            fill="none"
            stroke={useColor({ color: 'primary' })}
            // @ts-ignore
            data="line"
            strokeWidth={2}
          />
        </>
      )
    } else {
      const p = genPathCurve(points, stepSize / 2)

      paths = (
        <>
          <path
            d={
              p +
              `L${points[points.length - 1][0]},${
                points[points.length - 1][1]
              }L${points[points.length - 1][0]},${height},L0,${height}`
            }
            fill={useColor({ color: 'primary', opacity: 0.08 })}
          />
          <path
            d={p}
            fill="none"
            // @ts-ignore
            data="line"
            stroke={useColor({ color: 'primary' })}
            strokeWidth={2}
          />
        </>
      )
    }
  } else {
    if (segments) {
      let amount = 0
      let setTotal = false
      const pointArr = {}
      for (let i = 0; i < data.length; i++) {
        points.push([stepSize * i, (ySpread - (data[i].y - minY)) / pxValue])
        let prevY = 0
        for (const key in data[i].segments) {
          if (!pointArr[key]) {
            pointArr[key] = []
          }
          if (!setTotal) {
            amount++
          }
          prevY += data[i].segments[key]
          pointArr[key].push([
            stepSize * i,
            (ySpread - (prevY - minY)) / pxValue,
          ])
        }
        setTotal = true
      }
      const children = []
      let i = 0
      let prev
      for (const key in pointArr) {
        const p = genPathCurve(
          prev ? [...pointArr[key]].reverse() : pointArr[key],
          stepSize / 2
        )
        const d = prev
          ? genPathCurve(prev, stepSize / 2) +
            `L${width},${pointArr[key][pointArr[key].length - 1][1]}` +
            p +
            `L0,${prev[0][1]}`
          : p + `L${width},${height},L0,${height}`
        i++
        prev = pointArr[key]
        // add useHover
        children.push(
          <HoverPath
            points={pointArr[key]}
            d={d}
            i={i}
            amount={amount}
            code={key}
            key={key}
            legend={legend}
          />
        )
      }

      const p = genPathCurve(points, stepSize / 2)
      paths = (
        <>
          {children}
          <path
            d={p}
            fill="none"
            stroke={useColor({ color: 'primary' })}
            // @ts-ignore
            data="line"
            strokeWidth={2}
          />
        </>
      )
    } else {
      for (let i = 0; i < data.length; i++) {
        points.push([stepSize * i, (ySpread - (data[i].y - minY)) / pxValue])
      }
      const p = genPathCurve(points, stepSize / 2)
      paths = (
        <>
          <path
            d={p + `L${width},${height},L0,${height}`}
            fill={useColor({ color: 'primary', opacity: 0.08 })}
          />
          <path
            d={p}
            fill="none"
            stroke={useColor({ color: 'primary' })}
            // @ts-ignore
            data="line"
            strokeWidth={2}
          />
        </>
      )
    }
  }

  return [paths, points]
}

export { genPathCurve }

export default genPath
