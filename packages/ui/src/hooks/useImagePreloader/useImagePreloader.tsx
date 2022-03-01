import { useEffect, useState } from 'react'
import { preloadImage } from '@aviato/utils'

export function useImagePreloader(imageList: string[]) {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false)

  useEffect(() => {
    let isCancelled = false
    let hasFailed = false

    async function effect() {
      if (isCancelled) {
        return
      }

      const imagesPromiseList: Promise<any>[] = []

      for (const index of imageList) {
        imagesPromiseList.push(preloadImage(index))
      }

      await Promise.all(imagesPromiseList).catch(() => {
        hasFailed = true
      })

      if (isCancelled) {
        return
      }

      if (!hasFailed) {
        setImagesPreloaded(true)
      }
    }

    effect()

    return () => {
      isCancelled = true
    }
  }, [imageList])

  return { imagesPreloaded }
}
