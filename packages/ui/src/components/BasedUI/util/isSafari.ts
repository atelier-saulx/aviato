export default (): boolean => {
  // @ts-ignore
  const isSafari = typeof safari !== undefined
  return isSafari
}
