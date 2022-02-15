export interface ThemeProps {
  /** Active theme name */
  activeTheme: string

  /** Update the theme */
  setActiveTheme: (targetTheme: string) => void

  /** Get next available theme */
  getNextTheme: () => string

  /** Toggle to next available theme */
  toggleTheme: () => void
}
