export type DateFormat =
  | 'date'
  | 'date-time'
  | 'date-time-text'
  | 'date-time-human'
  | 'time'
  | 'time-precise'

const addZero = (input: number): string => {
  const response = input + ''

  if (response.length === 1) {
    return '0' + response
  }

  return response
}

export default (
  input: number | string,
  format: DateFormat = 'date'
): string => {
  if (typeof input === 'number') {
    const date = new Date(input)
    if (format === 'date') {
      return (
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      )
    } else if (format === 'time') {
      return date.getHours() + ':' + addZero(date.getMinutes())
    } else if (format === 'time-precise') {
      return (
        date.getHours() +
        ':' +
        addZero(date.getMinutes()) +
        ':' +
        addZero(date.getSeconds())
      )
    } else if (format === 'date-time-text') {
      return `${date.toLocaleDateString('default', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}, ${date.toLocaleTimeString()}`
    } else if (format === 'date-time') {
      return (
        date.getHours() +
        ':' +
        addZero(date.getMinutes()) +
        ' ' +
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear()
      )
    } else if (format === 'date-time-human') {
      const now = new Date()

      const timeTable = [
        ['getFullYear', 'year', 'years'],
        ['getMonth', 'month', 'months'],
        ['getDate', 'day', 'days'],
        ['getHours', 'hour', 'hours'],
        ['getMinutes', 'minute', 'minutes'],
        ['getSeconds', 'second', 'seconds'],
      ]

      if (now.getTime() > date.getTime()) {
        for (let i = 0; i < timeTable.length; i++) {
          const [m, single, plural] = timeTable[i]
          const a = now[m]()
          const b = date[m]()
          if (a > b) {
            const diff = a - b
            return `${a - b} ${diff > 1 ? plural : single} ago`
          }
        }

        return 'Now'
      } else {
        for (let i = 0; i < timeTable.length; i++) {
          const [m, single, plural] = timeTable[i]
          // const lang = getLanguage()
          const a = date[m]()
          const b = now[m]()
          if (a > b) {
            const diff = a - b
            return `${a - b} ${diff > 1 ? plural : single} from now`
          }
        }
        // in the future
        return 'Now'
      }
    }

    return String(input)
  }

  return input
}
