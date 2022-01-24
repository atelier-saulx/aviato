import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const UploadPage = () => {
  const ShowUpload = () => {
    return (
      <>
        <Column>
          <Row>Upload</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Upload</NextTitle>

      <NextText color="Secondary">
        Visual component to facilitate uploading files.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowUpload />
      </ShowcaseComponent>
    </Page>
  )
}

export default UploadPage
