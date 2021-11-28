import React from 'react'
import { isBrowser } from '~/utils'

export const useSafeLayoutEffect = isBrowser
  ? React.useLayoutEffect
  : React.useEffect
