import { Db } from "../db";

export default defineEventHandler(async (evt) => {
  const method = evt.method
  const db = new Db()
  switch (method) {
    case 'POST': {
      const body = await readBody(evt)
      db.updateTags(body.tag)
      return 
    }
    case 'GET':
      return db.tags
  }
})