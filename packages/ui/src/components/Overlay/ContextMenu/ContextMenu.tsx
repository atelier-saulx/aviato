import React, { FC, useEffect } from 'react'
import useOverlayPosition from '../../BasedUI/hooks/overlay/useOverlayPosition'
import Shared, { OverlayProps } from '../../BasedUI/Overlay/Shared'

export const ContextMenu: FC<OverlayProps> = ({
  positionProps = {},
  target,
  props,
  Component,
  css,
}) => {
  const [elementRef, position, resize] = useOverlayPosition(
    target,
    positionProps
  )

  useEffect(() => {
    const elems = elementRef.current.querySelectorAll(
      '[data-aviato-context-item]'
    )

    console.info(elems)

    let currentFocus: number = 0
    let elem: any
    const focus = () => {
      elem = elems[currentFocus]
      if (elem) {
        elem.focus()
      }
    }
    focus()
    const setFocus = (e) => {
      const { key } = e

      if (key === 'Escape') {
        focus()
      } else if (key === 'Enter') {
        if (elem) {
          elem.click(e)
        }
      } else if (key === 'Tab' || key === 'ArrowDown') {
        currentFocus++
        if (currentFocus > elems.length - 1) {
          currentFocus = 0
        }
        focus()
        e.preventDefault()
      } else if (key === 'ArrowUp') {
        currentFocus--
        if (currentFocus < 0) {
          currentFocus = elems.length - 1
        }
        focus()
        e.preventDefault()
      }
    }
    window.document.addEventListener('keydown', setFocus)
    return () => {
      window.document.removeEventListener('keydown', setFocus)
    }
  }, [elementRef])

  if (!positionProps.width) {
    positionProps.width = 256
  }

  const s = { paddingTop: 4, paddingBottom: 4, ...css }

  if (props.filterable) {
    s.paddingTop = 0
  }

  // misch met ref gwn checken wat er allemaal in zit

  return (
    <Shared css={s} ref={elementRef} position={position}>
      {React.createElement(Component, {
        resize,
        position,
        ...props,
      })}
    </Shared>
  )
}
