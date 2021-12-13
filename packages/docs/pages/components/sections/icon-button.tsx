import { Checkbox, OnCheckboxChangePayload, styled } from '@aviato/ui'
import { IconButton, Column, Row, getRandomIconName } from '@aviato/ui'
import { useCallback, useState } from 'react'
import { NextTitle, NextText } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

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

const ButtonsPage = () => {
  const RandomIconName = () => {
    return getRandomIconName()
  }

  const ShowButtons = ({ type }: { type: 'primary' | 'ghost' | 'error' }) => {
    const uppercasedType = capitalize(type)

    const [isChecked, setIsChecked] = useState(false)

    const onCheckedChange = useCallback((event: OnCheckboxChangePayload) => {
      const { isChecked } = event

      setIsChecked(isChecked)
    }, [])

    return (
      <>
        <Column>
          <NextTitle weight="Bold">{uppercasedType}</NextTitle>

          <Row>
            <NextText>Disable buttons?</NextText> <Spacer />
            <Checkbox onChange={onCheckedChange} />
          </Row>

          <BigSpacer />

          <Row>
            <Column>
              <Row>
                <IconButton
                  type={type}
                  mode="filled"
                  disabled={isChecked}
                  icon={RandomIconName()}
                />

                <Spacer />

                <IconButton
                  type={type}
                  mode="outlined"
                  disabled={isChecked}
                  icon={RandomIconName()}
                />

                <Spacer />

                <IconButton
                  type={type}
                  mode="transparent"
                  disabled={isChecked}
                  icon={RandomIconName()}
                />
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
                <IconButton mode="filled" disabled icon={RandomIconName()} />

                <Spacer />

                <IconButton mode="outlined" disabled icon={RandomIconName()} />

                <Spacer />

                <IconButton
                  mode="transparent"
                  disabled
                  icon={RandomIconName()}
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
      <NextTitle weight="Bold" size="ExtraLarge">
        Icon Button
      </NextTitle>

      <NextText size="Medium" color="Secondary">
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

      <ShowcaseComponent background="transparent">
        <IconButton
          type="primary"
          mode="filled"
          icon={RandomIconName()}
          css={{
            width: 200,
            height: 200,
            justifyContent: 'center',
          }}
        ></IconButton>
      </ShowcaseComponent>
    </Page>
  )
}

export default ButtonsPage
