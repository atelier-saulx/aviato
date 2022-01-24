import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ImagePage = () => {
  const ShowImage = () => {
    return (
      <>
        <Column>
          <Row>Image</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Image</NextTitle>

      <NextText color="Secondary">Show an image in your app.</NextText>

      <ShowcaseComponent background="transparent">
        <ShowImage />
      </ShowcaseComponent>
    </Page>
  )
}

export default ImagePage
