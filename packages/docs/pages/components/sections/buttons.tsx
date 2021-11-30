import DisplayComponent from '../displayComponent'

import { Title, Button } from '@aviato/ui'

const ButtonsPage = () => {
  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <div
        style={{
          paddingLeft: 20,
        }}
      >
        <Title weight="Bold">Buttons</Title>
      </div>

      <DisplayComponent name="Buttons">
        <Button variant="filled">Button</Button>
        <Button variant="outlined">Button</Button>
        <Button variant="transparent">Button</Button>
      </DisplayComponent>

      <DisplayComponent name="Disabled Buttons">
        <Button disabled variant="filled">
          Button
        </Button>
        <Button disabled variant="outlined">
          Button
        </Button>
        <Button disabled variant="transparent">
          Button
        </Button>
      </DisplayComponent>
    </div>
  )
}

export default ButtonsPage
