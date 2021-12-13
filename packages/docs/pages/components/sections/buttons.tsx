import { styled } from '@aviato/ui'
import { Button, Column, Row, getRandomIcon } from '@aviato/ui'
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
  const ShowButtons = ({ type }: { type: 'primary' | 'ghost' | 'error' }) => {
    const uppercasedType = capitalize(type)

    const RandomIcon = () => {
      const Icon = getRandomIcon()
      return <Icon />
    }

    return (
      <>
        <Column>
          <NextText weight="Bold">{uppercasedType} Enabled</NextText>
          <Row>
            <Button type={type} mode="filled" leftIcon={<RandomIcon />}>
              {uppercasedType}
            </Button>

            <Spacer />

            <Button type={type} mode="filled">
              {uppercasedType}
            </Button>

            <Spacer />

            <Button type={type} mode="filled" rightIcon={<RandomIcon />}>
              {uppercasedType}
            </Button>

            <Spacer />

            <Button type={type} mode="outlined">
              {uppercasedType}
            </Button>

            <Spacer />

            <Button type={type} mode="transparent">
              {uppercasedType}
            </Button>
          </Row>

          <BigSpacer />

          <NextText weight="Bold">{uppercasedType} Disabled</NextText>
          <Row>
            <Button type={type} mode="filled" disabled>
              {uppercasedType}
            </Button>

            <Spacer />

            <Button type={type} mode="outlined" disabled>
              {uppercasedType}
            </Button>

            <Spacer />

            <Button type={type} mode="transparent" disabled>
              {uppercasedType}
            </Button>
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
    </Page>
  )
}

export default ButtonsPage
