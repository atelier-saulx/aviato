import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

const ApplicationRootStyles = styled('div', {
  position: 'relative',
  display: 'flex',
  width: '100vw',
  height: '100vh',
  overflowX: 'hidden',
  overflowY: 'hidden',
  backgroundColor: '$Background2dp',
})

export type ApplicationRootProps = {}

export const ApplicationRoot: FunctionComponent<ApplicationRootProps> = ({
  children,
}) => {
  return <ApplicationRootStyles>{children}</ApplicationRootStyles>
}
