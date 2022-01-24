import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ChipPage = () => {
  const ShowChip = () => {
    return (
      <>
        <Column>
          <Row>Chip</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Chip</NextTitle>

      <NextText color="Secondary">
        Alternative to Select and Radio Button.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowChip />
      </ShowcaseComponent>
    </Page>
  )
}

export default ChipPage
