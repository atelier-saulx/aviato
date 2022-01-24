import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const CardPage = () => {
  const ShowCard = () => {
    return (
      <>
        <Column>
          <Row>Card</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Card</NextTitle>

      <NextText color="Secondary">Show information in a Card view.</NextText>

      <ShowcaseComponent background="transparent">
        <ShowCard />
      </ShowcaseComponent>
    </Page>
  )
}

export default CardPage
