import { useState, useMemo } from 'react'
import {
  Page,
  Switch,
  IconButton,
  Column,
  Row,
  getRandomIconName,
  styled,
  IconName,
  ButtonType,
} from '@aviato/ui'
import { useHasLoaded } from '@aviato/hooks'

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

  const randomIconName = () => getRandomIconName() as IconName

  const ShowButtons = ({ type }: { type: ButtonType }) => {
    const uppercasedType = capitalize(type)

    const [isDisabled, setIsDisabled] = useState(false)
    const Icon = useMemo(() => randomIconName(), [])

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
                <IconButton
                  type={type}
                  variant="filled"
                  disabled={isDisabled}
                  icon={Icon}
                />
              </Row>
            </Column>
          </Row>
        </Column>
      </>
    )
  }

  const ShowDisabledButtons = () => {
    const Icon = useMemo(() => randomIconName(), [])

    return (
      <>
        <Column>
          <NextTitle>Disabled</NextTitle>
          <Row>
            <Column>
              <Row>
                <IconButton variant="filled" disabled icon={Icon} />

                <Spacer />

                <IconButton variant="outlined" disabled icon={Icon} />

                <Spacer />

                <IconButton variant="transparent" disabled icon={Icon} />
              </Row>
            </Column>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Icon Button</NextTitle>

      <NextText color="Secondary">
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
    </Page>
  )
}

export default IconButtonPage
