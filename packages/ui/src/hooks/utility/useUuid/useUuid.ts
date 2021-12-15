import { useState } from 'react'
import { getRandomId } from '@aviato/utils'
import { useIsomorphicEffect } from '~/hooks/layout'

export function useUuid(staticId?: string) {
  const [uuid, setUuid] = useState('')

  useIsomorphicEffect(() => {
    setUuid(getRandomId())
  }, [])

  return staticId ?? uuid
}
