import {
  Column,
  Row,
  Page,
  Breadcrumbs,
  Link,
  Avatar,
  Button,
} from '@aviato/ui'

import {
  ShowcaseHeader,
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

          <SmallSpacer />

          <Row>
            <Breadcrumbs>
              <Avatar label="Test">Test</Avatar>
              <Link href="https://aviato.design">Aviato</Link>
              <Link href="https://aviato.design">Components</Link>
              <Link href="https://aviato.design">Breadcrumbs</Link>
            </Breadcrumbs>
          </Row>

          <SmallSpacer />

          <Row>
            <Breadcrumbs>
              <Button color="action" variant="ghost">
                Aviato
              </Button>
              <Button color="action" variant="ghost">
                Components
              </Button>
              <Button color="action" variant="ghost">
                Breadcrumbs
              </Button>
            </Breadcrumbs>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Breadcrumbs"
        description={`
          Separate navigational items with a given separator.
        `}
      />

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Breadcrumbs, Link } from '@aviato/ui'

<Breadcrumbs>
  <Link href="/">Home</Link>
  <Link href="/overview">Overview</Link>
</Breadcrumbs>
        `}
      >
        <ShowBreadcrumbs />
      </ShowcaseComponent>
    </Page>
  )
}

export default BreadcrumbsPage
