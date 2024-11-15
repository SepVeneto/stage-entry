import { Db } from "../db"

const DOMAIN = process.env.domain

export default defineEventHandler(async (evt) => {
  const db = new Db()
  const cookies = parseCookies(evt)
  const tag = cookies['Stage-Type']
  if (!tag) {
    return await sendRedirect(evt, `${DOMAIN}/stage/stable`, 302)
  }

  const res = db.findByTag(tag)
  if (!res) {
    return await sendRedirect(evt, `${DOMAIN}/stage/stable`, 302)
  }
  const version = normalizeVersion(res.version)
  return await sendRedirect(evt, `${DOMAIN}/stage/${version}/`, 302)
})


function normalizeVersion(version: string) {
  return version.replaceAll('.', '-')
}
