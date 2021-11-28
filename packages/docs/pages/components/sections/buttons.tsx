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
        <Title fontWeight="bold">Buttons</Title>
      </div>

      <DisplayComponent name="Button">
        <Button variant="filled">Button</Button>
        <Button variant="outlined">Button</Button>
        <Button variant="transparent">Button</Button>
      </DisplayComponent>
    </div>
  )
}

export default ButtonsPage
