import { log } from '@aviato/utils'
import { useCallback, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button, getCurrentTheme } from '@aviato/ui'
import { useHasLoaded } from '@aviato/hooks'

export const ToggleThemeButton = () => {
  const hasLoaded = useHasLoaded()
  const { setTheme, theme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState(theme)

  const toggleTheme = useCallback(() => {
    log.global.debug('Toggling theme...')

    const targetTheme = getCurrentTheme() === 'light' ? 'dark' : 'light'

    setTheme(targetTheme)
    setCurrentTheme(targetTheme)
  }, [setTheme])

  if (!hasLoaded) {
    return null
  }

  return (
    <Button onClick={toggleTheme}>
      {currentTheme === 'light' ? '🌙' : '☀️'}
    </Button>
  )
}
