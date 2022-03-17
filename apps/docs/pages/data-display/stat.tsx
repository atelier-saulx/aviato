import { Column, Row, Page } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

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
      <ShowcaseHeader
        title="Stat"
        description={`
          Show data in a number or a graphical visual.
        `}
      />

      <ShowcaseComponent background="transparent">
        <ShowStat />
      </ShowcaseComponent>
    </Page>
  )
}

export default StatPage
