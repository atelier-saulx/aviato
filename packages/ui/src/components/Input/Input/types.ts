export type InputVariant = 'outlined' | 'filled' | 'unstyled'

export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'search'
  | 'tel'
  | 'url'
  | 'number'

export interface SelectItem {
  value: string
  label?: string
  disabled?: boolean
  group?: string
  [key: string]: any
}
