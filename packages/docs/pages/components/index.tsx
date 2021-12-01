import { styled } from '@aviato/ui'

import { NextTitle } from '../../components'

const RootDiv = styled('div', {
  paddingTop: 20,
  paddingBottom: 20,
})

const Components = () => {
  return (
    <RootDiv>
      <NextTitle weight="Bold">Components</NextTitle>
    </RootDiv>
  )
}

export default Components
