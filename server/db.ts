import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import fs from 'node:fs'
import path from 'node:path'
import { v4 as uuidv4 } from 'uuid'

const dbPath = path.resolve(process.cwd(), 'db.xml')
const parser = new XMLParser()
const builder = new XMLBuilder()

const res = builder.build({
  data: [],
  tags: [],
})
fs.writeFileSync(dbPath, res)

type Record = {
  id: string,
  version: string,
  name: string,
  tags: string[],
}
type DbData = { data: Record | Record[], tags: string[] }

export class Db {
  public data: DbData

  constructor() {
    this.data = parser.parse(fs.readFileSync(dbPath))
  }

  findByTag(tag: string) {
    return this.source.find(item => {
      const tags = (Array.isArray(item.tags) ? item.tags : [item.tags]).map(item => String(item))
      return tags.includes(tag)
    })
  }

  get source() {
    const res = this.data.data
    return Array.isArray(res) ? res : [res]
  }
  set source(val) {
    this.data.data = val
  }

  get tags() {
    if (!this.data.tags) return []

    return Array.isArray(this.data.tags) ? this.data.tags : [this.data.tags]
  }

  set tags(val) {
    this.data.tags = val || []
  }

  updateData(data: Omit<Record, 'id'> & { id?: string }) {
    if (data.id) {
      const index = this.source.findIndex(item => item.id === data.id)
      this.source[index] = data as Record
    } else {
      this.source.push({ ...data, id: uuidv4() })
    }

    const res = builder.build(this.data)
    fs.writeFileSync(dbPath, res)
    return
  }

  updateTags(tags: string[]) {
    tags.forEach(tag => {
      if (this.tags?.includes(tag)) {
        return
      }
      if (this.tags) {
        this.tags.push(tag)
      } else {
        this.tags = [tag]
      }
    })
    
    const res = builder.build(this.data)
    fs.writeFileSync(dbPath, res)
  }

  deleteData(id: string) {
    const index = this.source.findIndex(item => item.id === id)
    this.source.splice(index, 1)

    const res = builder.build(this.data)
    fs.writeFileSync(dbPath, res)
  }
}