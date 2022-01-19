import { useState, useMemo } from 'react'
import {
  Page,
  Switch,
  Button,
  Column,
  Row,
  ButtonType,
  IconButton,
  getRandomIcon,
  getRandomIconName,
  styled,
  useHasLoaded,
} from '@aviato/ui'
import { log } from '@aviato/utils'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'
import { capitalize } from '../../utils'

const Spacer = styled('div', {
  width: 6,
  height: 20,
})

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

/**
 * TODO: Fix SSR issue with Vector Icons!
 */
const ButtonPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  const ShowButtons = ({ type }: { type: ButtonType }) => {
    const uppercasedType = capitalize(type)

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
                  onClick={() => {
                    log.global.debug('Button clicked')
                  }}
                >
                  Lorem
                </Button>

                <Spacer />

                <IconButton
                  type={type}
                  variant="filled"
                  icon={IconString}
                  disabled={isDisabled}
                />
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

                <Spacer />

                <IconButton
                  type={type}
                  variant="outlined"
                  icon={IconString}
                  disabled={isDisabled}
                />
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

                <Spacer />

                <IconButton
                  type={type}
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
        <ShowButtons type="primary" />
      </ShowcaseComponent>

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
<Button type='ghost'>Ipsum</Button>

<IconButton type='ghost' />
      `}
      >
        <ShowButtons type="ghost" />
      </ShowcaseComponent>

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
<Button type='error'>Dolor</Button>

<IconButton type='error' />
      `}
      >
        <ShowButtons type="error" />
      </ShowcaseComponent>
    </Page>
  )
}

export default ButtonPage
