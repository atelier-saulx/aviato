export type FontWeight = 'Regular' | 'Medium' | 'Semibold' | 'Bold'

export type FontColor =
  | 'Primary'
  | 'PrimaryContrastHigh'
  | 'PrimaryMain'
  | 'ActionDisabledContent'
  | 'Secondary'
  | 'Disabled'

export type BaseTextProps = {
  value?: string
  weight?: FontWeight
  color?: FontColor
}
