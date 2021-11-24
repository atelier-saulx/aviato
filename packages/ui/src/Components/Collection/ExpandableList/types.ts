import { IconName } from '../../../icons'
import { DataEventHandler, Data, Children } from '../../../types'
import {
  HeaderProps,
  ExpandableListItemProps,
  OptionsComponentProps,
} from '../types'
import { CSSProperties } from 'react'

export type ExpandableListProps = {
  className?: string
  itemProps?: ExpandableListItemProps
  items: any[]
  header?: HeaderProps
  optionsIcon?: IconName
  contextualMenu?: boolean
  framed?: boolean
  onClick?: DataEventHandler
  paddingRight?: number
  paddingLeft?: number
  isNested?: (data: Data) => boolean
  paddingTop?: number
  paddingBottom?: number
  paddingItemLeft?: number
  onOptions?: DataEventHandler
  children?: Children<{ data: Data<any> }>
  style?: CSSProperties
  options?: {
    children?: Children<OptionsComponentProps>
  }
  autoSize?: boolean
}
