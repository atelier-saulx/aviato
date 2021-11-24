export const timeValueToMiliseconds = (
  value: Date | number | string | null
): number => {
  if (!value) {
    return null
  }

  const re = /(\d{1,2}):(\d{1,2}):?(\d{1,2})?/

  if (typeof value === 'object' && value.getMonth) {
    return (value as Date).getTime()
  } else if (typeof value === 'string' && re.test(value)) {
    const m = re.exec(value)
    return new Date(
      new Date(null).setUTCHours(
        parseInt(m[1]),
        parseInt(m[2]),
        m[3] ? parseInt(m[3]) : 0
      )
    ).getTime()
  } else if (typeof value === 'number') {
    return value
  }

  throw new Error(
    'value must be Date (UTC), milliseconds or HH:MM|HH:MM:SS string.'
  )
}

export const dateValueToTimestamp = (
  value: Date | number | string | null
): number => {
  if (!value) {
    return null
  }

  const re = /(\d{1,2})([/-])?(\d{1,2})?([/-])?(\d{1,5})?/

  if (typeof value === 'object' && value.getMonth) {
    return (value as Date).getTime()
  } else if (typeof value === 'string' && re.test(value)) {
    const m = re.exec(value)

    return new Date(
      parseInt(m[5]),
      parseInt(m[3]) - 1,
      parseInt(m[1])
    ).getTime()
  } else if (typeof value === 'number') {
    return value
  }

  console.error('got:', value)
  throw new Error('value must be Date , timestamp or DD/MM/YYYY string.')
}

export const milisecondsToTimeString = (
  miliseconds: number,
  useSeconds: boolean
): string | null => {
  if (!miliseconds) {
    return null
  }

  const date = new Date(miliseconds)

  let tempString =
    ('0' + date.getUTCHours()).slice(-2) +
    ':' +
    ('0' + date.getUTCMinutes()).slice(-2)

  if (useSeconds) {
    tempString += ':' + ('0' + date.getUTCSeconds()).slice(-2)
  }

  return tempString
}

export const timestampToDateString = (timestamp: number): string | null => {
  if (!timestamp) {
    return null
  }

  const date = new Date(timestamp)

  return (
    ('0' + date.getDate()).slice(-2) +
    '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    date.getFullYear()
  )
}
