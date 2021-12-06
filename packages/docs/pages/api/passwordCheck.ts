import { passwordCheckHandler } from '@storyofams/next-password-protect'

export default passwordCheckHandler(process.env.PASSWORD ?? '', {
  cookieName: 'authorization',
})
