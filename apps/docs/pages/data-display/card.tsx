import { Column, Row, Page } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

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
      <ShowcaseHeader
        title="Card"
        description={`
          Show information in a Card view.
        `}
      />

      <ShowcaseComponent background="transparent">
        <ShowCard />
      </ShowcaseComponent>
    </Page>
  )
}

export default CardPage
