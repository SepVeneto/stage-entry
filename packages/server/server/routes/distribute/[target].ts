import { stringifyQuery } from "vue-router"
import { Db } from "../../db"

const DOMAIN = process.env.DOMAIN

export default defineEventHandler(async (evt) => {
  const target = evt.context.params?.target || ''
  const query = getQuery(evt)
  console.log('params', evt.context.params)
  console.log('query', query)

  const db = new Db()
  const cookies = parseCookies(evt)
  const tag = cookies['Stage-Tag']
  if (!tag) {
    const url = normalizeUrl(`${DOMAIN}/stage/stable/${target}/`, query)
    return await sendRedirect(evt, url, 302)
  }

  const res = db.findByTag(tag)
  if (!res) {
    const url = normalizeUrl(`${DOMAIN}/stage/stable/${target}/`, query)
    return await sendRedirect(evt, url, 302)
  }
  const version = normalizeVersion(res.version)
  const url = normalizeUrl(`${DOMAIN}/stage/${version}/${target}/`, query)
  return await sendRedirect(evt, url, 302)
})


function normalizeVersion(version: string) {
  return version.replaceAll('.', '-')
}

function normalizeUrl(url: string, query: Record<string, any>) {
  return [url, stringifyQuery(query)].filter(item => !!item).join('?')
}

