import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { init, loadRemote } from '@module-federation/enhanced/runtime'

createApp(App).mount('#app')

init({
  name: 'consumer',
  remotes: [
    {
      name: 'stage-entry',
      entry: 'http://localhost:9000/mf-manifest.json',
      alias: 'entry',
    }
  ]
})

loadRemote('entry/init')

