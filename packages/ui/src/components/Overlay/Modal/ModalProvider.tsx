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

type ModalPartialProps = Partial<ModalProps>

interface ModalItem {
  id: number
  children: ReactNode
  props: ModalPartialProps
}

interface ModalType {
  open: (children: ReactNode, props?: ModalPartialProps) => void
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

  const modalsRef = useRef<ModalItem[]>()
  const modalRef = useRef<ModalType>()

  if (!modalRef.current) {
    let ModalCount = 0

    const listeners = new Set([setCount])

    const update = (length) => {
      listeners.forEach((fn) => fn(length))
    }

    const Modal = () => {}

    Modal.open = (children: ReactNode, props: ModalPartialProps) => {
      const id = ModalCount++

      update(
        modalsRef.current.push({
          id,
          children,
          props,
        })
      )

      return id
    }

    Modal.close = (id: number) => {
      const ModalIndex = modalsRef.current.findIndex(
        ({ id: ModalId }) => ModalId === id
      )

      if (ModalIndex !== -1) {
        modalsRef.current.splice(ModalIndex, 1)
        update(modalsRef.current.length)
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

    modalsRef.current = []
    modalRef.current = Modal
  }

  const Modals = modalsRef.current.map(({ id, children, props }, index) => {
    return (
      <Modal
        {...props}
        isOpen
        onClose={() => modalRef.current.close(id)}
        key={`Modal${id}${index}`}
      >
        {children}
      </Modal>
    )
  })

  return (
    <ModalContext.Provider value={modalRef.current}>
      {children}
      {Modals}
    </ModalContext.Provider>
  )
}

ModalProvider.displayName = 'ModalProvider'
