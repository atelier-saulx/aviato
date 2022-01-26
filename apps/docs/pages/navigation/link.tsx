import { Column, Row, Page, Link } from '@aviato/ui'

import {
  NextTitle,
  NextText,
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
