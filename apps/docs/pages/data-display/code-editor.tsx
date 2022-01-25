import { Page, Column, Editor } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const CodeEditorPage = () => {
  return (
    <Page>
      <NextTitle>Code Editor</NextTitle>

      <NextText color="Secondary">Edit code in an inline editor.</NextText>

      <ShowcaseComponent
        codeBlock={`
import { Editor } from '@aviato/ui'

<Editor language="bash">
npm install @aviato/ui
</Editor>
      `}
      >
        <Column css={{ width: '100%' }}>
          <Editor language="bash">npm install @aviato/ui</Editor>
        </Column>
      </ShowcaseComponent>
    </Page>
  )
}

export default CodeEditorPage
