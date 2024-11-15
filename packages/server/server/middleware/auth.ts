import { v4 as uuidv4 } from 'uuid'

const publicPath = process.env.public
export default defineEventHandler(async (evt) => {
  const url = getRequestURL(evt)
  console.log(url.pathname)
  if (!url.pathname.includes('/versions')) {
    return
  }

  const session = await useSession(evt, {
    name: 'STAGE_ENTRY_SESSION',
    password: '70d42cfb-1cd2-462c-8f17-e3237d9027e9',
  })
  console.log(session.data)
  const _session = getCookie(evt, 'STAGE_ENTRY_SESSION')
  console.log(_session)
  if (!_session) {
    return sendRedirect(evt, publicPath + '/auth', 302)
  }
})