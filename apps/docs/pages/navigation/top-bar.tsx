import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const TopBarPage = () => {
  const ShowTopBar = () => {
    return (
      <>
        <Column>
          <Row>TopBar</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>TopBar</NextTitle>

      <NextText color="Secondary">
        Secondary navigation that can be used for tabs, search, actions, etc.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowTopBar />
      </ShowcaseComponent>
    </Page>
  )
}

export default TopBarPage
