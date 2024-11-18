import { Db } from "../db"

const DOMAIN = process.env.DOMAIN

export default defineEventHandler(async (evt) => {
  const db = new Db()
  const cookies = parseCookies(evt)
  const tag = cookies['Stage-Tag']
  if (!tag) {
    return await sendRedirect(evt, `${DOMAIN}/stage/stable`, 302)
  }

  const res = db.findByTag(tag)
  if (!res) {
    return await sendRedirect(evt, `${DOMAIN}/stage/stable`, 302)
  }
  const version = normalizeVersion(res.version)
  const target = res.target
  return await sendRedirect(evt, `${DOMAIN}/stage/${version}/${target}`, 302)
})


function normalizeVersion(version: string) {
  return version.replaceAll('.', '-')
}
