import React from 'react'
import { isBrowser } from '@aviato/utils'

export const useSafeLayoutEffect = isBrowser
  ? React.useLayoutEffect
  : React.useEffect
