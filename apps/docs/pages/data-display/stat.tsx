import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const StatPage = () => {
  const ShowStat = () => {
    return (
      <>
        <Column>
          <Row>Stat</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Stat</NextTitle>

      <NextText color="Secondary">
        Show data in a number or a graphical visual.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowStat />
      </ShowcaseComponent>
    </Page>
  )
}

export default StatPage
