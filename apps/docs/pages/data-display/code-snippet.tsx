import { Page, Column, Prism } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const CodeSnippetPage = () => {
  return (
    <Page>
      <NextTitle>Code Snippet</NextTitle>

      <NextText color="Secondary">
        Show, copy and paste in a inline editor.
      </NextText>

      <ShowcaseComponent>
        <Column css={{ width: '100%' }}>
          <Prism language="bash">npm install @aviato/ui</Prism>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default CodeSnippetPage
