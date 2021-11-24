import {
  useState,
  useCallback,
  useRef,
  DragEventHandler,
  DragEvent,
} from 'react'
import { clearSelection, getSelection } from '../../useSelect'
import readFiles from './readFiles'
import { Data, File } from '../../../types'
import { deepEqual } from '@saulx/utils'

const preventDefault = (event) => event.preventDefault()

type DropEventHandler = (
  e: DragEvent,
  parsedData: { files?: File[]; data?: Data[] }
) => void

type DropEvents = {
  onDragEnter: DragEventHandler
  onDragOver: DragEventHandler
  onDrop: DragEventHandler
  onDragLeave: DragEventHandler
}

// add import resolve etc
type DropProps = {
  validate?: (e?: DragEvent) => boolean
  readFiles?: boolean
}

const defValidate = () => true

const useDrop = (
  onDrop?: DropEventHandler,
  props: DropProps = {}
): [DropEvents, boolean, boolean] => {
  const [isDragOver, setDragOver] = useState(false)
  const dragRef = useRef(null)
  const dropRef = useRef(null)

  const [isDropLoading, setDropLoading] = useState(false)

  if (!props.validate) {
    props.validate = defValidate
  }

  const handleOnDrop = useCallback(
    (event) => {
      if (dropRef.current === event.nativeEvent) {
        return // do nothing
      }

      event.preventDefault()

      const nativeEvent = event.nativeEvent
      dropRef.current = nativeEvent
      const baseTarget = event.target

      if (props.validate(event)) {
        dragRef.current = 0
        setDragOver(false)

        if (onDrop) {
          const dataTransfer = event.dataTransfer.getData('application/based')

          let parsedData: Data
          let data: Data[]

          if (dataTransfer) {
            parsedData = JSON.parse(dataTransfer)
            const targetSelection = getSelection()

            const useSelection = targetSelection.find((selectionData) =>
              deepEqual(selectionData.data, parsedData.data)
            )

            if (useSelection) {
              data = targetSelection

              clearSelection()
            } else {
              data = [parsedData]
            }
          }

          let promise
          setDropLoading(true)

          if (props.readFiles) {
            event.stopPropagation()
            readFiles(event.dataTransfer).then((files) => {
              if (data) {
                promise = onDrop(event, { files, data })
              } else {
                promise = onDrop(event, { files })
              }

              if (promise instanceof Promise) {
                promise.then(() => {
                  setDropLoading(false)
                  global.requestAnimationFrame(() => {
                    baseTarget.dispatchEvent(nativeEvent)
                  })
                })
              } else {
                setDropLoading(false)
                global.requestAnimationFrame(() => {
                  baseTarget.dispatchEvent(nativeEvent)
                })
              }
            })
          } else {
            if (data) {
              promise = onDrop(event, { data, files: [] })
            } else {
              promise = onDrop(event, { files: [] })
            }
            if (promise instanceof Promise) {
              event.stopPropagation()
              promise.then(() => {
                setDropLoading(false)
                global.requestAnimationFrame(() => {
                  baseTarget.dispatchEvent(nativeEvent)
                })
              })
            } else {
              setDropLoading(false)
            }
          }
        }
      }
    },
    [onDrop]
  )

  return [
    {
      onDragEnter: useCallback((event) => {
        if (!dragRef.current) {
          dragRef.current = 0
        }
        dragRef.current++
        if (props.validate(event)) {
          setDragOver(true)
        }
      }, []),

      onDragLeave: useCallback(() => {
        dragRef.current--
        if (dragRef.current === 0) {
          setDragOver(false)
        }
      }, []),

      onDragOver: preventDefault,
      onDrop: handleOnDrop,
    },
    isDragOver,
    isDropLoading,
  ]
}

export default useDrop
