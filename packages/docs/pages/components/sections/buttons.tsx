import { Checkbox, OnCheckboxChangePayload, styled } from '@aviato/ui'
import { Button, Column, Row, getRandomIcon, icons } from '@aviato/ui'
import { useCallback, useState } from 'react'
import { NextTitle } from '../../../components'

const { IconPlus } = icons

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
  const RandomIcon = () => {
    const Icon = getRandomIcon()
    return <IconPlus />
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
          <Checkbox onCheckChange={(event) => onCheckedChange(event)} />
          <BigSpacer />

          <Row>
            <Column>
              <Row>
                <Button
                  type={type}
                  mode="filled"
                  leftIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  {uppercasedType}
                </Button>
                <Spacer />
                <Button type={type} mode="filled" disabled={isChecked}>
                  {uppercasedType}
                </Button>
                <Spacer />
                <Button
                  type={type}
                  mode="filled"
                  rightIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  {uppercasedType}
                </Button>
              </Row>

              <BigSpacer />

              <Row>
                <Button
                  type={type}
                  mode="outlined"
                  leftIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  {uppercasedType}
                </Button>
                <Spacer />
                <Button type={type} mode="outlined" disabled={isChecked}>
                  {uppercasedType}
                </Button>
                <Spacer />
                <Button
                  type={type}
                  mode="outlined"
                  rightIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  {uppercasedType}
                </Button>
              </Row>

              <BigSpacer />

              <Row>
                <Button
                  type={type}
                  mode="transparent"
                  leftIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  {uppercasedType}
                </Button>
                <Spacer />
                <Button type={type} mode="transparent" disabled={isChecked}>
                  {uppercasedType}
                </Button>
                <Spacer />
                <Button
                  type={type}
                  mode="transparent"
                  rightIcon={<RandomIcon />}
                  disabled={isChecked}
                >
                  {uppercasedType}
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
                <Button mode="filled" disabled>
                  Disabled
                </Button>
                <Spacer />
                <Button mode="outlined" disabled>
                  Disabled
                </Button>
                <Spacer />
                <Button mode="transparent" disabled>
                  Disabled
                </Button>
              </Row>

              <BigSpacer />

              <Row>
                <Button mode="filled" disabled leftIcon={<RandomIcon />}>
                  Disabled
                </Button>
                <Spacer />
                <Button mode="outlined" disabled>
                  Disabled
                </Button>
                <Spacer />
                <Button mode="transparent" disabled rightIcon={<RandomIcon />}>
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
        Buttons
      </NextTitle>

      <ShowcaseComponent>
        <ShowButtons type="primary" />
      </ShowcaseComponent>

      <ShowcaseComponent>
        <ShowButtons type="ghost" />
      </ShowcaseComponent>

      <ShowcaseComponent>
        <ShowButtons type="error" />
      </ShowcaseComponent>

      <ShowcaseComponent>
        <ShowDisabledButtons />
      </ShowcaseComponent>
    </Page>
  )
}

export default ButtonsPage
