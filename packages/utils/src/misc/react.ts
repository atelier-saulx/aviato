import { ComponentType, Component } from 'react'

const isComponent = (children: any): children is ComponentType => {
  return typeof children === 'function' || children instanceof Component
}

export { isComponent }
