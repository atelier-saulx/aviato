import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const BreadcrumbsPage = () => {
  const ShowBreadcrumbs = () => {
    return (
      <>
        <Column>
          <Row>Breadcrumbs</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Breadcrumbs</NextTitle>

      <NextText color="Secondary">
        Separate navigation items with given separator.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowBreadcrumbs />
      </ShowcaseComponent>
    </Page>
  )
}

export default BreadcrumbsPage
