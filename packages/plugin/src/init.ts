import { defineCustomElement } from 'vue'
import EntryCe from './Entry.ce.vue'
import { version } from '../package.json'

window.__STAGE_ENTRY_VERSION__ = version
console.log(
  `%cinfo`,
  "color: #409EFF; font-weight: bold ; padding: 4px;",
  `插件版本: ${version}`
)


const EntryElement = defineCustomElement(EntryCe)

customElements.define('stage-entry', EntryElement)

document.body.appendChild(document.createElement('stage-entry'))
