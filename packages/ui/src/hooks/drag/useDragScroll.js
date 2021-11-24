// import isSafari from '../util/isSafari'
const isSafari = false // TODO: temp

const setData = (t) => {
  if (t) {
    t.setAttribute('data-dragscroll', true)
  }
}

export default isSafari
  ? (isReactWindow) => {
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
