import { useCallback, EventHandler, SyntheticEvent } from 'react'

export type ContextualMenuEvent = {
  onClick: EventHandler<SyntheticEvent>
  onContextMenu: EventHandler<SyntheticEvent>
}

const useContextualMenu = (fn: EventHandler<SyntheticEvent>) => {
  const eventHandler = useCallback((e) => {
    if (e.type === 'contextmenu') {
      e.preventDefault()

      // make this cleaner
      // special value to override using current target in overlay
      e.currentTarget.rect = {
        x: e.pageX,
        y: e.pageY,
        width: 0,
        height: 0,
      }
      fn(e)
    }
  }, [])
  return {
    onClick: eventHandler,
    onContextMenu: eventHandler,
  }
}

export default useContextualMenu
