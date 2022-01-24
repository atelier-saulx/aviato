import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const BadgePage = () => {
  const ShowBadge = () => {
    return (
      <>
        <Column>
          <Row>Badge</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Badge</NextTitle>

      <NextText color="Secondary">Display badge, pill or tag.</NextText>

      <ShowcaseComponent background="transparent">
        <ShowBadge />
      </ShowcaseComponent>
    </Page>
  )
}

export default BadgePage
