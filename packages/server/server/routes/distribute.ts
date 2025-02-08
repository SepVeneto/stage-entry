import { stringifyQuery } from "vue-router"
import { Db } from "../db"

const DOMAIN = process.env.DOMAIN

export default defineEventHandler(async (evt) => {
  const db = new Db()
  const cookies = parseCookies(evt)
  const tag = cookies['Stage-Tag']
  const query = getQuery(evt)
  console.log('query', query)

  if (!tag) {
    const url = normalizeUrl(`${DOMAIN}/stage/stable/`, query)
    return await sendRedirect(evt, url, 301)
  }

  const res = db.findByTag(tag)
  if (!res) {
    const url = normalizeUrl(`${DOMAIN}/stage/stable/`, query)
    return await sendRedirect(evt, url, 301)
  }
  const version = normalizeVersion(res.version)
  const url = normalizeUrl(`${DOMAIN}/stage/${version}/`, query)
  return await sendRedirect(evt, url, 301)
})


function normalizeVersion(version: string) {
  return version.replaceAll('.', '-')
}

function normalizeUrl(url: string, query: Record<string, any>) {
  return [url, stringifyQuery(query)].filter(item => !!item).join('?')
}
