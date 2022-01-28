import { Page, Column, CodeSnippet } from '@aviato/ui'

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
import { CodeSnippet } from '@aviato/ui'

<CodeSnippet language="bash">
npm install @aviato/ui
</CodeSnippet>
      `}
      >
        <Column css={{ width: '100%' }}>
          <CodeSnippet language="bash">npm install @aviato/ui</CodeSnippet>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default CodeSnippetPage
