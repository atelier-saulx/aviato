import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const GridPage = () => {
  const ShowGrid = () => {
    return (
      <>
        <Column>
          <Row>Grid</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Grid</NextTitle>

      <NextText color="Secondary">Show information in a grid view.</NextText>

      <ShowcaseComponent background="transparent">
        <ShowGrid />
      </ShowcaseComponent>
    </Page>
  )
}

export default GridPage
