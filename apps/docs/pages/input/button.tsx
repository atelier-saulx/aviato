import { useMemo, useState } from 'react'

import {
  Page,
  Button,
  Column,
  ButtonColor,
  ButtonVariant,
  useHasLoaded,
  Group,
  Row,
  Switch,
  styled,
  getRandomIconName,
  IconButton,
  getIconFromName,
} from '@aviato/ui'

import {
  NextTitle,
  NextText,
  ShowcaseComponent,
  Spacer,
} from '../../components'

const Divider = styled('div', {
  width: '100%',
  height: 1,
  background: '$OtherDivider',
})

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

    const IconString = useMemo(() => {
      return getRandomIconName()
    }, [])

    const Icon = useMemo(() => {
      const Icon = getIconFromName(IconString)
      return <Icon />
    }, [IconString])

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
          <Group
            direction="row"
            align="center"
            key={`Button-${color}-${variant}-${index}`}
          >
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

            <IconButton
              color={color}
              variant={variant}
              icon={IconString}
              disabled={isDisabled}
            />
          </Group>
        )
      })
    }

    const getButtons = () => {
      return buttonColors.map((color, index) => {
        return (
          <div key={`ButtonColor-${index}`}>
            <Spacer />
            <Divider />
            <Spacer />

            <Group direction="column">{getButtonVariants(color)}</Group>
          </div>
        )
      })
    }

    return (
      <Column>
        <Row style={{ justifyContent: 'center' }}>
          <Switch
            text="Disable buttons?"
            onChange={(isChecked) => {
              setIsDisabled(isChecked)
            }}
          />
        </Row>

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
