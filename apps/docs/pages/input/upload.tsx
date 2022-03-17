import { Column, Row, Page } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

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
      <ShowcaseHeader
        title="Upload"
        description={`
          Visual component to facilitate uploading files.
        `}
      />

      <ShowcaseComponent background="transparent">
        <ShowUpload />
      </ShowcaseComponent>
    </Page>
  )
}

export default UploadPage
