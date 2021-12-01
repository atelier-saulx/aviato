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
        <Title>Checkbox</Title>
      </div>

      <DisplayComponent name="Checkbox">
        <Checkbox size="medium" />
        <Checkbox size="small" />
        <Checkbox disabled="disabled" />
        <Checkbox size="small" disabled="disabled" />
      </DisplayComponent>
    </div>
  )
}

export default CheckboxPage
