export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold'
export type FontColor = 'primary' | 'secondary' | 'disabled'

export type BaseTextProps = {
  value?: string
  weight?: FontWeight
  color?: FontColor
}
