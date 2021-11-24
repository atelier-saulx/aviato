import { IconName } from '../../../icons'
import {
  DataEventHandler,
  Data,
  ExportData,
  File,
  Children,
} from '../../../types'
import {
  HeaderProps,
  FooterProps,
  SequenceitemProps,
  OptionsComponentProps,
} from '../types'
import { ComponentType } from 'react'

export type FlowProps = {
  indicator?: boolean
  onDropData?: DataEventHandler
  onDropFile?: DataEventHandler
  onDrop?: DataEventHandler<
    | { data: Data[]; targetIndex: number; targetData: Data }
    | { files: File[]; targetIndex: number; targetData: Data }
  > // i think this is an order change - if this is not there dont allow order change
  onDropSequence?: DataEventHandler<
    | { data: Data[]; targetIndex: number }
    | { files: File[]; targetIndex: number }
  > // i think this is an order change - if this is not there dont allow order change
  paddingRight?: number
  paddingLeft?: number
  sequenceSpacing?: number
  paddingTop?: number
  expandable?: boolean
  defaultIsExpanded?: boolean
  paddingBottom?: number
  width?: number
  items: Object[]
  draggable?: boolean
  Actions?: ComponentType<OptionsComponentProps>
  itemProps?: SequenceitemProps
  onClick?: DataEventHandler
  actionIcon?: IconName
  onAction?: DataEventHandler
  footer?: FooterProps
  stepFooter?: FooterProps
  exportData?: ExportData
  exportDataSequence?: ExportData
  onOptions?: DataEventHandler // select options
  optionsIcon?: IconName
  contextualMenu?: boolean
  children?: Children<OptionsComponentProps>
  header?: HeaderProps
}
