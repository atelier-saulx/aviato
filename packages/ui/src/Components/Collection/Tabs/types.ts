import { TextValue } from '../../../textParser'
import { Color } from '../../../theme'
import { CSSProperties } from 'react'
import { DataEventHandler, OnValueChange } from '../../../types'

type TabSize = { width: number; x: number }
export type TabSizes = TabSize[]
type TabConfig = {
  title: TextValue
  onClick?: DataEventHandler
  to?: string
  border?: boolean
}
export type TabProps = {
  tab: TabConfig
  onClick?: DataEventHandler // TODO
  activeTab: number
  index: number
  tabSizes: TabSizes
  indicatorMargin?: number
  noIndicator?: boolean
}
export type TabsProps = {
  onChange?: OnValueChange // TODO
  active?: number
  tabs: TabConfig[]
  style?: CSSProperties
  noIndicator?: boolean
  noBorder?: boolean
  indicatorMargin?: number
  color?: Color
}
