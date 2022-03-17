import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Modal, ModalProps } from './Modal'

interface ModalItem {
  id: number
  children: ReactNode
  props: ModalProps
}

interface ModalType {
  open: (children: ReactNode, props?: ModalProps) => void
  close: (id: number) => void
  count: () => number
}

export const ModalContext = createContext<ModalType>({
  open: () => {},
  close: () => {},
  count: () => 0,
})

export const useModal: () => ModalType = () => {
  return useContext(ModalContext)
}

export const ModalProvider: FunctionComponent = ({ children }) => {
  const [count, setCount] = useState(0)

  const ModalsRef = useRef<ModalItem[]>()
  const ModalRef = useRef<ModalType>()

  if (!ModalRef.current) {
    let ModalCount = 0

    const listeners = new Set([setCount])

    const update = (length) => {
      listeners.forEach((fn) => fn(length))
    }

    const Modal = () => {}

    Modal.open = (children: ReactNode, props: ModalProps) => {
      const id = ModalCount++

      update(
        ModalsRef.current.push({
          id,
          children,
          props,
        })
      )

      return id
    }

    Modal.close = (id: number) => {
      const ModalIndex = ModalsRef.current.findIndex(
        ({ id: ModalId }) => ModalId === id
      )

      if (ModalIndex !== -1) {
        ModalsRef.current.splice(ModalIndex, 1)
        update(ModalsRef.current.length)
      }
    }

    Modal.count = () => {
      const [state, setState] = useState(count)

      useEffect(() => {
        listeners.add(setState)

        return () => {
          listeners.delete(setState)
        }
      }, [])

      return state
    }

    ModalsRef.current = []
    ModalRef.current = Modal
  }

  const Modals = ModalsRef.current.map(({ id, children, props }, index) => {
    return (
      <Modal
        {...props}
        isOpen
        onClose={() => ModalRef.current.close(id)}
        key={`Modal${id}${index}`}
      >
        {children}
      </Modal>
    )
  })

  return (
    <ModalContext.Provider value={ModalRef.current}>
      {children}
      {Modals}
    </ModalContext.Provider>
  )
}

ModalProvider.displayName = 'ModalProvider'
