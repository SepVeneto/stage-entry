import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (evt) => {

  const res = readBody(evt)
  console.log(res)

  const session = await useSession(evt, {
    name: 'STAGE_ENTRY_SESSION',
    password: '70d42cfb-1cd2-462c-8f17-e3237d9027e9',
  })
  const nonce= uuidv4()
  await session.update({
    nonce,
  })
  // setCookie(evt, 'STAGE_ENTRY_SESSION', )
  return sendRedirect(evt, '/versions', 302)
})
