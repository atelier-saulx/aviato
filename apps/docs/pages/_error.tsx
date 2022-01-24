import { NextPageContext } from 'next'
import { styled, Page } from '@aviato/ui'
import { NextTitle, NextText } from '../components'

const StyledDiv = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
})

const getError = ({ res, err }: Partial<NextPageContext>) => {
  let statusCode = 404

  if (res) {
    statusCode = res?.statusCode || err?.statusCode || 500
  }

  return { statusCode }
}

const getContent = ({ statusCode }: { statusCode: number }) => {
  type StatusType = 'notFound' | 'internal' | 'unauthorized' | 'unknown'

  const errorCodeMap: { [key: number]: StatusType } = {
    401: 'unauthorized',
    404: 'notFound',
    500: 'internal',
  }

  const errorStatus: StatusType = errorCodeMap[statusCode] ?? 'unknown'

  const statusMap: { [key in StatusType]: string } = {
    unauthorized: "It looks like you're not supposed to be here",
    notFound: 'We could not find the page you were looking for',
    internal: '🔥 Our server had some trouble processing that request 🔥',
    unknown: "🤯 Even we don't know what happened 🤯",
  }

  return statusMap[errorStatus]
}

const Error = ({ statusCode }: { statusCode: number }) => {
  return (
    <Page>
      <StyledDiv>
        <NextTitle>🔍 {statusCode} 🔍</NextTitle>

        <NextText>{getContent({ statusCode })}</NextText>
      </StyledDiv>
    </Page>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  return getError({ res, err })
}

export default Error
