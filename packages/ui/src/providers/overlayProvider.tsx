import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { getRandomId } from '@aviato/utils'
import { Backdrop } from '~/components'

// TODO: Find best way to infer prop typings

interface BaseOverlayProps {
  onClose: (id: number) => void
}

interface OverlayItem<T extends BaseOverlayProps> {
  id: number
  children: ReactNode
  props: T
}

interface OverlayType<T extends BaseOverlayProps> {
  open: (children: ReactNode, props?: T) => void
  close: (id: number) => void
  closeAll: () => void
  useCount: () => number
}

function CreateOverlayContext<T extends BaseOverlayProps>(): React.Context<
  OverlayType<T>
> {
  return createContext<OverlayType<T>>({
    open: () => {},
    close: () => {},
    closeAll: () => {},
    useCount: () => 0,
  })
}

const OverlayContext = CreateOverlayContext()

export function useOverlay<T extends BaseOverlayProps>(): OverlayType<T> {
  return useContext(OverlayContext)
}

export const OverlayProvider: FunctionComponent = ({ children }) => {
  const [count, setCount] = useState(0)

  const overlaysRef = useRef<OverlayItem<any>[]>()
  const overlayRef = useRef<OverlayType<any>>()

  if (!overlayRef.current) {
    let overlayCount = 0

    const listeners = new Set([setCount])

    const update = (length) => {
      listeners.forEach((fn) => fn(length))
    }

    const OverlayInstance = () => {}

    OverlayInstance.open = (children: ReactNode, props?: BaseOverlayProps) => {
      const id = overlayCount++

      update(() => {
        overlaysRef.current.push({
          id,
          children,
          props,
        })
      })

      return id
    }

    OverlayInstance.close = (id: number) => {
      const predicate = ({ id: ModalId }) => ModalId === id
      const modalIndex = overlaysRef.current.findIndex(predicate)

      if (modalIndex !== -1) {
        overlaysRef.current.splice(modalIndex, 1)
        update(overlaysRef.current.length)
      }
    }

    OverlayInstance.closeAll = () => {
      overlaysRef.current = []
      update(0)
    }

    OverlayInstance.useCount = () => {
      const [state, setState] = useState(count)

      useEffect(() => {
        listeners.add(setState)

        return () => {
          listeners.delete(setState)
        }
      }, [])

      return state
    }

    overlaysRef.current = []
    overlayRef.current = OverlayInstance
  }

  const overlays = overlaysRef.current.map((properties) => {
    const { id, children } = properties

    const randomId = getRandomId()

    return (
      <Backdrop
        key={`Overlay-${id}-${randomId}`}
        css={{
          position: 'fixed',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        {children}
      </Backdrop>
    )
  })

  return (
    <OverlayContext.Provider value={overlayRef.current}>
      {children}
      {overlays}
    </OverlayContext.Provider>
  )
}

OverlayProvider.displayName = 'OverlayProvider'
