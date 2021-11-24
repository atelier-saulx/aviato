import isSafari from '../../util/isSafari'

const setData = (t?: Element) => {
  if (t) {
    t.setAttribute('data-dragscroll', 'true')
  }
}

export default isSafari
  ? (isReactWindow?: boolean) => {
      if (isReactWindow) {
        return {
          outerRef: setData,
        }
      }

      return {
        dataDragscroll: true,
      }
    }
  : () => {}
