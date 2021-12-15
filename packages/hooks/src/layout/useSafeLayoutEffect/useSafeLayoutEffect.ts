import React from 'react'
import { isBrowser } from '@aviato/utils'

/**
 * useLayoutEffect will show warning if used during SSR, e.g. with Next.js.
 * useSafeLayoutEffect removes it by replacing useLayoutEffect with useEffect during SSR.
 *
 * Mantine calls this 'useIsomorphicEffect', hence the double export.
 */
export const useSafeLayoutEffect = isBrowser
  ? React.useLayoutEffect
  : React.useEffect

export const useIsomorphicEffect = useSafeLayoutEffect
