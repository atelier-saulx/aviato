import React, {
  FunctionComponent,
  EventHandler,
  SyntheticEvent,
  ReactChild,
  ReactChildren,
  ComponentType,
} from 'react'
import { ChevronLeft, ChevronRight } from '../../icons'
import useHover from '../../hooks/events/useHover'
import { useColor } from '../../theme'

type GenericEventHandler = EventHandler<SyntheticEvent>

type DayCellProps = {
  highlight?: boolean
  onClick?: GenericEventHandler
  children: ReactChild | ReactChildren[] | ComponentType
}

const DayCell: FunctionComponent<DayCellProps> = ({
  highlight,
  onClick,
  children,
}) => {
  const [hover, isHover] = useHover()
  const clickable = Boolean(onClick)

  return (
    <div
      {...hover}
      onClick={onClick}
      style={{
        color: highlight ? useColor({ color: 'background' }) : null,
        flexBasis: '9.5%',
        textAlign: 'center',
        cursor: !highlight && clickable ? 'pointer' : null,
        backgroundColor: highlight
          ? useColor({ color: 'primary' })
          : clickable && isHover
          ? useColor({ color: 'background', tone: 3 })
          : null, // TODO
        borderRadius: 15,
        paddingTop: 4,
        paddingBottom: 4,
        margin: 6,
      }}
    >
      {children}
    </div>
  )
}

const dayOfTheWeekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(
  (value, index) => <DayCell key={`DayCell-${index}`}>{value}</DayCell>
)

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

type DatePickerOverlayProps = {
  date: Date
  onChange: (newDate: Date) => void
}

export const DatePickerOverlay: FunctionComponent<DatePickerOverlayProps> = ({
  date,
  onChange,
}) => {
  if (!date) {
    return null
  }

  // day 0 is the last day of the previous month
  const amountDaysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate()

  // Sunday is 0
  const startWeekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const emptyCells = [...Array(startWeekDay)].map((_, i) => (
    <DayCell key={i}>&nbsp;</DayCell>
  ))

  const days = [...Array(amountDaysInMonth).keys()].map((v, i) => {
    return (
      <DayCell
        key={i + startWeekDay}
        onClick={() => {
          if (onChange) {
            onChange(new Date(date.getFullYear(), date.getMonth(), v + 1))
          }
        }}
        highlight={v + 1 === date.getDate()}
      >
        {v + 1}
      </DayCell>
    )
  })

  const dayCells = emptyCells.concat(days)

  return (
    <div>
      <div
        style={{
          display: 'flex',
          width: 260,
          border: `1px solid ${useColor({ color: 'divider' })}`,
          paddingTop: 8,
          paddingBottom: 8,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            marginLeft: 12,
            alignItems: 'center',
          }}
        >
          <div>{months[date.getMonth()]}</div>
          <div
            style={{
              marginLeft: 8,
            }}
          >
            {date.getFullYear()}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexGrow: 1,
            justifyContent: 'flex-end',
            marginRight: 6,
          }}
        >
          <ChevronLeft
            onClick={() => {
              onChange(new Date(date.setMonth(date.getMonth() - 1)))
            }}
          />
          <ChevronRight
            onClick={() => {
              onChange(new Date(date.setMonth(date.getMonth() + 1)))
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {dayOfTheWeekNames}
        {dayCells}
      </div>
    </div>
  )
}
