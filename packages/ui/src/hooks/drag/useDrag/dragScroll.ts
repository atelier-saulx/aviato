const animateScroll = (animation, el, p, x, y) => {
  const rect = p.getBoundingClientRect()
  if (
    y > rect.y &&
    y < rect.height + rect.y &&
    x > rect.x &&
    x < rect.width + rect.x
  ) {
    const hasVerticalScrollbar = p.scrollHeight > rect.height
    const overflowY =
      hasVerticalScrollbar && global.getComputedStyle(p)['overflow-y']
    if (
      hasVerticalScrollbar &&
      (overflowY === 'scroll' || overflowY === 'auto')
    ) {
      if (!el.tmpp) {
        el.tmpp = p
      }
      if (animation.elem && animation.elem !== p) {
        delete animation.elem
        animation.amount = 0
        animation.frames = 0
      }

      const scrollArea = Math.min(Math.max(40, 0.1 * rect.height), 125)
      const ratio = 40 / scrollArea

      if (y > rect.y + rect.height - scrollArea) {
        const delta = rect.y + rect.height - y
        animation.amount = (scrollArea - delta) * ratio
        animation.elem = p
        animation.start()
      } else if (y < rect.y + scrollArea) {
        const delta = y - (rect.y + scrollArea)
        animation.elem = p
        animation.amount = delta * ratio
        animation.start()
      } else if (animation.elem) {
        delete animation.elem
        animation.amount = 0
        animation.frames = 0
        animation.stop()
      } else {
        animation.stop()
      }
      return true
    }
  }
}

const dragScroll = (t) => {
  const animation: {
    loop?: any
    animating?: boolean
    frames?: number
    elem?: Element
    amount?: number
    start?: Function
    stop?: Function
  } = {
    animating: false,
    loop: false,
  }
  // easiest way of doing it for now
  const dragScrollers = document.querySelectorAll('[data-dragscroll="true"]')
  const nextFrame = () => {
    animation.loop = global.requestAnimationFrame(() => {
      if (animation.elem) {
        if (animation.frames > 20) {
          animation.frames += 0.03
        } else {
          animation.frames += 1
        }
        if (animation.frames > 100) {
          animation.frames = 100
        }
        animation.elem.scrollTop +=
          animation.amount *
          (animation.frames * animation.frames * 0.002 + 0.05)
      }
      nextFrame()
    })
  }

  animation.start = () => {
    if (!animation.animating) {
      animation.animating = true
      nextFrame()
    }
  }
  animation.stop = () => {
    animation.animating = false
    global.cancelAnimationFrame(animation.loop)
  }

  const dragListener = (e) => {
    const el = t
    let p = el.tmpp || el
    const y = e.pageY
    const x = e.pageX
    for (const p of dragScrollers) {
      const el = t
      if (animateScroll(animation, el, p, x, y)) {
        return
      }
    }
    while (p && p.getBoundingClientRect) {
      if (animateScroll(animation, el, p, x, y)) {
        return
      }
      p = p.parentNode
    }
    animation.stop()
  }

  document.body.addEventListener('drag', dragListener)
  return () => {
    animation.stop()
    document.body.removeEventListener('drag', dragListener)
  }
}

export default dragScroll
