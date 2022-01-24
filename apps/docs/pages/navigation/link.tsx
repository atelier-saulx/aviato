import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const LinkPage = () => {
  const ShowLink = () => {
    return (
      <>
        <Column>
          <Row>Link</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Link</NextTitle>

      <NextText color="Secondary">
        Links are accessible elements used primarily for navigation.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowLink />
      </ShowcaseComponent>
    </Page>
  )
}

export default LinkPage
