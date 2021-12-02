type ClassNames = {
  [key: string]: boolean
}

export function classNames(classes: ClassNames) {
  return Object.entries(classes)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ')
}
