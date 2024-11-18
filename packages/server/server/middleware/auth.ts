import { navigateTo } from "nuxt/app"


const IGNORE_LIST = [
  'distribute',
  'auth',
  'api/auth',
]

const publicPath = process.env.BASE_URL
export default defineEventHandler(async (evt) => {
  const url = getRequestURL(evt)
  const ignore = IGNORE_LIST.some(rule => {
    const regRoute = new RegExp(`${publicPath}/${rule}`)
    return regRoute.test(url.pathname)
  })
  if (ignore) {
    return
  }

  const session = await useSession(evt, {
    name: 'STAGE_ENTRY_SESSION',
    password: '70d42cfb-1cd2-462c-8f17-e3237d9027e9',
  })
  if (!session.data?.nonce) {
    switch (evt.method) {
      case 'POST':
        setResponseStatus(evt, 401)
        return 401
      case 'GET':
        return sendRedirect(evt, publicPath + '/auth' + `?redirect=${decodeURIComponent(url.pathname)}`, 401)
    }
  }
})