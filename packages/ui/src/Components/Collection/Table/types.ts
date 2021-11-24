import { IconName } from '../../../icons'
import {
  DataEventHandler,
  ExportData,
  File,
  Data,
  OnValueChange,
} from '../../../types'
import { FunctionComponent } from 'react'
import { TableitemProps, OptionsComponentProps } from '../types'

export type FieldsViewUpdate = {
  sort?: { field: number; order: 'desc' | 'asc' }
  filter?: string
}

export type TableProps = {
  draggable?: boolean
  itemProps: TableitemProps
  large?: boolean
  paddingLeft?: number
  paddingRight?: number
  items?: Object[]
  onScroll?: (e: { scrollOffset: number }, height: number) => void
  forceActive?: boolean
  exportData?: ExportData
  onOptions?: DataEventHandler // select options
  onDrop?: DataEventHandler<
    | { data: Data[]; targetIndex?: number }
    | { files: File[]; targetIndex?: number }
  >
  onClick?: DataEventHandler // on click on the item
  activeId?: string | number
  optionsIcon?: IconName
  contextualMenu?: boolean
  Options?: FunctionComponent<OptionsComponentProps>
  actionIcon?: IconName
  onChange?: OnValueChange<FieldsViewUpdate>
  onAction?: DataEventHandler
}
