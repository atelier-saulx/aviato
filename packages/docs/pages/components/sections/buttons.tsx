import { styled } from '@aviato/ui'
import { Button, Column, Row } from '@aviato/ui'
import { NextText } from '../../../components'

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

    return (
      <>
        <Column>
          <NextText weight="Bold">{uppercasedType} Enabled</NextText>
          <Row>
            <Button type={type} mode="filled">
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
      <ShowcaseComponent title="Primary Buttons">
        <ShowButtons type="primary" />
      </ShowcaseComponent>

      <ShowcaseComponent title="Ghost Buttons">
        <ShowButtons type="ghost" />
      </ShowcaseComponent>

      <ShowcaseComponent title="Error Buttons">
        <ShowButtons type="error" />
      </ShowcaseComponent>
    </Page>
  )
}

export default ButtonsPage
