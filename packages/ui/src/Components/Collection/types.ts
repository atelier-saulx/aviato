import { IconStyleProps, IconName } from '../../icons'
import { TextFormat, TextValue } from '../../textParser'
import {
  DataEventHandler,
  MultiDataEventHandler,
  Data,
  Children,
} from '../../types'
import { CSSProperties, PropsWithChildren } from 'react'
import { Color } from '../../theme'
import { AvatarProps } from '../Image/Avatar'

export type DataPath = (string | number)[]

export type ImgItemProps = {
  path: DataPath
  avatar?: boolean
  textPath?: DataPath
  color?: Color
  foregroundColor?: Color
  avatarProps?: AvatarProps
}

export type IconItemProps = IconStyleProps & {
  path?: DataPath
  mapObject?: { [key: string]: string }
}

export type TextItemProps = {
  format?: TextFormat
  weight?: 'semibold' | 'medium' | 'regular'
  path: DataPath
}

export type TableItemPropsField =
  | (TextItemProps & {
      type: 'text'
      label?: TextValue
      width?: number
      bold?: boolean
      sort?: 'asc' | 'desc' | undefined
      sortable?: 'asc' | 'desc'
    })
  | (TextItemProps & {
      type: 'number'
      label?: TextValue
      width?: number
      bold?: boolean
      sort?: 'asc' | 'desc' | undefined
      sortable?: 'asc' | 'desc'
    })
  | (ImgItemProps & {
      type: 'img'
      label?: TextValue
      width?: number
    })
  | (IconItemProps & { type: 'icon'; label?: TextValue; width?: number })

export type TableitemProps = {
  fields: TableItemPropsField[]
  id?: DataPath
}

export type CollectionitemProps = {
  title?: TextItemProps
  info?: TextItemProps
  img?: ImgItemProps
  icon?: IconItemProps
  id?: DataPath
  inActive?: DataPath
  text?: TextItemProps
}

export type SequenceitemProps = {
  title?: TextItemProps
  id?: DataPath
  img?: ImgItemProps
  icon?: IconItemProps
  items?: {
    path: DataPath
    props?: CollectionitemProps
  }
}

export type ExpandableListItemProps = {
  title?: TextItemProps
  id?: DataPath
  img?: ImgItemProps
  icon?: IconItemProps
}

export type ResultListItemProps = {
  title?: TextItemProps
  id?: DataPath
  img?: ImgItemProps
  icon?: IconItemProps
  value?: { path: DataPath }
  items?: {
    path: DataPath
    props?: ResultListItemProps // re-uses the top result list item
  }
}

export type FooterProps<T = any> = {
  label?: TextValue
  floating?: boolean
  framed?: boolean
  data?: Data<T>
  paddingRight?: number
  style?: CSSProperties
  width?: number
  icon?: IconName
  paddingLeft?: number
  items?: Object[]
  onClick: MultiDataEventHandler<Object> | DataEventHandler<Data<T>>
}

export type HeaderProps = {
  data?: Data<any>
  autoFocusTitle?: boolean
  indicator?: TextValue
  style?: CSSProperties
  onEditTitle?: (value: string, data?: Data<any>) => void
  label?: TextValue
  noBorderBottom?: boolean
  isHover?: boolean
  children?: Children<{ items?: Object[]; data?: Data<any> }>
  framed?: boolean
  paddingRight?: number
  width?: number | string
  icon?: IconName
  weight?: 'semibold' | 'regular' | 'medium'
  paddingLeft?: number
  items?: Object[]
  isExpanded?: boolean
  onExpand?: () => void
}

export type OptionsComponentProps = PropsWithChildren<{
  onClick?: DataEventHandler
  isHover: boolean
  isActive: boolean
  isDragging: boolean
  isDragOver: boolean
  isSelected: boolean
  items: Object[]
  data: Data
  onOptions?: DataEventHandler
}>
