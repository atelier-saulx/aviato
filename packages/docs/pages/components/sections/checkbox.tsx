import DisplayComponent from '../displayComponent'

import { Title, Checkbox } from '@aviato/ui'

const CheckboxPage = () => {
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
        <Title fontWeight="bold">Checkbox</Title>
      </div>

      <DisplayComponent name="Checkbox">
        <Checkbox disabled variant="medium" />
        <Checkbox variant="medium" />
        <Checkbox variant="primary" />
        <Checkbox variant="secondary" />
        <Checkbox variant="primary" size="small" />
        <Checkbox variant="secondary" size="small" />
      </DisplayComponent>
    </div>
  )
}

export default CheckboxPage
