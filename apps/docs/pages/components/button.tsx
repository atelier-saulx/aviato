import {
  Page,
  Switch,
  OnSwitchChangePayload,
  Button,
  Column,
  Row,
  getRandomIcon,
  styled,
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
const ButtonPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  const RandomIcon = () => {
    const Icon = getRandomIcon()
    return <Icon />
  }

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
                <Button
                  type={type}
                  mode="filled"
                  leftIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  Lorem
                </Button>

                <Spacer />

                <Button type={type} mode="filled" disabled={isChecked}>
                  Lorem
                </Button>

                <Spacer />

                <Button
                  type={type}
                  mode="filled"
                  rightIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  Lorem
                </Button>

                <Spacer />

                <Button
                  type={type}
                  mode="filled"
                  leftIcon={<RandomIcon />}
                  rightIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  Lorem
                </Button>
              </Row>

              <BigSpacer />

              <Row>
                <Button
                  type={type}
                  mode="outlined"
                  leftIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  Lorem
                </Button>

                <Spacer />

                <Button type={type} mode="outlined" disabled={isChecked}>
                  Lorem
                </Button>

                <Spacer />

                <Button
                  type={type}
                  mode="outlined"
                  rightIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  Lorem
                </Button>

                <Spacer />

                <Button
                  type={type}
                  mode="outlined"
                  leftIcon={<RandomIcon />}
                  rightIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  Lorem
                </Button>
              </Row>

              <BigSpacer />

              <Row>
                <Button
                  type={type}
                  mode="transparent"
                  leftIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  Lorem
                </Button>

                <Spacer />

                <Button type={type} mode="transparent" disabled={isChecked}>
                  Lorem
                </Button>

                <Spacer />

                <Button
                  type={type}
                  mode="transparent"
                  rightIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  Lorem
                </Button>

                <Spacer />

                <Button
                  type={type}
                  mode="transparent"
                  leftIcon={<RandomIcon />}
                  rightIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  Lorem
                </Button>
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
                <Button mode="filled" disabled>
                  Disabled
                </Button>
                <Spacer />
                <Button mode="outlined" disabled>
                  Disabled
                </Button>
                <Spacer />
                <Button mode="transparent" disabled>
                  Disabled
                </Button>
              </Row>

              <BigSpacer />

              <Row>
                <Button mode="filled" disabled leftIcon={<RandomIcon />}>
                  Disabled
                </Button>
                <Spacer />
                <Button mode="outlined" disabled>
                  Disabled
                </Button>
                <Spacer />
                <Button mode="transparent" disabled rightIcon={<RandomIcon />}>
                  Disabled
                </Button>
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
        Button
      </NextTitle>

      <NextText size="Medium" color="Secondary">
        The Button component is used to trigger an action or event, such as
        submitting a form, opening a dialog, canceling an action, or performing
        a delete operation.
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
        <Button
          type="primary"
          mode="filled"
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            width: 200,
            height: 200,
          }}
        >
          With CSS
        </Button>
      </ShowcaseComponent>
    </Page>
  )
}

export default ButtonPage
