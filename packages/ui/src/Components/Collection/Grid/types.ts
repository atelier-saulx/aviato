import { IconName } from '../../../icons'
import { DataEventHandler, ExportData, File, Data } from '../../../types'
import {
  HeaderProps,
  CollectionitemProps,
  OptionsComponentProps,
  FooterProps,
} from '../types'
import { ComponentType } from 'react'

export type GridProps = {
  header?: HeaderProps
  footer?: FooterProps
  itemProps?: CollectionitemProps
  items: Object[]
  large?: boolean
  optionsIcon?: IconName | ComponentType<OptionsComponentProps>
  exportData?: ExportData
  onOptions?: DataEventHandler // select options
  onDrop?: DataEventHandler<
    | { data: Data[]; targetIndex?: number }
    | { files: File[]; targetIndex?: number }
  >
  onClick?: DataEventHandler // on click on the item
  framed?: boolean
  Graphic?: OptionsComponentProps
  activeId?: string | number
  forceActive?: boolean
  contextualMenu?: boolean
}
