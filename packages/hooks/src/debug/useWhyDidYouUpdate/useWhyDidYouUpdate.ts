import { useEffect, useRef } from 'react'

export type UpdateProps = Record<string, any>

/**
 * Reack hook to help developers troubleshoot what changes have caused component rerender.
 *
 * @param componentName - name of component
 * @param props - component properties
 */
function useWhyDidYouUpdate(componentName: string, props: UpdateProps) {
  const prevProps = useRef<UpdateProps>({})

  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props })
      const changedProps: UpdateProps = {}

      allKeys.forEach((key) => {
        if (prevProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          }
        }
      })

      if (Object.keys(changedProps).length) {
        console.warn('[why-did-you-update]', componentName, changedProps)
      }
    }

    prevProps.current = props
  })
}

export { useWhyDidYouUpdate }
