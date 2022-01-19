export type ColorMode = 'light' | 'dark'

export interface ThemeProps {
  /** Active theme name */
  theme: ColorMode

  /** Update the theme */
  setTheme: (updatedValue: ColorMode) => void
}
