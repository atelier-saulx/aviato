import { useEffect, useState } from 'react'

const useWindowSize =
  typeof window !== 'undefined'
    ? (): { width: number; height: number } => {
        const [pos, update] = useState({
          width: innerWidth || 0,
          height: innerHeight || 0,
        })
        useEffect(() => {
          const handler = () => {
            update({
              width: innerWidth || 0,
              height: innerHeight || 0,
            })
          }
          addEventListener('resize', handler)
          return () => {
            removeEventListener('resize', handler)
          }
        }, [])
        return pos
      }
    : (): { width: number; height: number } => {
        return { width: 0, height: 0 }
      }

export default useWindowSize
