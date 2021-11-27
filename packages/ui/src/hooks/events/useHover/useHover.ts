import { useState, useEffect, useRef } from 'react'
import { off, on } from '../../../utils'

function useHover() {
  const [value, setValue] = useState(false)
  const ref = useRef(null)
  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    on(node, 'mouseover', handleMouseOver)
    on(node, 'mouseout', handleMouseOut)

    return () => {
      off(node, 'mouseover', handleMouseOver)
      off(node, 'mouseout', handleMouseOut)
    }
  }, [ref.current])

  return [ref, value]
}

export { useHover }
