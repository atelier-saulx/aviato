import { useEffect, useState } from 'react'

function useWindowSize(): {
  width: number
  height: number
} {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 }
  }

  const [position, update] = useState({
    width: global.innerWidth ?? 0,
    height: global.innerHeight ?? 0,
  })

  useEffect(() => {
    const handler = () => {
      update({
        width: global.innerWidth ?? 0,
        height: global.innerHeight ?? 0,
      })
    }

    global.addEventListener('resize', handler)

    return () => {
      global.removeEventListener('resize', handler)
    }
  }, [])

  return position
}

export { useWindowSize }
