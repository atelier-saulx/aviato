import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

const DONE_DURATION = 250

const usePageStats = () => {
  const router = useRouter()

  const [isLoading, setLoading] = useState(false)
  const [timeoutId, setTimeoutId] = useState<any>(null)

  const onRouteChangeStart = useCallback(() => {
    setLoading(true)
  }, [])

  const onRouteChangeDone = useCallback(() => {
    setLoading(false)

    setTimeoutId(
      setTimeout(() => {
        setTimeoutId(null)
        setLoading(false)
      }, DONE_DURATION)
    )
  }, [])

  useEffect(() => {
    router.events.on('routeChangeStart', onRouteChangeStart)
    router.events.on('routeChangeComplete', onRouteChangeDone)
    router.events.on('routeChangeError', onRouteChangeDone)

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart)
      router.events.off('routeChangeComplete', onRouteChangeDone)
      router.events.off('routeChangeError', onRouteChangeDone)
    }
  }, [onRouteChangeDone, onRouteChangeStart, router.events])

  useEffect(
    () => () => {
      if (timeoutId) clearTimeout(timeoutId)
    },
    [timeoutId]
  )

  return {
    isLoading,
  }
}

export { usePageStats }
