import { useEffect, useState } from 'react'
import { off, on } from './utils'

function useMouseWheel() {
  const [wasMouseWheelScrolled, setMouseWheelScrolled] = useState(0)

  useEffect(() => {
    const updateScroll = (event: WheelEvent) => {
      setMouseWheelScrolled(event.deltaY + wasMouseWheelScrolled)
    }

    on(window, 'wheel', updateScroll, false)

    return () => off(window, 'wheel', updateScroll)
  })

  return wasMouseWheelScrolled
}

export { useMouseWheel }
