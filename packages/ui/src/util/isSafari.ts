export default (): boolean => {
  const isSafari = global.safari !== undefined
  return isSafari
}
