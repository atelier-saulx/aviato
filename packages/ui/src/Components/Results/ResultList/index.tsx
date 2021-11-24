import React, { CSSProperties, FunctionComponent } from 'react'
import { TextValue } from '../../../textParser'
import { Text } from '../../Text'
import { ExpandableList } from '../../Collection/ExpandableList'
import { ResultListItemProps } from '../../Collection/types'
import getData from '../../Collection/getData'

export type ResultListProps = {
  items: any[]
  itemProps?: ResultListItemProps
  label?: TextValue
  value?: TextValue
  style?: CSSProperties
}

const defaultItems: ResultListItemProps = {
  items: { path: ['items'] },
  title: { path: ['title'] },
  value: { path: ['value'] },
  id: ['id'],
}

const ExpandListNested = ({ data, itemProps }) => {
  const nestedItemProps =
    (itemProps.items && itemProps.items.props) || itemProps || defaultItems
  const items = getItems(data.data, itemProps)
  if (items.length) {
    return (
      <ExpandableList
        autoSize={false}
        paddingItemLeft={24}
        items={items}
        isNested={(data) => {
          const items = getItems(data.data, nestedItemProps)
          return items && items.length
        }}
        options={{
          children: ({ data }) => {
            const itemPropsD = itemProps || defaultItems
            let value
            if (!itemPropsD.value) {
              value = getData(data.data, defaultItems.value.path)
            } else {
              value = getData(data.data, itemPropsD.value.path)
            }
            return (
              <Text weight="medium">{{ value, format: 'number-short' }}</Text>
            )
          },
        }}
        itemProps={{
          items: itemProps.items || { path: ['items'], props: itemProps },
          ...nestedItemProps,
        }}
      >
        {/* @ts-ignore */}
        {ExpandListNested}
      </ExpandableList>
    )
  }

  // data time
  return null
  // return <ExpandableList />
}

const getItems = (data, itemProps) => {
  const itemPropsD = itemProps || defaultItems
  let items
  if (!itemPropsD.value) {
    items = getData(data, defaultItems.items.path)
  } else {
    items = getData(data, itemPropsD.items.path)
  }
  return items
}

const getTotal = (items: any[], itemProps: ResultListItemProps) => {
  const itemPropsD = itemProps || defaultItems
  let t = 0
  for (let i = 0; i < items.length; i++) {
    let value
    const data = items[i]
    if (!itemPropsD.value) {
      value = getData(data, defaultItems.value.path)
    } else {
      value = getData(data, itemPropsD.value.path)
    }
    t += value || 0
  }
  return t
}

const ResultList: FunctionComponent<ResultListProps> = ({
  items,
  itemProps,
  label,
  style,
  value,
}) => {
  const t = getTotal(items, itemProps)
  return (
    <ExpandableList
      style={style}
      items={items}
      itemProps={itemProps}
      header={
        label || value
          ? {
              weight: 'medium',
              label,
              children: value
                ? () => {
                    return <Text weight="medium">{value}</Text>
                  }
                : null,
            }
          : null
      }
      options={{
        children: ({ data }) => {
          const itemPropsD = itemProps || defaultItems
          let value
          if (!itemPropsD.value) {
            value = getData(data.data, defaultItems.value.path)
          } else {
            value = getData(data.data, itemPropsD.value.path)
          }
          return (
            <div
              style={{
                display: 'flex',
              }}
            >
              <Text weight="medium">{{ value, format: 'number-short' }}</Text>
              <Text
                weight="medium"
                style={{
                  marginLeft: 4,
                }}
                color={{ color: 'primary' }}
              >
                {`(${(((value || 0) / t) * 100).toFixed()}%)`}
              </Text>
            </div>
          )
        },
      }}
      isNested={(data) => {
        const items = getItems(data.data, itemProps)
        return !!items.length
      }}
    >
      {/* @ts-ignore */}
      {ExpandListNested}
    </ExpandableList>
  )
}

export { ResultList }
