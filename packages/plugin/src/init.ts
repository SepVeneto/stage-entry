import { defineCustomElement } from 'vue'
import EntryCe from './Entry.ce.vue'

const EntryElement = defineCustomElement(EntryCe)

customElements.define('stage-entry', EntryElement)

document.body.appendChild(document.createElement('stage-entry'))
