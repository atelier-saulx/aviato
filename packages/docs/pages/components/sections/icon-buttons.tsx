import { styled } from '@aviato/ui'
import { IconButton, Column, Row } from '@aviato/ui'
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

const IconButtonsPage = () => {
  const ShowIconButtons = ({
    type,
  }: {
    type: 'primary' | 'ghost' | 'error'
  }) => {
    const uppercasedType = capitalize(type)

    return (
      <>
        <Column>
          <NextText weight="Bold">{uppercasedType} Enabled</NextText>
          <Row>
            <IconButton icon="IconPlus" type={type} />
            <Spacer />
            <IconButton icon="IconPlus" type={type} mode="outlined" />
            <Spacer />
            <IconButton icon="IconPlus" type={type} mode="transparent" />
          </Row>

          <BigSpacer />

          <NextText weight="Bold">{uppercasedType} Disabled</NextText>
          <Row>
            <IconButton icon="IconPlus" type={type} disabled />
            <Spacer />
            <IconButton icon="IconPlus" type={type} mode="outlined" disabled />
            <Spacer />
            <IconButton
              icon="IconPlus"
              type={type}
              mode="transparent"
              disabled
            />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle weight="Bold" size="ExtraLarge">
        Icon-buttons
      </NextTitle>

      <ShowcaseComponent>
        <ShowIconButtons type="primary" />
      </ShowcaseComponent>

      <ShowcaseComponent>
        <ShowIconButtons type="ghost" />
      </ShowcaseComponent>

      <ShowcaseComponent>
        <ShowIconButtons type="error" />
      </ShowcaseComponent>
    </Page>
  )
}

export default IconButtonsPage
