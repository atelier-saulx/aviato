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
import { useState } from 'react'
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

    return (
      <>
        <Column>
          <NextTitle weight="Bold">{uppercasedType}</NextTitle>

          <Row>
            <NextText>Disable buttons?</NextText> <Spacer />
            <Switch
              onChange={({ isChecked }) => {
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
                  leftIcon={<RandomIcon />}
                  disabled={isDisabled}
                >
                  Lorem
                </Button>

                <Spacer />

                <Button type={type} variant="filled" disabled={isDisabled}>
                  Lorem
                </Button>

                <Spacer />

                <Button
                  type={type}
                  variant="filled"
                  rightIcon={<RandomIcon />}
                  disabled={isDisabled}
                >
                  Lorem
                </Button>

                <Spacer />

                <Button
                  type={type}
                  variant="filled"
                  leftIcon={<RandomIcon />}
                  rightIcon={<RandomIcon />}
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
                  leftIcon={<RandomIcon />}
                  disabled={isDisabled}
                >
                  Lorem
                </Button>

                <Spacer />

                <Button type={type} variant="outlined" disabled={isDisabled}>
                  Lorem
                </Button>

                <Spacer />

                <Button
                  type={type}
                  variant="outlined"
                  rightIcon={<RandomIcon />}
                  disabled={isDisabled}
                >
                  Lorem
                </Button>

                <Spacer />

                <Button
                  type={type}
                  variant="outlined"
                  leftIcon={<RandomIcon />}
                  rightIcon={<RandomIcon />}
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
                  leftIcon={<RandomIcon />}
                  disabled={isDisabled}
                >
                  Lorem
                </Button>

                <Spacer />

                <Button type={type} variant="transparent" disabled={isDisabled}>
                  Lorem
                </Button>

                <Spacer />

                <Button
                  type={type}
                  variant="transparent"
                  rightIcon={<RandomIcon />}
                  disabled={isDisabled}
                >
                  Lorem
                </Button>

                <Spacer />

                <Button
                  type={type}
                  variant="transparent"
                  leftIcon={<RandomIcon />}
                  rightIcon={<RandomIcon />}
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
    return (
      <>
        <Column>
          <NextTitle weight="Bold">Disabled</NextTitle>
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
                <Button variant="filled" disabled leftIcon={<RandomIcon />}>
                  Disabled
                </Button>
                <Spacer />
                <Button variant="outlined" disabled>
                  Disabled
                </Button>
                <Spacer />
                <Button
                  variant="transparent"
                  disabled
                  rightIcon={<RandomIcon />}
                >
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
          variant="filled"
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
