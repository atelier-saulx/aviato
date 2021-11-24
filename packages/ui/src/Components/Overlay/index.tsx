import React, {
  useReducer,
  useEffect,
  useState,
  useRef,
  useCallback,
  FunctionComponent,
  ReactNode,
} from 'react'

import { useColor } from '../../theme'
import { notify, useNotifications } from './useNotifications'

export type OnClose = () => void

// has to go to something else (in hook useOverlay)
export type OverlayOptions = {
  overlay?: boolean
  transparent?: boolean
}

export type Overlays = [ReactNode, OnClose, OverlayOptions][]

type OverlayItemProps = {
  options?: OverlayOptions
}

let listeners: (() => void)[] = []
let overlays: Overlays = []

const OverlayItem: FunctionComponent<OverlayItemProps> = ({
  children,
  options,
}) => {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(true)
  }, [setVisible])

  const hidden = options && options.overlay === false

  const transparent = options && options.transparent

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.15s',
        // backdropFilter: 'blur(4px)',
        backgroundColor:
          hidden || transparent
            ? null
            : useColor({ color: 'foreground', tone: 4, opacity: 0.5 }),
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        pointerEvents: hidden ? 'none' : 'all',
      }}
      onMouseDown={
        hidden
          ? null
          : useCallback((e) => {
              if (e.target === ref.current) {
                setVisible(false)
                setTimeout(() => {
                  removeOverlay(children)
                }, 150)
              }
            }, [])
      }
    >
      {children}
    </div>
  )
}
const Overlay = () => {
  const [, update] = useReducer((x) => x + 1, 0)
  const notifictions = useNotifications({ update })

  useEffect(() => {
    listeners.push(update)
    const remove = (e: KeyboardEvent) => {
      if (e.code === 'Esc' || e.keyCode === 27) {
        removeOverlay()
      }
    }
    document.addEventListener('keydown', remove)
    return () => {
      document.removeEventListener('keydown', remove)
      listeners = listeners.filter((u) => u !== update)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 1,
        top: 0,
        left: 0,
      }}
    >
      {overlays.map((c, i) => {
        return (
          <OverlayItem key={i} options={c[2]}>
            {c[0]}
          </OverlayItem>
        )
      })}

      {notifictions}
    </div>
  )
}

const addOverlay = (
  overlay: ReactNode,
  onClose: OnClose = () => {},
  options?: OverlayOptions
) => {
  overlays.push([overlay, onClose, options])
  listeners.forEach((update) => update())
}

const removeAllOverlays = () => {
  overlays.forEach(([, onClose]) => {
    if (onClose) {
      onClose()
    }
  })
  overlays = []
  listeners.forEach((update) => update())
}

const removeOverlay = (overlay?: ReactNode) => {
  if (!overlay) {
    if (overlays.length) {
      const [, onClose] = overlays.pop()
      if (onClose) {
        onClose()
      }
    }
  } else {
    const index = overlays.findIndex((o) => o[0] === overlay)
    if (index !== -1) {
      const [, onClose] = overlays[index]
      if (onClose) {
        onClose()
      }
      overlays.splice(index, 1)
    }
  }
  listeners.forEach((update) => update())
}

export { Overlay, addOverlay, removeOverlay, removeAllOverlays, notify }
