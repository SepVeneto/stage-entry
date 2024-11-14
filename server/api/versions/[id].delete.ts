import { Db } from "~/server/db"

export default defineEventHandler((evt) => {
  const db = new Db()

  const id = evt.context.params?.id
  if (id) {
    db.deleteData(id)
  }
})