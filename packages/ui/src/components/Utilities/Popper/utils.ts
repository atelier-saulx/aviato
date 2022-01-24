export function flipPlacement(
  placement: 'start' | 'center' | 'end',
  dir: 'ltr' | 'rtl'
) {
  if (placement === 'center') {
    return placement
  }

  if (dir === 'rtl') {
    if (placement === 'end') {
      return 'start'
    }

    return 'end'
  }

  return placement
}

export function flipPosition(
  position: 'top' | 'left' | 'bottom' | 'right',
  dir: 'ltr' | 'rtl'
) {
  if (position === 'top' || position === 'bottom') {
    return position
  }

  if (dir === 'rtl') {
    if (position === 'left') {
      return 'right'
    }

    return 'left'
  }

  return position
}

export function parsePopperPosition(position: string) {
  if (typeof position !== 'string') {
    return { position: 'top', placement: 'center' }
  }

  const splitted = position.split('-')

  if (splitted.length === 1) {
    return { position, placement: 'center' }
  }

  return { position: splitted[0], placement: splitted[1] }
}
