import {
  useContextMenu,
  ContextItem,
  Page,
  Button,
  IconMore,
  IconSchedule,
  ContextDivider,
} from '@aviato/ui'
import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const SimpleMenu = () => {
  return (
    <>
      <ContextItem>Do something</ContextItem>
      <ContextItem inset>Do something else</ContextItem>
      <ContextItem
        onClick={() => {
          alert('close it')
        }}
        leftIcon={<IconSchedule color="$PrimaryMain" />}
        // right icon only show on hover
        // rightOnHover
        rightIcon={
          <IconMore
            onClick={() => {
              alert('snapje')
            }}
          />
        }
      >
        Flap
      </ContextItem>
    </>
  )
}

const LargeMenu = () => {
  const a = []
  for (let i = 0; i < 100; i++) {
    a.push(i)
  }
  return (
    <>
      {a.map((v, i) => {
        return (
          <ContextItem inset key={i}>
            {i} Do something
          </ContextItem>
        )
      })}
    </>
  )
}

const DoubleOverlayMenu = () => {
  return (
    <>
      <ContextItem onClick={() => {}}>Keep it 💯</ContextItem>
      <ContextItem>yes</ContextItem>
      <ContextItem>yolo</ContextItem>
      <ContextDivider />
      <ContextItem onClick={() => {}}>Keep it 💯</ContextItem>
      <ContextItem>yes</ContextItem>
      <ContextItem>yolo</ContextItem>
      <ContextDivider />
      <ContextItem
        onClick={useContextMenu(
          SimpleMenu,
          {},
          { position: 'right', offset: { x: -20, y: 10 } }
        )}
      >
        Keep it 💯
      </ContextItem>
      <ContextItem
        onClick={useContextMenu(
          SimpleMenu,
          {},
          { position: 'left', offset: { x: 20, y: 10 } }
        )}
      >
        yes + offset
      </ContextItem>
      <ContextItem
        rightIcon={<IconSchedule />}
        onClick={useContextMenu(LargeMenu, {}, { position: 'left' })}
      >
        Click me!
      </ContextItem>
    </>
  )
}

const ContextMenuPage = () => {
  return (
    <Page>
      <ShowcaseHeader
        title="Context Menu"
        description={`
          This component can be used anywhere to prompt a menu near the area where
          you click a select or button component.
        `}
      />
      <ShowcaseComponent background="transparent">
        <div>
          <Button
            css={{ marginBottom: 24 }}
            onClick={useContextMenu(DoubleOverlayMenu, { flap: 1 })}
          >
            Menu (double overlays)
          </Button>

          <Button
            onClick={useContextMenu(SimpleMenu, {}, { placement: 'center' })}
            css={{
              marginBottom: 24,
            }}
          >
            Menu (placement: center)
          </Button>

          <Button
            onClick={useContextMenu(SimpleMenu, {}, { placement: 'left' })}
            css={{
              marginBottom: 24,
            }}
          >
            Menu (placement: left)
          </Button>

          <Button
            onClick={useContextMenu(SimpleMenu, {}, { placement: 'right' })}
            css={{
              marginBottom: 24,
            }}
          >
            Menu (placement: right)
          </Button>

          <Button
            onClick={useContextMenu(SimpleMenu, {}, { position: 'top' })}
            css={{
              marginBottom: 24,
            }}
          >
            Menu (position: top)
          </Button>

          <Button
            onClick={useContextMenu(SimpleMenu, {}, { position: 'left' })}
            css={{
              marginBottom: 24,
            }}
          >
            Menu (position: left)
          </Button>

          <Button
            onClick={useContextMenu(SimpleMenu, {}, { position: 'right' })}
            css={{
              marginBottom: 24,
            }}
          >
            Menu (position: right)
          </Button>

          <Button
            onClick={useContextMenu(
              SimpleMenu,
              {},
              { position: 'left', variant: 'over' }
            )}
            css={{
              marginBottom: 24,
            }}
          >
            Menu (variant: over / position: left)
          </Button>

          <Button
            onClick={useContextMenu(
              SimpleMenu,
              {},
              { variant: 'over', placement: 'left' }
            )}
            css={{
              marginBottom: 24,
            }}
          >
            Menu (variant: over / placement: left)
          </Button>

          <Button
            css={{
              marginBottom: 24,
            }}
            onClick={useContextMenu(LargeMenu)}
          >
            Menu (large menu)
          </Button>
          <Button
            onClick={useContextMenu(DoubleOverlayMenu, { props: { flap: 1 } })}
          >
            Menu (double overlays)
          </Button>
        </div>
      </ShowcaseComponent>
    </Page>
  )
}

export default ContextMenuPage
