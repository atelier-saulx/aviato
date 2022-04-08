import { useMemo, useState } from 'react'
import { wait } from '@saulx/utils'

import {
  Page,
  Button,
  Column,
  useHasLoaded,
  Group,
  Row,
  Switch,
  styled,
  getRandomIconName,
  IconButton,
  getIconFromName,
  Loader,
  buttonColors,
  ButtonColor,
  buttonVariants,
  ButtonVariant,
} from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent, Spacer } from '../../components'

const Divider = styled('div', {
  width: '100%',
  height: 1,
  background: '$OtherDivider',
})

const ComponentProps = `
type ButtonVariants =
  | 'main'
  | 'light'
  | 'ghost'
  | 'outline'
  | 'outline-light'

type ButtonColors = 'primary' | 'action' | 'error'

interface ButtonProps {
  variant?: ButtonVariant
  color?: ButtonColor
  disabled?: boolean
  leftIcon?: ReactElement
  rightIcon?: ReactElement
  css?: StitchedCSS
}
`

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

    const getButtonVariants = (color: ButtonColor) => {
      return buttonVariants.map((variant: ButtonVariant, index) => {
        return (
          <Group
            direction="vertical"
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

            <Group direction="horizontal">{getButtonVariants(color)}</Group>
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

        <div
          style={{
            marginTop: 32,
            width: 200,
          }}
        >
          <Button
            onClick={async () => {
              await wait(1000)
              throw new Error('Nope!')
            }}
            css={{ marginTop: 16, marginBottom: 16 }}
          >
            Async button error
          </Button>

          <Button
            onClick={async () => {
              await wait(20000)
            }}
            css={{ marginTop: 16, marginBottom: 16 }}
          >
            Load loong
          </Button>

          <Button
            variant="outline"
            onClick={async () => {
              await wait(20000)
            }}
            css={{ marginTop: 16, marginBottom: 16 }}
          >
            Load loong
          </Button>

          <Loader />
        </div>
      </Column>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Button"
        description={`
          The Button component is used to trigger an action or event, such as submitting
          a form, opening a dialog, canceling an action, or performing a delete operation.
        `}
        props={ComponentProps}
      />

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Button, IconButton } from '@aviato/ui'

<Button
  variant={'main' | 'light' | 'ghost' | 'outline' | 'outline-light'}
  color={'primary' | 'action' | 'error'}
  leftIcon={<IconPlus />}
  rightIcon={<IconCheck />}
  onClick={() => {
    console.log('Button clicked')
  }}
>
  Lorem
</Button>

<IconButton
  variant='main'
  color='primary'
  icon="IconPlus"
  onClick={() => {
    console.log('IconButton clicked')
  }}
/>
      `}
      >
        <ShowButtonMatrix />
      </ShowcaseComponent>
    </Page>
  )
}

export default ButtonPage
