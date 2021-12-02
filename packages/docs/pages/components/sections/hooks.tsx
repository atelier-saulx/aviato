import { useRef, useState, useCallback, useEffect } from 'react'

import { log } from '@aviato/utils'

import { Page } from '../../../components'

import {
  useElementRect,
  useHover,
  useLongPress,
  useMouseWheel,
  useWindowSize,
  useHotkeys,
  useIdle,
} from '@aviato/ui'

import { styled, Button, Text, Conditional } from '@aviato/ui'

import { ShowcaseComponent } from '../../../components'

const StyledDiv = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'flex-start',
  background: '#FFF',
  padding: '12px',
  borderRadius: '4px',
})

const BigSpacer = styled('div', {
  width: '100%',
  height: 10,
})

const HooksPage = () => {
  const IdleDiv = () => {
    const isIdle = useIdle(500)

    return (
      <StyledDiv>
        <Text>User is idle: {isIdle ? 'Yes 😴' : 'Nope ⚡️'}</Text>
      </StyledDiv>
    )
  }

  const HotKeyDiv = () => {
    const [wasHotkeyPressed, setWasHotkeyPressed] = useState({
      onEnter: false,
      onCtrlK: false,
      onComplex: false,
    })

    const onEnter = () => {
      setWasHotkeyPressed({
        ...wasHotkeyPressed,
        onEnter: true,
      })
    }

    const onCtrlK = () => {
      setWasHotkeyPressed({
        ...wasHotkeyPressed,
        onCtrlK: true,
      })
    }

    const onComplex = () => {
      setWasHotkeyPressed({
        ...wasHotkeyPressed,
        onComplex: true,
      })
    }

    useEffect(() => {
      let timer = setTimeout(
        () =>
          setWasHotkeyPressed({
            onCtrlK: false,
            onEnter: false,
            onComplex: false,
          }),
        1500
      )

      return () => clearTimeout(timer)
    }, [wasHotkeyPressed])

    useHotkeys([
      ['enter', () => onEnter()],
      ['ctrl+K', () => onCtrlK()],
      ['ctrl+shift+b', () => onComplex()],
    ])

    return (
      <StyledDiv>
        <Text>🚀 Press one of the below key-bindings ...</Text>

        <BigSpacer />

        <Text weight="Medium">`Enter` or `Ctrl+K` or `Ctrl+Shift+B`!</Text>

        <Conditional test={wasHotkeyPressed.onEnter}>
          <BigSpacer />
          <Text>🪄 Enter was pressed!</Text>
        </Conditional>

        <Conditional test={wasHotkeyPressed.onCtrlK}>
          <BigSpacer />
          <Text>🪄 Ctrl+K was pressed!</Text>
        </Conditional>

        <Conditional test={wasHotkeyPressed.onComplex}>
          <BigSpacer />
          <Text>🪄 Ctrl+Shift+B was pressed!</Text>
        </Conditional>
      </StyledDiv>
    )
  }

  const LongPressButton = () => {
    const onLongPress = () => {
      log.global.info('Long-press after pressing for 300ms.')
    }

    const longPressEvent = useLongPress(onLongPress)

    return (
      <Button
        onClick={() => log.global.info('Regular press on release.')}
        {...longPressEvent}
      >
        Button
      </Button>
    )
  }

  const ScrollDiv = () => {
    const wheelOffset = useMouseWheel()
    const clampedOffset = Math.floor(wheelOffset)

    return (
      <StyledDiv>
        <Text>Page scroll: {clampedOffset}</Text>
      </StyledDiv>
    )
  }

  const DimensionDiv = () => {
    const ref = useRef<HTMLDivElement>(null)

    const { width: windowWidth, height: windowHeight } = useWindowSize()
    const { width: elementWidth, height: elementHeight } = useElementRect(
      ref,
      true
    )

    return (
      <StyledDiv ref={ref}>
        <Text>Page Width: {windowWidth}</Text>
        <Text>Page Height: {windowHeight}</Text>
        <Text>Element Width: {elementWidth}</Text>
        <Text>Element Height: {elementHeight}</Text>
      </StyledDiv>
    )
  }

  const HoverDiv = () => {
    const [hoverRef, isHovered, isActive] = useHover<HTMLDivElement>()

    return (
      <StyledDiv ref={hoverRef}>
        <Text>Hover? - {isHovered ? '😃' : '🙂'}</Text>
        <Text>Active? - {isActive ? '😎' : '🙂'}</Text>
      </StyledDiv>
    )
  }

  return (
    <Page>
      <ShowcaseComponent title="Idle Hook">
        <IdleDiv />
      </ShowcaseComponent>

      <ShowcaseComponent title="Hotkeys">
        <HotKeyDiv />
      </ShowcaseComponent>

      <ShowcaseComponent title="Long-press Hook">
        <LongPressButton />
      </ShowcaseComponent>

      <ShowcaseComponent title="Hover Hook">
        <HoverDiv />
      </ShowcaseComponent>

      <ShowcaseComponent title="Window Size Hook">
        <DimensionDiv />
      </ShowcaseComponent>

      <ShowcaseComponent title="Page Scroll Hook">
        <ScrollDiv />
      </ShowcaseComponent>
    </Page>
  )
}

export default HooksPage
