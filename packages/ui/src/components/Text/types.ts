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
  weight?: FontWeight
  color?: FontColor
  size?: FontSize
}
