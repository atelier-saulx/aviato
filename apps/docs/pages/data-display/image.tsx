import { Column, Row, Page, Image } from '@aviato/ui'

import {
  NextTitle,
  NextText,
  ShowcaseComponent,
  BigSpacer,
} from '../../components'

const ImagePage = () => {
  const ShowImage = () => {
    return (
      <>
        <Column>
          <Row>
            <Image
              src="https://i.pinimg.com/564x/13/59/44/1359448657b6bb68d565a2e6ddfc0b21.jpg"
              alt="Ryan Jones - Pain"
              width={200}
              caption="Ryan Jones ‘Pain’ album cover"
            />
          </Row>

          <BigSpacer />

          <Row>
            <Image
              src="https://images.unsplash.com/photo-1643039952431-38adfa91f320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200&q=80"
              alt="Alt"
              caption="This is caption below the image"
              width={200}
              height={120}
            />
          </Row>

          <BigSpacer />

          <Row>
            <Image
              src="https://picsum.invalid.invalid"
              alt="Alt"
              width={200}
              height={120}
              caption="Default placeholder"
            />
          </Row>

          <BigSpacer />

          <Row>
            <Image
              src="https://picsum.invalid.invalid"
              alt="Alt"
              width={200}
              height={120}
              placeholder="Custom placeholder"
            />
          </Row>
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
