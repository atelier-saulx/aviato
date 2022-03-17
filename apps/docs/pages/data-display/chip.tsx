import { Column, Row, Page, Chip, ChipItem } from '@aviato/ui'
import { log } from '@aviato/utils'

import {
  NextText,
  ShowcaseHeader,
  ShowcaseComponent,
  BigSpacer,
} from '../../components'

const ChipPage = () => {
  const ShowChip = () => {
    return (
      <>
        <Column>
          <NextText color="Secondary">Single selection</NextText>
          <Row>
            <Chip
              onChange={(value) => {
                log.global.debug('Chip change: ', { value })
              }}
            >
              <ChipItem value="option-1">Option 1</ChipItem>
              <ChipItem value="option-2">Option 2</ChipItem>
              <ChipItem value="option-3">Option 3</ChipItem>
              <ChipItem value="option-4">Option 4</ChipItem>
            </Chip>
          </Row>

          <BigSpacer />

          <NextText color="Secondary">Multiple selections</NextText>
          <Row>
            <Chip
              multiple
              onChange={(value) => {
                log.global.debug('Chip change: ', { value })
              }}
            >
              <ChipItem value="option-1">Option 1</ChipItem>
              <ChipItem value="option-2">Option 2</ChipItem>
              <ChipItem value="option-3">Option 3</ChipItem>
              <ChipItem value="option-4">Option 4</ChipItem>
            </Chip>
          </Row>

          <BigSpacer />

          <NextText color="Secondary">Outline</NextText>
          <Row>
            <Chip type="outline">
              <ChipItem value="option-1">Option 1</ChipItem>
              <ChipItem value="option-2">Option 2</ChipItem>
              <ChipItem value="option-3">Option 3</ChipItem>
              <ChipItem value="option-4">Option 4</ChipItem>
            </Chip>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Chip"
        description={`
          Alternative to Select and Radio Button.
        `}
      />

      <ShowcaseComponent background="transparent">
        <ShowChip />
      </ShowcaseComponent>
    </Page>
  )
}

export default ChipPage
