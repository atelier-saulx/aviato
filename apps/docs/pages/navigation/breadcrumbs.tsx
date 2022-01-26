import { Column, Row, Page, Breadcrumbs, Link } from '@aviato/ui'

import {
  NextTitle,
  NextText,
  ShowcaseComponent,
  SmallSpacer,
} from '../../components'

const BreadcrumbsPage = () => {
  const ShowBreadcrumbs = () => {
    const exampleItems = [
      { title: 'Aviato', href: 'https://aviato.design' },
      { title: 'Components', href: 'https://aviato.design' },
      { title: 'Breadcrumbs', href: 'https://aviato.design' },
    ].map((item, index) => (
      <Link href={item.href} key={index}>
        {item.title}
      </Link>
    ))

    return (
      <>
        <Column>
          <Row>
            <Breadcrumbs>{exampleItems}</Breadcrumbs>
          </Row>

          <SmallSpacer />

          <Row>
            <Breadcrumbs separator="∙">{exampleItems}</Breadcrumbs>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Breadcrumbs</NextTitle>

      <NextText color="Secondary">
        Separate navigational items with a given separator.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowBreadcrumbs />
      </ShowcaseComponent>
    </Page>
  )
}

export default BreadcrumbsPage
