type GetChangeValue = {
  value: number
  containerWidth?: number
  min: number
  max: number
  step: number
}

export function getChangeValue({
  value,
  containerWidth,
  min,
  max,
  step,
}: GetChangeValue) {
  const left = !containerWidth
    ? value
    : Math.min(Math.max(value, 0), containerWidth) / containerWidth

  const deltaX = left * (max - min)

  return (deltaX !== 0 ? Math.round(deltaX / step) * step : 0) + min
}
