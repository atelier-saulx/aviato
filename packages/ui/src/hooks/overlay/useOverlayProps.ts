import React, {
  useState,
  RefObject,
  useContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useMemo,
} from 'react'

import { deepEqual } from '@saulx/utils'

import isComponent from '../../util/isComponent'

export class OverlayCtx<P> {
  public props: PropsWithChildren<P>

  public timer: NodeJS.Timeout

  public update(props: PropsWithChildren<P>) {
    const children = props.children
    if (deepEqual(children, this.props && this.props.children)) {
      if (
        this.props &&
        this.props.children &&
        isComponent(this.props.children)
      ) {
        if (children.toString() === this.props.children.toString()) {
          props.children = this.props.children
        }
      }
    }

    if (!deepEqual(this.props, props)) {
      this.props = props
      global.requestAnimationFrame(() => {
        this.listeners.forEach((v) => {
          v(props)
        })
      })
    }
  }

  public merge(props: Object) {
    this.props = { ...this.props, ...props }
    global.requestAnimationFrame(() => {
      this.listeners.forEach((v) => {
        v(this.props)
      })
    })
  }

  public listeners: Set<(props: PropsWithChildren<P>) => void> = new Set()
}

const def: RefObject<OverlayCtx<any>> = { current: new OverlayCtx() }
export const OverlayContext = React.createContext(def)

export function createOverlayContextRef<P>(
  props: PropsWithChildren<P>
): RefObject<OverlayCtx<P>> {
  const ctx: RefObject<OverlayCtx<P>> = useRef(
    useMemo(() => {
      return new OverlayCtx()
    }, [])
  )
  if (props) {
    ctx.current.update(props)
  }
  return ctx
}

type Props = PropsWithChildren<any>

export default function useOverlayProps<P = Props>(p?: P): P {
  const ctx = useContext(OverlayContext)
  if (!ctx || !ctx.current) {
    throw new Error(
      'Cannot useOverlayProps outside of an overlay (missing overlay context)'
    )
  }
  const [props, update] = useState(ctx.current.props)
  useEffect(() => {
    ctx.current.listeners.add(update)
    return () => {
      ctx.current.listeners.delete(update)
    }
  }, [update])
  if (p) {
    return { ...p, ...props }
  }
  return props
}
