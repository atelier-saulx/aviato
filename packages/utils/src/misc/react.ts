import {
  ComponentType,
  Component,
  Children,
  JSXElementConstructor,
  ReactNode,
  ReactElement,
} from 'react'

export const isComponent = (children: any): children is ComponentType => {
  return typeof children === 'function' || children instanceof Component
}

export function filterChildrenByType(
  children: ReactNode,
  type: JSXElementConstructor<any> | JSXElementConstructor<any>[]
) {
  return (Children.toArray(children) as ReactElement[]).filter((item) => {
    return Array.isArray(type)
      ? type.some((component) => component === item.type)
      : item.type === type
  })
}
