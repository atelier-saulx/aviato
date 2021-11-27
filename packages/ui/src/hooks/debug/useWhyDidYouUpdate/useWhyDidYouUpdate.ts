import { log } from '@aviato/utils'
import { useEffect, useRef } from 'react'

export type IProps = Record<string, any>

function useWhyDidYouUpdate(componentName: string, props: IProps) {
  const prevProps = useRef<IProps>({})

  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props })
      const changedProps: IProps = {}

      allKeys.forEach((key) => {
        if (prevProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          }
        }
      })

      if (Object.keys(changedProps).length) {
        log.global.debug('[why-did-you-update]', componentName, changedProps)
      }
    }

    prevProps.current = props
  })
}

export { useWhyDidYouUpdate }
