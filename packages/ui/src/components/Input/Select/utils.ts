import { SelectItem } from './types'

interface GroupData {
  data: { group?: string }[]
}

export function groupOptions({ data }: GroupData) {
  const sortedData = []
  const unGroupedData = []
  const groupedData = data.reduce((acc, item, index) => {
    if (item.group) {
      if (acc[item.group]) acc[item.group].push(index)
      else acc[item.group] = [index]
    } else {
      unGroupedData.push(index)
    }
    return acc
  }, {})

  Object.keys(groupedData).forEach((groupName) => {
    sortedData.push(...groupedData[groupName].map((index) => data[index]))
  })

  sortedData.push(...unGroupedData.map((itemIndex) => data[itemIndex]))

  return sortedData
}

interface FilterData {
  data: SelectItem[]
  limit: number
  searchable: boolean
  searchValue: string
  filter(value: string, item: SelectItem): boolean
}

export function filterData({
  data,
  searchable,
  limit,
  searchValue,
  filter,
}: FilterData) {
  if (!searchable) {
    return data
  }

  const result = []

  for (let i = 0; i < data.length; i += 1) {
    if (filter(searchValue, data[i])) {
      result.push(data[i])
    }

    if (result.length >= limit) {
      break
    }
  }

  return result
}

export function defaultFilter(value: string, item: SelectItem) {
  return item.label.toLowerCase().trim().includes(value.toLowerCase().trim())
}
