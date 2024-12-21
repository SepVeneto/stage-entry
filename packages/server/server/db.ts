import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import fs from 'node:fs'
import path from 'node:path'
import { v4 as uuidv4 } from 'uuid'

const dbPath = path.resolve(process.cwd(), 'db/data.xml')
const parser = new XMLParser()
const builder = new XMLBuilder()

const res = builder.build({
  data: [{ id: 0, version: 'stable', name: '稳定测试', tags: ['*'] }],
  tags: ['*'],
})

if (!fs.existsSync(dbPath) || !fs.readFileSync(dbPath).length) {
  fs.writeFileSync(dbPath, res)
}

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
    const list = Array.isArray(res) ? res : [res]
    return list.map(item => ({ ...item, tags: Array.isArray(item.tags) ? item.tags : [item.tags]}))
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
    const list = [...this.source]
    if (data.id) {
      const index = list.findIndex(item => item.id === data.id)
      list[index] = data as Record
      this.source = list
    } else {
      this.source = [...list, { ...data, id: uuidv4() }]
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
        this.tags = [...this.tags, tag]
      } else {
        this.tags = [tag]
      }
    })
    
    const res = builder.build(this.data)
    fs.writeFileSync(dbPath, res)
  }

  deleteData(id: string) {
    const list = [...this.source]
    const index = list.findIndex(item => item.id === id)
    list.splice(index, 1)
    this.source = list

    const res = builder.build(this.data)
    fs.writeFileSync(dbPath, res)
  }
}