import { Page, Accordion, useHasLoaded } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const AccordionPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  return (
    <Page>
      <NextTitle>Accordion</NextTitle>

      <NextText color="Secondary">
        Divide content into collapsible sections.
      </NextText>

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Accordion } from '@aviato/ui'

<Accordion>
  <Accordion.Item title="Multiple Section 1" active>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Accordion.Item>
  <Accordion.Item title="Multiple Section 2">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Accordion.Item>
  <Accordion.Item title="Multiple Section 3">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Accordion.Item>
</Accordion>
      `}
      >
        <Accordion>
          <Accordion.Item title="Multiple Section 1" active>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Accordion.Item>
          <Accordion.Item title="Multiple Section 2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Accordion.Item>
          <Accordion.Item title="Multiple Section 3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Accordion.Item>
        </Accordion>
      </ShowcaseComponent>

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Accordion } from '@aviato/ui'

<Accordion type="single">
  <Accordion.Item title="Single Section 1" active>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Accordion.Item>
  <Accordion.Item title="Single Section 2">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Accordion.Item>
  <Accordion.Item title="Single Section 3">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Accordion.Item>
</Accordion>
      `}
      >
        <Accordion type="single">
          <Accordion.Item title="Single Section 1" active>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Accordion.Item>
          <Accordion.Item title="Single Section 2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Accordion.Item>
          <Accordion.Item title="Single Section 3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Accordion.Item>
        </Accordion>
      </ShowcaseComponent>
    </Page>
  )
}

export default AccordionPage
