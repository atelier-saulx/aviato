import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  ReactNode,
} from 'react'

const ToastContext = createContext(undefined)

const ToastWrapper = ({ id, children, onClick = null, toast }) => {
  const [fade, setFade] = useState(0)
  const close = () => toast.close(id)

  useEffect(() => {
    const fadeout = () => {
      setFade(300)
    }
    const timer = setTimeout(fadeout, 5e3)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        opacity: fade ? 0 : 1,
        transition: `opacity ${fade}ms`,
        cursor: 'pointer',
      }}
      onTransitionEnd={fade ? close : null}
      onClick={() => {
        close()
        onClick?.()
      }}
    >
      {children}
    </div>
  )
}

type PositionStyleProps = {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export const ToastProvider = ({
  children,
  position = 'bottom-right',
  fixed = true,
}) => {
  const [length, setLength] = useState(0)
  const positionRef = useRef<typeof position>()
  const positionStyleRef = useRef<PositionStyleProps>()
  const toastsRef = useRef<
    {
      id: number
      children: ReactNode
    }[]
  >()
  const toastRef = useRef<Function & { close: Function }>()

  if (!toastRef.current) {
    let cnt = 0
    const listeners = new Set([setLength])
    const update = (length) => {
      listeners.forEach((fn) => fn(length))
    }

    const toast = (children) => {
      const id = cnt++
      update(
        toastsRef.current.unshift({
          id,
          children: (
            <ToastWrapper id={id} toast={toast}>
              {children}
            </ToastWrapper>
          ),
        })
      )
      return id
    }

    toast.close = (id) => {
      if (typeof id === 'number') {
        const index = toastsRef.current.findIndex(
          ({ id: toastId }) => toastId === id
        )
        if (index !== -1) {
          toastsRef.current.splice(index, 1)
          update(toastsRef.current.length)
        }
      } else {
        toastsRef.current = []
        update(0)
      }
    }

    toast.useAmount = () => {
      const [state, setState] = useState(length)

      useEffect(() => {
        listeners.add(setState)
        return () => {
          listeners.delete(setState)
        }
      }, [])

      return state
    }

    toastRef.current = toast
    toastsRef.current = []
  }

  if (positionRef.current !== position) {
    positionRef.current = position
    const [y, x] = position.split('-')
    const positionStyle: PositionStyleProps = {}
    if (y === 'bottom') {
      positionStyle.bottom = 16
    } else {
      positionStyle.top = 16
    }
    if (x === 'left') {
      positionStyle.left = 16
    } else {
      positionStyle.right = 16
    }
    positionStyleRef.current = positionStyle
  }

  const toasts = toastsRef.current.map(({ id, children }, index) => {
    let y = index * 96

    if ('bottom' in positionStyleRef.current) {
      y *= -1
    }

    return (
      <div
        key={id}
        style={{
          position: fixed ? 'fixed' : 'absolute',
          transform: `translate3d(0,${y}px,0)`,
          transition: 'transform 0.3s',
          ...positionStyleRef.current,
        }}
      >
        {children}
      </div>
    )
  })

  return (
    <ToastContext.Provider value={toastRef.current}>
      {children}
      {toasts}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const toast = useContext(ToastContext)
  if (toast) {
    return toast
  }
  const noContext = () => {
    console.warn('No ToastContext found')
  }
  noContext.close = noContext
  return noContext
}