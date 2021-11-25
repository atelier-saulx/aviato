import React, { FunctionComponent } from 'react'

export type ButtonProps = {
  text?: string
}

export const Button: FunctionComponent<ButtonProps> = ({ text, children }) => {
  return (
    <div>
      <button>{text ?? children}</button>
    </div>
  )
}
