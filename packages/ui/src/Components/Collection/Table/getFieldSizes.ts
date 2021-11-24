import { DataEventHandler } from '../../../types'
import { TableitemProps } from '../types'

const getFieldSizes = (
  width: number,
  itemProps: TableitemProps,
  onOptions: DataEventHandler,
  large: boolean
): TableitemProps => {
  let w = 0
  if (onOptions) {
    width = width - 35
  }

  const newItemProps: TableitemProps = { ...itemProps, fields: [] }

  let imgCnt = 0

  for (let i = 0; i < itemProps.fields.length; i++) {
    const f = itemProps.fields[i]
    const n = { ...f }

    let add = 0
    if (f.width) {
      add = f.width
      newItemProps.fields.push(n)
    } else if (f.type === 'number') {
      add = 125
      n.width = 125
      newItemProps.fields.push(n)
    } else if (f.type === 'text') {
      if (f.format === 'date-time-human') {
        // make this better
        n.width = 175
        add = 175
        newItemProps.fields.push(n)
      } else if (
        f.format === 'date' ||
        f.format === 'date-time' ||
        f.format === 'time-precise' ||
        f.format === 'time'
      ) {
        n.width = 150
        add = 150
        newItemProps.fields.push(n)
      } else {
        n.width = 210
        add = 210
        newItemProps.fields.push(n)
      }
    } else if (f.type === 'icon') {
      n.width = 80
      add = 80
      newItemProps.fields.push(n)
      imgCnt++
    } else if (f.type === 'img') {
      n.width = large ? 64 : 24
      add = large ? 64 : 24
      imgCnt++
      newItemProps.fields.push(n)
    }
    if (w + add > width) {
      break
    }
    w += add
  }

  if (w < width) {
    const diff = (width - w) / (newItemProps.fields.length - imgCnt)
    for (const n of newItemProps.fields) {
      // maybe have others with the same
      if (n.type !== 'img' && n.type !== 'icon') {
        n.width += diff
      }
    }
  }

  return newItemProps
}

export default getFieldSizes
