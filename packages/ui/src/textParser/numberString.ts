export type NumberFormat =
  | 'number-short'
  | 'number-human'
  | 'number-ratio'
  | 'number-bytes'
  | 'number-euro'
  | 'number-dollar'
  | 'number-pound'

const parseNumber = (input: number | string, format: NumberFormat): string => {
  // if number === number-bytes
  // if number === number-percentage

  if (typeof input === 'number') {
    if (
      format === 'number-euro' ||
      format === 'number-dollar' ||
      format === 'number-pound'
    ) {
      const p = parseNumber(input, 'number-short')
      // const thousandSeperator = format === 'number-euro' ? '.' : ','
      const fraction = format === 'number-euro' ? ',' : '.'

      const [s, f] = p.split('.')

      // add short and long

      return `${
        format === 'number-euro'
          ? '€'
          : format === 'number-pound'
          ? '£'
          : format === 'number-dollar'
          ? '$'
          : ''
      }${s}${f ? `${fraction}${f}` : ''}`
    } else if (format === 'number-bytes') {
      const kb = input / 1024
      const mb = kb / 1024
      const gb = mb / 1024

      if (gb > 1) {
        return `${gb.toFixed(2)} gb`
      } else if (mb > 1) {
        return `${mb.toFixed(2)} mb`
      } else if (kb > 1) {
        return `${kb.toFixed(2)} kb`
      } else {
        return `${input} ${input === 1 ? 'byte' : 'bytes'}`
      }
    } else if (format === 'number-ratio') {
      return `${Math.round(input * 10000) / 100}%`
    } else if (format === 'number-short') {
      if (input >= 1e6) {
        input = input / 1e6
        input = input.toFixed(1)
        if (input[input.length - 1] === '0') {
          input = input.slice(0, -2)
        }
        return input + 'm'
      } else if (input >= 1e3) {
        input = input / 1e3
        input = input.toFixed(1)
        if (input[input.length - 1] === '0') {
          input = input.slice(0, -2)
        }
        return input + 'k'
      }
      input = input.toFixed(2)
      if (input[input.length - 1] === '0') {
        input = input.slice(0, -3)
      }
      return String(input)
    } else if (format === 'number-human') {
      return input.toFixed(2)
    }
    return String(input)
  } else {
    return input
  }
}

export default parseNumber
