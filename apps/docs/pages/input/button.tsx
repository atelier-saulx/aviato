import { useState, useMemo } from 'react'
import {
  Page,
  Switch,
  Button,
  Column,
  Row,
  ButtonMode,
  IconButton,
  getRandomIcon,
  getRandomIconName,
  useHasLoaded,
} from '@aviato/ui'
import { log, capitalize } from '@aviato/utils'

import {
  NextTitle,
  NextText,
  ShowcaseComponent,
  BigSpacer,
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

  const ShowButtons = ({ mode }: { mode: ButtonMode }) => {
    const uppercasedMode = capitalize(mode)
    const [isDisabled, setIsDisabled] = useState(false)

    const Icon = useMemo(() => {
      const RandomIcon = getRandomIcon()
      return <RandomIcon />
    }, [])

    const IconString = useMemo(() => {
      return getRandomIconName()
    }, [])

    return (
      <>
        <Column>
          <NextTitle size="small">{uppercasedMode}</NextTitle>

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
                  mode={mode}
                  variant="filled"
                  leftIcon={Icon}
                  disabled={isDisabled}
                  onClick={() => {
                    log.global.debug('Button clicked')
                  }}
                >
                  Lorem
                </Button>

                <Spacer />

                <IconButton
                  mode={mode}
                  variant="filled"
                  icon={IconString}
                  disabled={isDisabled}
                />
              </Row>

              <BigSpacer />

              <Row>
                <Button
                  mode={mode}
                  variant="outlined"
                  leftIcon={Icon}
                  disabled={isDisabled}
                >
                  Lorem
                </Button>

                <Spacer />

                <IconButton
                  mode={mode}
                  variant="outlined"
                  icon={IconString}
                  disabled={isDisabled}
                />
              </Row>

              <BigSpacer />

              <Row>
                <Button
                  mode={mode}
                  variant="transparent"
                  leftIcon={Icon}
                  disabled={isDisabled}
                >
                  Lorem
                </Button>

                <Spacer />

                <IconButton
                  mode={mode}
                  variant="transparent"
                  icon={IconString}
                  disabled={isDisabled}
                />
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

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Button, IconButton } from '@aviato/ui'

<Button
  type='primary'
  variant={'filled' | 'outlined' | 'transparent'}
  leftIcon={<IconPlus />}
  rightIcon={<IconCheck />}
  onClick={() => {
    console.log('Button clicked')
  }}
>
  Lorem
</Button>

<IconButton
  type='primary'
  variant={'filled' | 'outlined' | 'transparent'}
  icon="IconPlus"
  onClick={() => {
    console.log('Button clicked')
  }}
/>
      `}
      >
        <ShowButtons mode="primary" />
      </ShowcaseComponent>

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
<Button type='ghost'>Ipsum</Button>

<IconButton type='ghost' />
      `}
      >
        <ShowButtons mode="ghost" />
      </ShowcaseComponent>

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
<Button type='error'>Dolor</Button>

<IconButton type='error' />
      `}
      >
        <ShowButtons mode="error" />
      </ShowcaseComponent>
    </Page>
  )
}

export default ButtonPage
