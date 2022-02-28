export type VariationPlacement =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end'

export type BasePosition = 'top' | 'bottom' | 'left' | 'right'
export type BasePlacement = 'start' | 'center' | 'end'
export type AutoPlacement = 'auto' | 'auto-start' | 'auto-end'
export type ComputedPlacement = VariationPlacement | BasePosition
export type Placement = AutoPlacement | BasePosition | VariationPlacement
