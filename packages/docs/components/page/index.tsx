import { FunctionComponent } from 'react'
import { styled } from '@aviato/ui'

const PageWrapperDiv = styled('div', {
  display: 'flex',
  flexFlow: 'column nowrap',
  padding: '20px',
  width: '100%',
})

export type PageProps = {}

export const Page: FunctionComponent<PageProps> = ({ children }) => {
  return <PageWrapperDiv>{children}</PageWrapperDiv>
}
