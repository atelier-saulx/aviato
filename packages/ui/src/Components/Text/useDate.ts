import { useEffect, useReducer } from 'react'
import { isTextFormat, TextValue } from '../../textParser'

const timeUpdaters: Set<{
  fn: Function
  lastUpdatedTime: number
  val: number
}> = new Set()
let timer: any
let smallest: number | undefined

const setTimer = () => {
  // const d = Date.now()
  const v = smallest
  const next = v < 60e3 ? 500 : v < 60e3 * 60 ? 30e3 : 60 * 30e3

  timer = setTimeout(() => {
    const d = Date.now()
    timeUpdaters.forEach((v) => {
      const v2 = d - v.val
      const next2 = v2 < 60e3 ? 1e3 : v2 < 60e3 * 60 ? 60e3 : 60 * 60e3
      if (d - v.lastUpdatedTime > next2) {
        v.lastUpdatedTime = d
        v.fn()
      }
    })
    setTimer()
  }, next)
}

const start = (value) => {
  value = Date.now() - value
  if (smallest === undefined || value < smallest) {
    smallest = value
    clearTimeout(timer)

    setTimer()
  }
}

const stop = () => {
  if (timeUpdaters.size === 0) {
    clearTimeout(timer)
    smallest = undefined
  }
}

export default (children: TextValue) => {
  let d

  if (
    isTextFormat(children) &&
    children.format === 'date-time-human' &&
    (children.value < (d = Date.now()) + 60 * 60 * 24 || !children.value)
  ) {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    useEffect(() => {
      let timeUpdater
      if (isTextFormat(children) && children.format === 'date-time-human') {
        timeUpdater = {
          fn: forceUpdate,
          lastUpdatedTime: d,
          val: children.value,
        }
        timeUpdaters.add(timeUpdater)

        start(Number(children.value))
      }
      return () => {
        timeUpdaters.delete(timeUpdater)
        stop()
      }
    }, [children])
  }
}
