import React from 'react'
import { useColor } from '../../../theme'
import { Text } from '../../Text'
import getData from '../getData'
import { Icon, IconProps, IconName, iconFromString } from '../../../icons'
import Avatar from '../../Image/Avatar'

const RowField = ({ field, data, isLarge }) => {
  let selectedData = getData(data, field.path)
  if (field.format) {
    selectedData = {
      value: selectedData,
      format: field.format,
    }
  }
  let avatarProps = data.avatarProps
  let Icon: Icon, iconProps: IconProps
  if (field.type === 'icon') {
    let iconName: IconName
    if (selectedData && typeof selectedData === 'object') {
      iconName = selectedData.name
      iconProps = selectedData
    } else if (selectedData) {
      iconName = selectedData
      iconProps = field
    }
    Icon = iconFromString(iconName)
  }

  return field.type === 'icon' ? (
    <div
      style={{
        width: field.width,
      }}
    >
      {Icon ? <Icon {...iconProps} /> : null}
    </div>
  ) : field.type === 'img' ? (
    field.avatar ? (
      <div
        style={{
          minWidth: field.width,
        }}
      >
        <Avatar
          src={selectedData}
          size={32}
          name={getData(data, field.textPath)}
          color={field.color}
          foregroundColor={field.foregroundColor}
          {...avatarProps}
        />
      </div>
    ) : (
      <div
        style={{
          minWidth: field.width,
        }}
      >
        <div
          style={{
            width: isLarge ? 50 : 35,
            height: isLarge ? 50 : 35,
            backgroundColor: useColor({ color: 'background', tone: 3 }),
            borderRadius: '50%',
            backgroundSize: 'cover',
            border: '1px solid ' + useColor({ color: 'background', tone: 3 }),
            backgroundImage: `url(${selectedData})`,
            backgroundPosition: 'center center',
          }}
        />
      </div>
    )
  ) : (
    <Text
      noSelect
      weight={field.bold ? 'semibold' : 'regular'}
      singleLine
      style={{
        width: field.width,
        paddingRight: 30,
        userSelect: 'none',
      }}
    >
      {selectedData}
    </Text>
  )
}

export default RowField
