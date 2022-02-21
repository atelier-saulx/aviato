import {
  Page,
  Button,
  Column,
  ButtonColor,
  ButtonVariant,
  useHasLoaded,
  Group,
  getRandomIcon,
} from '@aviato/ui'

import { useMemo } from 'react'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

/**
 * TODO: Fix SSR issue with Vector Icons!
 */
const ButtonPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  const ShowButtonMatrix = () => {
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
          <Group key={`BadgeVariant-${index}`} direction="row">
            <Button color={color} variant={variant} leftIcon={Icon}>
              {color} - {variant}
            </Button>

            <Button color={color} variant={variant}>
              {color} - {variant}
            </Button>

            <Button color={color} variant={variant} rightIcon={Icon}>
              {color} - {variant}
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
            direction="column"
            css={{ paddingBottom: 20 }}
          >
            {getButtonVariants(color)}
          </Group>
        )
      })
    }

    return <Column>{getButtons()}</Column>
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
