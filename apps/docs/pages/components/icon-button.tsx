import {
  Page,
  Switch,
  OnSwitchChangePayload,
  IconButton,
  Column,
  Row,
  getRandomIconName,
  styled,
  IconName,
  ButtonType,
} from '@aviato/ui'
import { useHasLoaded } from '@aviato/hooks'
import { useCallback, useState } from 'react'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const Spacer = styled('div', {
  width: 6,
  height: 6,
})

const capitalize = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

/**
 * TODO: Fix SSR issue with Vector Icons!
 */
const IconButtonPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  const randomIcon = () => getRandomIconName() as IconName

  const ShowButtons = ({ type }: { type: ButtonType }) => {
    const uppercasedType = capitalize(type)

    const [isChecked, setIsChecked] = useState(false)

    const onSwitchChange = useCallback((event: OnSwitchChangePayload) => {
      const { isChecked } = event

      setIsChecked(isChecked)
    }, [])

    return (
      <>
        <Column>
          <NextTitle weight="Bold">{uppercasedType}</NextTitle>

          <Row>
            <NextText>Disable buttons?</NextText> <Spacer />
            <Switch onChange={onSwitchChange} />
          </Row>

          <BigSpacer />

          <Row>
            <Column>
              <Row>
                <IconButton
                  type={type}
                  mode="filled"
                  disabled={isChecked}
                  icon={randomIcon()}
                />

                <Spacer />

                <IconButton
                  type={type}
                  mode="outlined"
                  disabled={isChecked}
                  icon={randomIcon()}
                />

                <Spacer />

                <IconButton
                  type={type}
                  mode="transparent"
                  disabled={isChecked}
                  icon={randomIcon()}
                />
              </Row>
            </Column>
          </Row>
        </Column>
      </>
    )
  }

  const ShowDisabledButtons = () => {
    return (
      <>
        <Column>
          <NextTitle weight="Bold">Disabled</NextTitle>
          <Row>
            <Column>
              <Row>
                <IconButton mode="filled" disabled icon={randomIcon()} />

                <Spacer />

                <IconButton mode="outlined" disabled icon={randomIcon()} />

                <Spacer />

                <IconButton mode="transparent" disabled icon={randomIcon()} />
              </Row>
            </Column>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle weight="Bold" size="ExtraLarge">
        Icon Button
      </NextTitle>

      <NextText size="Medium" color="Secondary">
        The Icon Button composes the Button component and renders only an icon.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowButtons type="primary" />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent">
        <ShowButtons type="ghost" />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent">
        <ShowButtons type="error" />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent">
        <ShowDisabledButtons />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent">
        <IconButton
          type="primary"
          mode="filled"
          icon={randomIcon()}
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            width: 200,
            height: 200,
          }}
        />
      </ShowcaseComponent>
    </Page>
  )
}

export default IconButtonPage
