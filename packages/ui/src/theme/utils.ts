type ClassName = {
  [key: string]: boolean
}

export function classNames(classes: ClassName) {
  return Object.entries(classes)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ')
}
