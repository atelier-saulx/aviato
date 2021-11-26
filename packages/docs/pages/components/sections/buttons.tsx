import DisplayComponent from '../displayComponent'

import { Title } from '@aviato/ui'

const MenuPage = () => {
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
        <p>Button goes here</p>
      </DisplayComponent>
    </div>
  )
}

export default MenuPage