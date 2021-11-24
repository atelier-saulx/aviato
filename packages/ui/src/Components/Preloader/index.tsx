import React, {
  useState,
  useEffect,
  FunctionComponent,
  useReducer,
} from 'react'
import { useColor } from '../../theme'
import { Loader } from '../Loader/Loader'

export type PreloadProps = {
  refs?: any[]
  loading: boolean
}
const reducer = (x) => !x

export const Preloader: FunctionComponent<PreloadProps> = ({
  loading = false,
  refs = [],
  children,
}) => {
  const [sw, setSw] = useState(false)
  const [fontLoaded, setFontLoaded] = useState(false)
  const [remove, setRemove] = useState(false)
  const [v, toggle] = useReducer(reducer, null)

  if (refs.length) {
    useEffect(() => {
      setRemove(false)
      setSw(true)
      toggle()
      global.requestAnimationFrame(toggle)
      setTimeout(() => {
        setSw(false)
      }, 200)
      const timer = setTimeout(() => {
        setRemove(true)
      }, 1050)
      return () => {
        clearTimeout(timer)
      }
    }, refs)
  }

  useEffect(() => {
    let frame = global.requestAnimationFrame(() => {
      if (global.document.fonts && global.document.fonts.ready) {
        document.fonts.ready.then(() => {
          setFontLoaded(true)
        })
      } else {
        // fallback to canvas check (ie11)
        frame = global.requestAnimationFrame(() => {
          setFontLoaded(true)
        })
      }
    })
    return () => {
      global.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (fontLoaded && loading === false) {
      timer = setTimeout(() => {
        setRemove(true)
      }, 750)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [fontLoaded, loading])

  return (
    <>
      {v ? null : children}
      {remove ? null : (
        <div
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            opacity: fontLoaded && !loading && !sw ? 0 : 1,
            transition: 'opacity 0.75s',
            right: 0,
            backgroundColor: useColor({ color: 'background' }),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader fadeIn delay={1200} size={24} />
        </div>
      )}
    </>
  )
}
