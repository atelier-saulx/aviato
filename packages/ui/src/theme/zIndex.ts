type ZIndex = 'Background' | 'Application' | 'Modal' | 'Popover' | 'Overlay'

const zIndexLandscape: { [key in ZIndex]: number } = {
  Background: 0,
  Application: 100,
  Modal: 200,
  Popover: 300,
  Overlay: 400,
}

export function getZIndex(level: ZIndex) {
  return zIndexLandscape[level]
}
