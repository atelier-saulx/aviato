import React, { FunctionComponent, useEffect, useReducer } from 'react'

type ForceUpdateProps = {
  refs: any[]
}

const reducer = (x) => !x

const ForceUpdater: FunctionComponent<ForceUpdateProps> = ({
  children,
  refs,
}) => {
  const [v, toggle] = useReducer(reducer, null)
  useEffect(() => {
    toggle()
    global.requestAnimationFrame(toggle)
  }, refs)
  return <>{v ? null : children}</>
}

export { ForceUpdater }
