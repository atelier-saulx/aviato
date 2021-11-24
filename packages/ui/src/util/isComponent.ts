import { ComponentType, Component } from 'react'

const isComponent = (children: any): children is ComponentType =>
  typeof children === 'function' || children instanceof Component

export default isComponent
