import { useMemo, useState } from 'react'

import {
  Page,
  Button,
  Column,
  ButtonColor,
  ButtonVariant,
  useHasLoaded,
  Group,
  getRandomIcon,
  Row,
  Switch,
} from '@aviato/ui'

import {
  NextTitle,
  NextText,
  ShowcaseComponent,
  Spacer,
} from '../../components'

/**
 * TODO: Fix SSR issue with Vector Icons!
 */
const ButtonPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  const ShowButtonMatrix = () => {
    const [isDisabled, setIsDisabled] = useState(false)

    const Icon = useMemo(() => {
      const RandomIcon = getRandomIcon()
      return <RandomIcon />
    }, [])

    const buttonColors: ButtonColor[] = ['primary', 'action', 'error']

    const buttonVariants: ButtonVariant[] = [
      'main',
      'light',
      'ghost',
      'outline',
      'outline-light',
    ]

    const getButtonVariants = (color: ButtonColor) => {
      return buttonVariants.map((variant, index) => {
        return (
          <Group key={`Button-${color}-${variant}-${index}`} direction="column">
            <Button
              color={color}
              variant={variant}
              leftIcon={Icon}
              disabled={isDisabled}
            >
              Settings
            </Button>

            <Button color={color} variant={variant} disabled={isDisabled}>
              Settings
            </Button>

            <Button
              color={color}
              variant={variant}
              rightIcon={Icon}
              disabled={isDisabled}
            >
              Settings
            </Button>
          </Group>
        )
      })
    }

    const getButtons = () => {
      return buttonColors.map((color, index) => {
        return (
          <Group
            key={`ButtonColor-${index}`}
            direction="row"
            css={{ paddingBottom: 20 }}
          >
            {getButtonVariants(color)}
          </Group>
        )
      })
    }

    return (
      <Column>
        <Row>
          <Switch
            text="Disable buttons?"
            onChange={(isChecked) => {
              setIsDisabled(isChecked)
            }}
          />
        </Row>

        <Spacer />

        {getButtons()}
      </Column>
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
        <ShowButtonMatrix />
      </ShowcaseComponent>
    </Page>
  )
}

export default ButtonPage
