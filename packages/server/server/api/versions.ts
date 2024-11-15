import { Db } from "../db"

export default defineEventHandler(async (evt) => {
  const db = new Db()
  const method = evt.method
  switch (method) {
    case 'POST':
      const body = await readBody(evt)
      db.updateTags(body.tags)
      db.updateData(body)
      return
    case 'GET':
      return db.source
  }
})