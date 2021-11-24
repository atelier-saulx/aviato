import React, {
  ReactChildren,
  ReactChild,
  ReactText,
  PropsWithChildren,
} from 'react'
import { Children } from '../types'
import isComponent from './isComponent'

export type Child = ReactChild | ReactChildren | ReactText | ReactText[]

function renderChildren<T = PropsWithChildren<any>>(
  children: Children,
  props?: T
): Child {
  if (children === undefined) {
    return null
  }

  const Component = isComponent(children) ? children : null
  return Component ? <Component {...props} /> : (children as Child)
}

export default renderChildren
