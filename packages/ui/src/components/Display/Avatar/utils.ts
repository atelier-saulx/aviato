import { useEffect, useState } from 'react'

export function getLettersFromAlt(input: string) {
  const separatedBySpace = input.split(' ')
  if (separatedBySpace.length > 1) {
    const initials =
      separatedBySpace.shift().charAt(0) + separatedBySpace.pop().charAt(0)
    return initials.toUpperCase()
  } else {
    const initials = separatedBySpace.shift().charAt(0)
    return initials.toUpperCase()
  }
}

export function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = function () {
      resolve(img)
    }

    img.onerror = img.onabort = function () {
      reject(src)
    }

    img.src = src
  })
}

export default function useImagePreloader(imageList: string[]) {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false)

  useEffect(() => {
    let isCancelled = false

    async function effect() {
      if (isCancelled) {
        return
      }

      const imagesPromiseList: Promise<any>[] = []

      for (const index of imageList) {
        imagesPromiseList.push(preloadImage(index))
      }

      await Promise.all(imagesPromiseList).catch(() => {})

      if (isCancelled) {
        return
      }

      setImagesPreloaded(true)
    }

    effect()

    return () => {
      isCancelled = true
    }
  }, [imageList])

  return { imagesPreloaded }
}
