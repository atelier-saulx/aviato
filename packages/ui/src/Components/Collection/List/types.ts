import { IconName } from '../../../icons'
import {
  DataEventHandler,
  Data,
  ExportData,
  File,
  Children,
} from '../../../types'
import {
  CollectionitemProps,
  HeaderProps,
  FooterProps,
  OptionsComponentProps,
} from '../types'
import { ComponentType } from 'react'

export type ListProps = {
  header?: HeaderProps
  footer?: FooterProps
  items?: Object[]
  forceActive?: boolean
  exportData?: ExportData
  onDrop?: DataEventHandler<
    | { data: Data[]; targetIndex?: number }
    | { files: File[]; targetIndex?: number }
  >
  onClick?: DataEventHandler
  Actions?: ComponentType<OptionsComponentProps>
  paddingRight?: number
  paddingLeft?: number
  paddingTop?: number
  paddingBottom?: number
  activeId?: string | number
  isActive?: (data: Data) => boolean
  framed?: boolean
  optionsIcon?: IconName
  contextualMenu?: boolean
  onOptions?: DataEventHandler
  children?: Children<OptionsComponentProps>
  actionIcon?: IconName
  onAction?: DataEventHandler
  itemProps?: CollectionitemProps
  draggable?: boolean
  showIndex?: boolean
}
