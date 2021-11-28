import { useEffect, useState } from 'react'
import { off, on } from '@aviato/utils'

function useMouseWheel(): number {
  const [mouseWheelOffset, setMouseWheelScrolled] = useState(0)

  useEffect(() => {
    const updateScroll = (event: WheelEvent) => {
      setMouseWheelScrolled(event.deltaY + mouseWheelOffset)
    }

    on(window, 'wheel', updateScroll, false)

    return () => off(window, 'wheel', updateScroll)
  })

  return mouseWheelOffset
}

export { useMouseWheel }
