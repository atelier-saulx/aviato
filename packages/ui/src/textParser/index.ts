import { Language } from './types'
import { useReducer, useEffect } from 'react'
import { prettyDate, DateFormat } from '@based/pretty-date'
import { prettyNumber, NumberFormat } from '@based/pretty-number'
import snarkdown from 'snarkdown'

export function isHtml(val: Value): val is { html: string } {
  return val && typeof val === 'object' && 'html' in val
}

export default isHtml

export type TextFormat =
  | DateFormat
  | NumberFormat
  | 'capitalize'
  | 'uppercase'
  | 'lowercase'
  | 'first-word'
  | 'markdown'
  | 'none'

export type TextValueFormat = {
  value: TextValueSingle
  format: TextFormat
}

export { Language }

let fromDefault: boolean = true
let defaultLanguage: Language = 'en'

export type Value =
  | undefined
  | (string | number | { html: string })
  | (string | number | { html: string })[]

export type TextValueSingle = Value | Partial<Record<Language, Value>>

export type TextValue =
  | (TextValueFormat | TextValueSingle)
  | (TextValueFormat | TextValueSingle)[]

const listeners: Set<(lang: Language) => void> = new Set()

// put this in saulx utils
const langRe = /^.*?([a-z]{2,4});/
const readLang = (lang: string): Language => {
  let language: Language
  if (lang) {
    const m = lang.match(langRe)
    if (m && m[1]) {
      language = <Language>m[1]
    } else {
      language = 'en'
    }
  } else {
    language = 'en'
  }
  return language
}

export const getLanguage = (): Language => {
  return defaultLanguage
}

export const updateLanguage = (language: Language) => {
  fromDefault = false
  defaultLanguage = language
  listeners.forEach((fn) => {
    fn(defaultLanguage)
  })
}

export const useLanguage = (language?: Language) => {
  if (fromDefault) {
    if (language) {
      defaultLanguage = language
    } else if (typeof window !== 'undefined') {
      const language = navigator.language
      defaultLanguage = readLang(language)
    }
  }
  const [, update] = useReducer((x: number) => x + 1, 0)
  useEffect(() => {
    listeners.add(update)
    return () => {
      listeners.delete(update)
    }
  }, [])
  return defaultLanguage
}

export function isTextFormat(value: any): value is TextValueFormat {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    (typeof value === 'object' &&
      value !== null &&
      !('$$typeof' in value) &&
      'format' in value &&
      'value' in value)
  )
}

const formatText = (
  { format, value }: TextValueFormat,
  language: Language = defaultLanguage
): string | number | { html: string } => {
  let formattedString: string | number = ''

  if (typeof value === 'object') {
    formattedString = getTextValue(value, language) as string
  } else {
    formattedString = value
  }

  if (typeof formattedString === 'string') {
    if (format === 'markdown') {
      // memoize?
      return { html: snarkdown(formattedString) }
    } else if (format === 'capitalize') {
      if (formattedString === '') return
      return formattedString[0].toUpperCase() + formattedString.slice(1)
    } else if (format === 'uppercase') {
      return formattedString.toUpperCase()
    } else if (format === 'lowercase') {
      return formattedString.toLowerCase()
    } else if (format === 'first-word') {
      return formattedString.split(' ')[0]
    }
  }

  const isDateTimeFormat =
    format === 'date' ||
    format === 'date-time' ||
    format === 'date-time-human' ||
    format === 'date-time-text' ||
    format === 'time' ||
    format === 'time-precise'

  const isNumberFormat =
    format === 'number-human' ||
    format === 'number-short' ||
    format === 'number-ratio' ||
    format === 'number-bytes' ||
    format === 'number-euro' ||
    format === 'number-dollar' ||
    format === 'number-pound'

  if (isDateTimeFormat) {
    return prettyDate(formattedString, format)
  } else if (isNumberFormat) {
    return prettyNumber(formattedString, format)
  }

  return formattedString
}

export function getTextValue(
  value: TextValue | any,
  language: Language = defaultLanguage
): Value {
  if (Array.isArray(value)) {
    // @ts-ignore
    return value.map((item: TextValueSingle) => {
      return getTextValue(item, language)
    })
  }
  if (typeof value === 'object' && value && !('$$typeof' in value)) {
    if (isTextFormat(value)) {
      return formatText(value, language)
    } else {
      return value[language] || (!('html' in value) && value.en)
    }
  }

  // @ts-ignore
  return value
}

export function getStringValue(
  value: TextValue,
  language: Language = defaultLanguage
): string {
  const x = getTextValue(value, language)
  if (Array.isArray(x)) {
    return x.join('')
  }
  if (typeof x === 'number') {
    return String(x)
  }

  if (typeof x === 'object') {
    return x.html
  }

  return x
}

export { prettyNumber }

export function isTextValue(value: any): value is TextValue {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    (typeof value === 'object' && value && !('$$typeof' in value))
  )
}
