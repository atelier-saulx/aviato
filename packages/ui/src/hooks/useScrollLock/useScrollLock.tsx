import { useEffect, useRef, useState } from 'react'

import {
  getLockStyles,
  injectStyles,
  insertStyleTag,
  makeStyleTag,
} from './utils'

interface UseScrollLockOptions {
  disableBodyPadding: boolean
}

export function useScrollLock(
  isLocked?: boolean,
  options: UseScrollLockOptions = {
    disableBodyPadding: false,
  }
) {
  const [scrollLocked, setScrollLocked] = useState(isLocked || false)
  const scrollTop = useRef(0)

  const { disableBodyPadding } = options

  const stylesheet = useRef<CSSStyleSheet | any | null>(null)

  const lockScroll = () => {
    scrollTop.current = window.scrollY

    const styles = getLockStyles({ disableBodyPadding })

    /**
     * by applying styles via style tag
     * we dont care about previous styles due to inheritance
     * when scroll gets unlocked we delete that style tag
     */
    const sheet = makeStyleTag()

    injectStyles(sheet, styles)
    insertStyleTag(sheet)

    stylesheet.current = sheet
  }

  const unlockScroll = () => {
    if (!stylesheet?.current) return

    stylesheet.current.parentNode.removeChild(stylesheet.current)
    stylesheet.current = null
  }

  useEffect(() => {
    if (scrollLocked) {
      lockScroll()
    } else {
      unlockScroll()
    }

    return unlockScroll
  }, [scrollLocked])

  useEffect(() => {
    if (isLocked !== undefined) {
      setScrollLocked(isLocked)
    }
  }, [isLocked])

  useEffect(() => {
    if (isLocked === undefined && typeof window !== 'undefined') {
      window.document.body.style.overflow === 'hidden' && setScrollLocked(true)
    }
  }, [setScrollLocked])

  return [scrollLocked, setScrollLocked] as const
}
