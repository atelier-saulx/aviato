import { useReducer, useEffect } from 'react'
import { hash } from '@saulx/hash'
import './style.css'
import './font/style.css'

export type Rgb = [number, number, number]

export type ColorKey =
  | 'primary'
  | 'primaryAccent'
  | 'secondary'
  | 'secondaryAccent'
  | 'background'
  | 'foreground'
  | 'divider'
  | 'error'

export type Colors = {
  primary: Rgb[]
  primaryAccent: Rgb[]
  secondary: Rgb[]
  secondaryAccent: Rgb[]
  background: Rgb[]
  foreground: Rgb[]
  divider: Rgb[]
  error: Rgb[]
}

export type Theme = {
  light: Colors
  dark: Colors
}

export type Listener = () => void

export type ThemeWrapper = {
  theme: Theme
  listeners: Listener[]
  active: 'light' | 'dark'
}

const theme: ThemeWrapper = {
  theme: {
    light: {
      primary: [
        [98, 0, 238],
        [87, 0, 210],
        [66, 0, 160],
      ],
      divider: [[234, 235, 237]],
      primaryAccent: [
        [248, 242, 255],
        [230, 214, 252],
        [191, 149, 251],
      ],
      error: [[230, 8, 13]],
      secondary: [[217, 19, 174]],
      secondaryAccent: [[200, 200, 255]],
      background: [
        [255, 255, 255],
        [247, 247, 248],
        [238, 238, 239],
        [232, 233, 235],
      ],
      foreground: [
        [5, 24, 41],
        [92, 104, 115],
        [143, 142, 155],
        [163, 168, 172],
      ],
    },
    dark: {
      error: [[255, 0, 0]],
      primary: [
        [248, 142, 255],
        [230, 214, 252],
        [191, 149, 251],
      ],
      divider: [[50, 56, 41]],
      primaryAccent: [
        [248, 242, 255],
        [230, 214, 252],
        [191, 149, 251],
      ],
      secondary: [[217, 19, 174]],
      secondaryAccent: [[200, 200, 255]],
      background: [
        [20, 20, 25],
        [246, 246, 246],
        [233, 233, 231],
        [228, 228, 228],
      ],
      foreground: [
        [245, 244, 241],
        [92, 104, 115],
        [143, 142, 155],
        [163, 168, 172],
      ],
    },
  },
  active: 'light',
  listeners: [],
}

export const hashTheme = (theme: ThemeWrapper): string => {
  return hash(theme.theme.light) + '' + hash(theme.theme.dark)
}

// fonts

// initial theme version
let themeVersion = hashTheme(theme)

const inverseTheme = () => {
  return theme.active === 'dark' ? 'light' : 'dark'
}

const isTouch =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || (navigator as any).msMaxTouchPoints)

if (isTouch) {
  const htmlStyle = document.documentElement.style
  const updateBg = () => {
    if (global.innerWidth < global.innerHeight) {
      htmlStyle.backgroundSize = 'auto 100vh'
    } else {
      htmlStyle.backgroundSize = '100vw auto'
    }
  }
  htmlStyle.backgroundPosition = 'center top'
  global.addEventListener('resize', updateBg)
  updateBg()
}

let firstSet = false

export const useTheme = (active?: 'light' | 'dark'): string => {
  if (active === undefined) {
    if (typeof window !== 'undefined') {
      const isDark = global.matchMedia('(prefers-color-scheme: dark)').matches
      active = isDark ? 'dark' : 'light'
    } else {
      active = 'dark'
    }
  }

  const [, update] = useReducer((x: number) => x + 1, 0)

  if (!firstSet) {
    theme.active = active
    firstSet = true
  }

  useEffect(() => {
    theme.listeners.push(update)
    return () => {
      theme.listeners = theme.listeners.filter((s) => s !== update)
    }
  }, [])

  if (typeof window !== undefined) {
    document.body.style.background = useColor({ color: 'background' })
  }

  return themeVersion
}

interface ColorBase {
  opacity?: number
}

export interface Color extends ColorBase {
  color: ColorKey
  tone?: number
}

export interface RgbColor extends ColorBase {
  rgb: Rgb
}

export type GradientColor = [Color, Color]

export const useColor = (color: Color | GradientColor | RgbColor): string => {
  if (Array.isArray(color)) {
    return useGradientColor(color)
  } else if (color.hasOwnProperty('rgb')) {
    return useRgbColor(color as RgbColor)
  } else {
    return useColorActual(color as Color)
  }
}

const useGradientColor = (color: GradientColor) => {
  const a = useColor(color[0])
  const b = useColor(color[1])
  const x = `linear-gradient(96.76deg, ${a} -85.47%, ${b} 104.14%)`
  return x
}

const useRgbColor = (color: RgbColor) => {
  if (color.opacity && color.opacity !== 1) {
    return `rgba(${color.rgb[0]},${color.rgb[1]},${color.rgb[2]}, ${color.opacity})`
  } else {
    return `rgb(${color.rgb[0]},${color.rgb[1]},${color.rgb[2]})`
  }
}

const useColorActual = (color: Color) => {
  const { tone = 1, opacity = 1, color: c } = color || { color: 'foreground' }
  const selector = theme.theme[theme.active][c]
  const rgb = selector[tone - 1] || selector[selector.length - 1]
  if (opacity !== 1) {
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, ${opacity})`
  } else {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
  }
}

export const getTheme = (label?: string): Colors => {
  return (label ? theme.theme[label] : theme.theme[theme.active]) || {}
}

export const getTone = (): string => {
  return theme.active
}

type Optional<T> = { [P in keyof T]?: T[P] }

export const updateTheme = (update: {
  dark?: Optional<Colors>
  light?: Optional<Colors>
}) => {
  for (const key in update) {
    for (const c in update[key]) {
      theme.theme[key][c] = update[key][c]
    }
  }
  const newVersion = hashTheme(theme)

  if (newVersion !== themeVersion) {
    themeVersion = newVersion
    theme.listeners.forEach((update) => {
      update()
    })
  }
}

export const switchTheme = (label: 'dark' | 'light') => {
  if (!label) {
    theme.active = inverseTheme()
  } else {
    theme.active = label
  }
  theme.listeners.forEach((update) => {
    update()
  })
}

export default theme
