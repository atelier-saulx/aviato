import { Page, Column, Snippet } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const CodeSnippetPage = () => {
  return (
    <Page>
      <NextTitle>Code Snippet</NextTitle>

      <NextText color="Secondary">
        Show, copy and paste in a inline editor.
      </NextText>

      <ShowcaseComponent
        codeBlock={`
import { Snippet } from '@aviato/ui'

<Snippet language="bash">
npm install @aviato/ui
</Snippet>
      `}
      >
        <Column css={{ width: '100%' }}>
          <Snippet language="bash">npm install @aviato/ui</Snippet>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default CodeSnippetPage
