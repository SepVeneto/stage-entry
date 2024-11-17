import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { init, loadRemote } from '@module-federation/enhanced/runtime'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


init({
  name: 'consumer',
  remotes: [
    {
      name: 'stage-entry',
      entry: 'http://localhost:5500/mf-manifest.json',
      alias: 'entry',
    }
  ]
})

loadRemote('entry/init')

