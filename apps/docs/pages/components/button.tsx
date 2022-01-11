import { useState, useMemo } from 'react'
import {
  Page,
  Switch,
  Button,
  Column,
  Row,
  getRandomIcon,
  styled,
  ButtonType,
} from '@aviato/ui'
import { useHasLoaded } from '@aviato/hooks'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'
import { capitalize } from '../../utils'

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const Spacer = styled('div', {
  width: 6,
  height: 6,
})

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
    const [isDisabled, setIsDisabled] = useState(false)
    const Icon = useMemo(() => <RandomIcon />, [])

    return (
      <>
        <Column>
          <NextTitle size="small">{uppercasedType}</NextTitle>

          <Row>
            <Switch
              text="Disable buttons?"
              onChange={(isChecked) => {
                setIsDisabled(isChecked)
              }}
            />
          </Row>

          <BigSpacer />

          <Row>
            <Column>
              <Row>
                <Button
                  type={type}
                  variant="filled"
                  leftIcon={Icon}
                  disabled={isDisabled}
                >
                  Lorem
                </Button>
              </Row>

              <BigSpacer />

              <Row>
                <Button
                  type={type}
                  variant="outlined"
                  leftIcon={Icon}
                  disabled={isDisabled}
                >
                  Lorem
                </Button>
              </Row>

              <BigSpacer />

              <Row>
                <Button
                  type={type}
                  variant="transparent"
                  leftIcon={Icon}
                  disabled={isDisabled}
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
    const Icon = useMemo(() => <RandomIcon />, [])

    return (
      <>
        <Column>
          <NextTitle>Disabled</NextTitle>
          <Row>
            <Column>
              <Row>
                <Button variant="filled" disabled>
                  Disabled
                </Button>
                <Spacer />
                <Button variant="outlined" disabled>
                  Disabled
                </Button>
                <Spacer />
                <Button variant="transparent" disabled>
                  Disabled
                </Button>
              </Row>

              <BigSpacer />

              <Row>
                <Button variant="filled" disabled leftIcon={Icon}>
                  Disabled
                </Button>
                <Spacer />
                <Button variant="outlined" disabled>
                  Disabled
                </Button>
                <Spacer />
                <Button variant="transparent" disabled rightIcon={Icon}>
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
      <NextTitle>Button</NextTitle>

      <NextText color="Secondary">
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
    </Page>
  )
}

export default ButtonPage
