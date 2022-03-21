const replacements = {
  'background-1-1': 'var(--colors-Background0dp)',
  'background-2-1': 'lightgrey',
  'divider-1-1': 'var(--colors-divider)',
  'foreground-2-0.15': 'grey',
  'foreground-3-1': 'purple',
  'foreground-1-0': 'orange',
  'primary-1-1': 'var(--colors-PrimaryMain)',
}

export const useColor = (a) => {
  const { color, tone = 1, opacity = 1 } = a
  const k = `${color}-${tone}-${opacity}`

  if (!replacements[k]) {
    console.error('COME ON USECOLOR WRONG!', k)
    return 'red'
  }

  return replacements[k]
}
