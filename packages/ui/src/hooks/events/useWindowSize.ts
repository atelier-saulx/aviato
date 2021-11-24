import { useEffect, useState } from 'react'

const useWindowSize =
  typeof window !== 'undefined'
    ? (): { width: number; height: number } => {
        const [pos, update] = useState({
          width: global.innerWidth || 0,
          height: global.innerHeight || 0,
        })
        useEffect(() => {
          const handler = () => {
            update({
              width: global.innerWidth || 0,
              height: global.innerHeight || 0,
            })
          }
          global.addEventListener('resize', handler)
          return () => {
            global.removeEventListener('resize', handler)
          }
        }, [])
        return pos
      }
    : (): { width: number; height: number } => {
        return { width: 0, height: 0 }
      }

export default useWindowSize
