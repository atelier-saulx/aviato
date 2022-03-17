import { Column, Row, Page, Link } from '@aviato/ui'

import {
  ShowcaseHeader,
  ShowcaseComponent,
  SmallSpacer,
} from '../../components'

const LinkPage = () => {
  const ShowLink = () => {
    return (
      <>
        <Column>
          <Row>
            <Link href="https://aviato.design">Visit aviato</Link>
          </Row>

          <SmallSpacer />

          <Row>
            <Link href="https://aviato.design" useIcon>
              Visit aviato
            </Link>
          </Row>

          <SmallSpacer />

          <Row>
            <Link href="https://aviato.design" useIcon underline>
              Visit aviato
            </Link>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Link"
        description={`
          Links are accessible elements used primarily for navigation.
        `}
      />

      <ShowcaseComponent background="transparent">
        <ShowLink />
      </ShowcaseComponent>
    </Page>
  )
}

export default LinkPage
