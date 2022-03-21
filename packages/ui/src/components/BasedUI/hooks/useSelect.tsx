import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  useEffect,
  EventHandler,
  SyntheticEvent,
} from 'react'
import { Data } from '../types'

const addListeners = () => {
  document.addEventListener('click', (event) => {
    if (!event.shiftKey) {
      clearSelection()
    }
  })
  document.addEventListener('keyup', (event) => {
    if (event.code === 'Esc' || event.keyCode === 27) {
      clearSelection()
    }
  })
}

if (typeof window !== 'undefined') {
  addListeners()
}

export type SelectableContext<T> = {
  data: Data<T>[]
  children: { [key: string]: (...args: any[]) => void }
  selection: Set<Data<T>>
}

const defaultContext: SelectableContext<{}> = {
  data: [],
  children: {},
  selection: new Set(),
}

export const SelectionContext = createContext(defaultContext)
SelectionContext.displayName = 'SelectionContext'

export const SelectableCollection = ({ children, items }) => {
  return (
    <SelectionContext.Provider
      value={{
        data: items,
        children: {},
        selection: new Set(),
      }}
    >
      {children}
    </SelectionContext.Provider>
  )
}

export const selection: Map<Data, any[]> = new Map()

export const getSelection = () => {
  return [...selection.keys()]
}

const selectListeners: Set<(selection: any) => void> = new Set()

export const useSelection = () => {
  const [selection, setSelection] = useState(getSelection())

  useEffect(() => {
    const listener = (selection) => {
      setSelection(selection)
    }

    selectListeners.add(listener)

    return () => {
      selectListeners.delete(listener)
    }
  }, [])

  return selection
}

export const clearSelection = () => {
  let doit = false

  selection.forEach((childSelection, data) => {
    if (childSelection.length > 2) {
      for (let i = 0; i < childSelection.length - 1; i += 2) {
        const selectionContext = childSelection[i]
        const index = childSelection[i + 1]
        if (selectionContext) {
          // find with the id
          selectionContext.selection.delete(data)
          doit = true

          if (selectionContext.children[index]) {
            selectionContext.children[index](false)
          }
        }
      }
    } else {
      const selectionContext = childSelection[0]
      const index = childSelection[1]
      if (selectionContext) {
        doit = true
        if (selectionContext.children[index]) {
          selectionContext.children[index](false)
        }
      }
    }

    selection.delete(data)
  })

  if (doit) {
    const targetSelection = getSelection()
    selectListeners.forEach((fn) => fn(targetSelection))
  }
}

export const useClick = (
  onClick: EventHandler<SyntheticEvent>,
  refs: any[] = []
) => {
  return useCallback((event) => {
    if (!event.shiftKey) {
      onClick(event)
    }
  }, refs)
}

type SelectEvents = {
  onMouseDown: EventHandler<SyntheticEvent>
}

export function useSelect<T = any>(data: Data<T>): [SelectEvents, boolean] {
  const selectionContext = useContext(SelectionContext)

  let isSelected
  let setSelected

  if (selectionContext) {
    ;[isSelected, setSelected] = useState(selectionContext.selection.has(data))
    selectionContext.children[data.index] = setSelected

    useEffect(() => {
      return () => {
        delete selectionContext.children[data.index]
      }
    }, [])
  } else {
    ;[isSelected, setSelected] = useState(false)
  }

  const handleMouseDown = useCallback(
    (event) => {
      if (!event.shiftKey) {
        return
      }

      const targetSelection = selection.get(data)

      if (data.data.id) {
        selection.forEach((value, key) => {
          if (targetSelection !== value) {
            if (key.data.id === data.data.id) {
              console.info('delete')
              selection.delete(key)
            }
          }
        })
      }

      if (isSelected) {
        setSelected(false)
        if (targetSelection && targetSelection.length > 2) {
          for (let index = 0; index < targetSelection.length - 1; index += 2) {
            if (targetSelection[index] === selectionContext) {
              targetSelection.splice(index, 2)
            }
          }
        } else {
          selection.delete(data)
          selection.forEach((v, key) => {
            if (key.data.id === data.data.id) {
              selection.delete(key)
            }
          })
        }
        if (selectionContext) {
          selectionContext.selection.delete(data)
          if (data.data.id) {
            selectionContext.selection.forEach((selectionData) => {
              if (selectionData.data.id === data.data.id) {
                selectionContext.selection.delete(selectionData)
              }
            })
          }
        }
      } else {
        if (targetSelection) {
          if (!targetSelection.find((v) => v === selectionContext)) {
            targetSelection.push(selectionContext, data.index)
          }
        } else {
          selection.set(data, [selectionContext, data.index])
        }

        if (selectionContext) {
          selectionContext.selection.add(data)

          // Needs to be improved!
          selectionContext.selection.forEach((data) => {
            const targetSelection = selection.get(data)

            if (!targetSelection) {
              console.warn('Cannot find selection and it exists on context')
              if (data.data.id) {
                const x = {}
                selection.forEach((value, key) => {
                  if (!x[key.data.id]) {
                    x[key.data.id] = 1
                  } else {
                    selection.delete(key)
                  }
                })
              }
              return
            }

            const nIndex = targetSelection[1]
            if (nIndex > data.index) {
              for (let index = data.index + 1; index < nIndex; index++) {
                const newItemData = {
                  index: index,
                  data: selectionContext.data[index],
                }
                selectionContext.selection.add(newItemData)
                selection.set(newItemData, [selectionContext, index])
                if (selectionContext.children[index]) {
                  selectionContext.children[index](true)
                }
              }
            } else if (nIndex < data.index) {
              for (let index = data.index - 1; index > nIndex; index--) {
                const newItemData = {
                  index: index,
                  data: selectionContext.data[index],
                }

                selectionContext.selection.add(newItemData)
                selection.set(newItemData, [selectionContext, index])
                if (selectionContext.children[index]) {
                  selectionContext.children[index](true)
                }
              }
            }
          })
        }

        if (data.data.id) {
          const x = {}
          selection.forEach((value, key) => {
            if (!x[key.data.id]) {
              x[key.data.id] = 1
            } else {
              selection.delete(key)
            }
          })
        }

        setSelected(true)
      }

      if (selectListeners.size > 0) {
        const targetSelection = getSelection()
        selectListeners.forEach((fn) => fn(targetSelection))
      }
    },
    [isSelected, data]
  )

  return [
    {
      onMouseDown: handleMouseDown,
    },
    isSelected,
  ]
}
