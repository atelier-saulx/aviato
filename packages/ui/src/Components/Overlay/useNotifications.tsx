import React, { useEffect, useRef } from 'react'
import { TextValue } from '../../textParser'
import { useColor } from '../../theme'
import { SubText } from '../Text/SubText'
import { Text } from '../Text'
import { Button } from '../Button'

const NOTIFICATION_HEIGHT = 68 + 12 + 16
const NOTIFICATION_SPACING = 16
let notificationCount = 0

type Notification = {
  message?: TextValue
  title: TextValue
  info?: TextValue
  type?: 'error' | 'info'
  id?: number
  y?: number
  deleting?: boolean
  starting?: boolean
  time?: number
  onClick?: () => void
  close?: () => void
}

type NotifictionListener = (notification: Notification) => void

const notifictionObject: { listeners: Set<NotifictionListener> } = {
  listeners: new Set(),
}

export const notify = (payload: Notification) => {
  if (notifictionObject.listeners) {
    notifictionObject.listeners.forEach((fn) => fn(payload))
  }
}

const updateNotificationsY = (notifications: Notification[]) => {
  notifications
    // .filter((v) => !v.deleting)
    .forEach((n: any, i: number) => {
      n.y =
        global.innerHeight -
        ((i + 1) * (NOTIFICATION_HEIGHT + NOTIFICATION_SPACING) + 16)
    })
}

export const useNotifications = ({ update }) => {
  const notifictionsRef = useRef<Notification[]>([])

  useEffect(() => {
    const timers: Set<NodeJS.Timeout> = new Set()
    const listener = (notification: Notification) => {
      const id = ++notificationCount
      const notificationValue = {
        ...notification,
        y:
          global.innerHeight -
          notifictionsRef.current.length * NOTIFICATION_HEIGHT,
        id,
        starting: true,
      }
      notifictionsRef.current.push(notificationValue)
      updateNotificationsY(notifictionsRef.current)
      update()
      const animate = (time?: number) => {
        if (!notificationValue.deleting) {
          const t0 = setTimeout(() => {
            notificationValue.starting = false
            update()
          }, 20)
          timers.add(t0)
          const t = setTimeout(() => {
            const i = notifictionsRef.current.findIndex((v) => v.id === id)
            notificationValue.deleting = true
            updateNotificationsY(notifictionsRef.current)
            update()
            if (i !== -1) {
              const t2 = setTimeout(() => {
                const i = notifictionsRef.current.findIndex((v) => v.id === id)
                notifictionsRef.current.splice(i, 1)
                updateNotificationsY(notifictionsRef.current)
                update()
              }, 510)
              timers.add(t2)
            }
          }, time || notificationValue.time || 5000)
          timers.add(t)
        }
      }
      notificationValue.close = () => {
        animate(50)
      }
      animate()
    }
    notifictionObject.listeners.add(listener)
    return () => {
      notifictionObject.listeners.delete(listener)
      timers.forEach((t) => clearTimeout(t))
    }
  }, [notifictionsRef])

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 1,
        right: 16,
        top: 16,
      }}
    >
      {notifictionsRef.current.map((v, i) => (
        <Notification
          key={v.id}
          value={v}
          close={() => {
            v.close()
          }}
        />
      ))}
    </div>
  )
}

const Notification = ({ value, close }) => {
  return (
    <div
      style={{
        color: useColor({ color: 'foreground', tone: 2 }),
        boxShadow: `0px 3px 16px 1px ${useColor({
          color: 'foreground',
          tone: 2,
          opacity: 0.1,
        })}`,
        borderRadius: 8,
        padding: 24,
        backgroundColor: useColor({
          color: value.type === 'error' ? 'error' : 'foreground',
          opacity: value.type === 'error' ? 0.9 : 1,
        }),
        display: 'flex',
        justifyContent: 'space-between',
        backdropFilter: 'blur(6px)',
        position: 'absolute',
        marginBottom: NOTIFICATION_SPACING,
        top: 0,
        right: 0,
        width: 420,
        height: NOTIFICATION_HEIGHT + 'px',
        overflow: 'hidden',
        transition: 'transform 0.5s, opacity 0.5s',
        transform:
          value.deleting || value.starting
            ? `translate3d(${300}px,${0 + value.y}px,0px) scale(0.9)`
            : `translate3d(${0}px,${value.y}px,0px) scale(1)`,
        opacity: value.deleting || value.starting ? 0 : 1,
      }}
      onClick={
        value.onClick
          ? () => {
              value.onClick()
            }
          : null
      }
    >
      <div
        style={{
          height: '100%',
          flexDirection: 'column',
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Text color={{ color: 'background' }} noSelect singleLine>
            {value.title}
          </Text>
          <div
            style={{
              marginRight: -16,
              display: 'flex',
            }}
          >
            {value.info ? (
              <SubText
                color={{ color: 'background' }}
                style={{
                  opacity: 0.5,
                }}
              >
                {value.info}
              </SubText>
            ) : null}
            <Button
              style={{
                marginTop: -6,
                marginBottom: 0,
              }}
              foregroundColor={{ color: 'background' }}
              color={{ color: 'background', opacity: 0 }}
              onClick={(e) => {
                close()
              }}
              icon="close"
            />
          </div>
        </div>

        <Text color={{ color: 'background' }} noSelect singleLine>
          {value.message}
        </Text>
      </div>
    </div>
  )
}
