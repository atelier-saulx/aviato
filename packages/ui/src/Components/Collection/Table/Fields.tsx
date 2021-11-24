import React, { useCallback } from 'react'
import { useColor } from '../../../theme'
import { Text } from '../../Text'
import useHover from '../../../hooks/events/useHover'
import { Down } from '../../../icons'

const SortableField = ({
  sort,
  width,
  sortable,
  onChange,
  path,
  label,
  type,
  correction,
}) => {
  const [hover, isHover] = useHover()

  // from the top
  if (sortable === true) {
    sortable = 'asc'
  }
  return (
    <div
      {...hover}
      style={{
        width: width,
        display: 'flex',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={useCallback(() => {
        const n = sort ? (sort === 'asc' ? 'desc' : 'asc') : sortable
        // setSort(n)
        onChange(n, path)
      }, [sort, path])}
    >
      <div
        style={{
          position: 'absolute',
          left: -27.5 - correction,
          opacity: sort || isHover ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      >
        <Down
          size={18}
          color={{ color: 'foreground' }}
          style={{
            marginTop: 3,
            transition: 'transform 0.15s',
            transform:
              sort === 'asc' || (!sort && sortable === 'asc')
                ? 'rotate(180deg)'
                : 'rotate(0deg)',
          }}
        />
      </div>
      <Text
        noSelect
        weight="regular"
        color={{
          color: 'foreground',
          tone: isHover ? 1 : 2,
        }}
        singleLine
        style={{
          marginLeft: -correction,
          textTransform: !label ? 'capitalize' : null,
        }}
      >
        {label || (type !== 'img' && type !== 'icon' ? path[0] : '')}
      </Text>
    </div>
  )
}

const Field = ({
  path,
  width,
  type,
  label,
  sortable,
  sort,
  onChange,
  correction,
}) => {
  const children =
    label === false ||
    (label === undefined && (type === 'img' || type === 'icon')) ? (
      <div style={{ minWidth: width }} />
    ) : sortable ? (
      <SortableField
        path={path}
        label={label}
        type={type}
        correction={correction}
        sort={sort}
        width={width}
        onChange={onChange}
        sortable
      />
    ) : (
      <div
        style={{
          display: 'flex',
          width: width,
        }}
      >
        <Text
          noSelect
          weight="regular"
          color={{
            color: 'foreground',
            tone: 2,
          }}
          singleLine
          style={{
            marginLeft: -correction,
            textTransform: !label ? 'capitalize' : null,
          }}
        >
          {label || (type !== 'img' && type !== 'icon' ? path[0] : '')}
        </Text>
      </div>
    )

  return children
}

const Fields = ({ onChange, width, context }) => {
  const options = context.onOptions
  return (
    <div
      style={{
        width: width - context.paddingLeft - context.paddingRight,
        display: 'flex',
        paddingTop: 12,
        paddingBottom: 12,
        marginLeft: context.paddingLeft,
        alignItems: 'center',
        borderBottom: '1px solid ' + useColor({ color: 'divider' }),
      }}
    >
      {context.itemProps.fields.map((field, index) => {
        let correction = 0
        if (
          index === 1 &&
          (context.itemProps.fields[0].type === 'img' ||
            context.itemProps.fields[0].type === 'icon')
        ) {
          correction = context.itemProps.fields[0].width
        }

        return (
          <Field
            {...field}
            correction={correction}
            key={index}
            onChange={onChange}
          />
        )
      })}
      {options ? <div style={{ minWidth: 35 }} /> : null}
    </div>
  )
}

export default Fields
