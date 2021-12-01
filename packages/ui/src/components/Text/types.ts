export type FontWeight = 'Regular' | 'Medium' | 'Semibold' | 'Bold'

export type FontColor =
  | 'Primary'
  | 'PrimaryContrastHigh'
  | 'PrimaryMain'
  | 'ActionDisabledContent'
  | 'Secondary'
  | 'Disabled'

export type FontSize = 'Small' | 'Medium' | 'Large' | 'ExtraLarge'

export type BaseTextProps = {
  value?: string
  weight?: FontWeight
  color?: FontColor
  size?: FontSize
}
