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
  closeAll: () => void
  useCount: () => number
}

export const ModalContext = createContext<ModalType>({
  open: () => {},
  close: () => {},
  closeAll: () => {},
  useCount: () => 0,
})

export const useModal: () => ModalType = () => {
  return useContext(ModalContext)
}

export const ModalProvider: FunctionComponent = ({ children }) => {
  const [count, setCount] = useState(0)

  const modalsRef = useRef<ModalItem[]>()
  const modalRef = useRef<ModalType>()

  if (!modalRef.current) {
    let modalCount = 0

    const listeners = new Set([setCount])

    const update = (length) => {
      listeners.forEach((fn) => fn(length))
    }

    const ModalInstance = () => {}

    ModalInstance.open = (children: ReactNode, props: ModalPartialProps) => {
      const id = modalCount++

      update(() => {
        modalsRef.current.push({
          id,
          children,
          props,
        })
      })

      return id
    }

    ModalInstance.close = (id: number) => {
      const predicate = ({ id: ModalId }) => ModalId === id
      const modalIndex = modalsRef.current.findIndex(predicate)

      if (modalIndex !== -1) {
        modalsRef.current.splice(modalIndex, 1)
        update(modalsRef.current.length)
      }
    }

    ModalInstance.closeAll = () => {
      modalsRef.current = []
      update(0)
    }

    ModalInstance.useCount = () => {
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
    modalRef.current = ModalInstance
  }

  const modals = modalsRef.current.map((properties) => {
    const { id, children, props } = properties

    const randomId = getRandomId()

    const TargetModal = React.memo(() => {
      const onClose = () => {
        modalRef.current.close(id)
      }

      return (
        <Modal {...props} isOpen onClose={onClose}>
          {children}
        </Modal>
      )
    })

    return <TargetModal key={`Modal-${id}-${randomId}`} />
  })

  return (
    <ModalContext.Provider value={modalRef.current}>
      {children}
      {modals}
    </ModalContext.Provider>
  )
}

ModalProvider.displayName = 'ModalProvider'
