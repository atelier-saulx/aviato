import React, { useState, useEffect } from 'react'

const toasts = []
let cnt = 0
let update

const ToastWrapper = ({ id, children, onClick = null }) => {
  const [fade, setFade] = useState(0)

  useEffect(() => {
    const timer = setTimeout(fadeout, 5e3)
    return () => clearTimeout(timer)
  }, [])

  const fadeout = () => {
    setFade(300)
  }

  const dismiss = () => {
    const index = toasts.findIndex(({ id: toastId }) => toastId === id)
    if (index !== -1) {
      toasts.splice(index, 1)
      update(toasts.length)
    }
  }

  return (
    <div
      style={{
        opacity: fade ? 0 : 1,
        transition: `opacity ${fade}ms`,
        cursor: 'pointer',
      }}
      onTransitionEnd={fade ? dismiss : null}
      onClick={() => {
        setFade(100)
        onClick?.()
      }}
    >
      {children}
    </div>
  )
}

export const toast = (children) => {
  const id = cnt++

  update?.(
    toasts.unshift({
      id,
      children: <ToastWrapper id={id}>{children}</ToastWrapper>,
    })
  )
}

export const Toaster = () => {
  const [, setState] = useState(toasts.length)

  useEffect(() => {
    update = setState
    return () => {
      update = null
    }
  }, [])

  return (
    <>
      {toasts.map(({ id, children }, index) => {
        return (
          <div
            key={id}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              transform: `translate3d(0,${16 + index * 96}px,0)`,
              transition: 'transform 0.3s',
            }}
          >
            {children}
          </div>
        )
      })}
    </>
  )
}
