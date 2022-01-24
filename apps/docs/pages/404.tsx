import { styled, Page } from '@aviato/ui'
import { NextTitle, NextText } from '../components'

const StyledDiv = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
})

function NotFound() {
  return (
    <Page>
      <StyledDiv>
        <NextTitle>🔍 404 🔍</NextTitle>

        <NextText>We could not find the page you were looking for...</NextText>
      </StyledDiv>
    </Page>
  )
}

export default NotFound
