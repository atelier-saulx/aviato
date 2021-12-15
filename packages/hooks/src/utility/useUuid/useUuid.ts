import { useState } from 'react'
import { getRandomId } from '@aviato/utils'
import { useIsomorphicEffect } from '~/layout'

export function useUuid({
  staticId,
  prefix = 'uuid',
}: {
  staticId?: string
  prefix?: string
} = {}) {
  const [uuid, setUuid] = useState('')

  useIsomorphicEffect(() => {
    setUuid(getRandomId(prefix))
  }, [])

  return staticId ?? uuid
}
