import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { init, loadRemote } from '@module-federation/enhanced/runtime'

createApp(App).use(router).mount('#app')


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




// prepare()
// async function prepare() {
//   // @ts-expect-error: 1
//   if (window.STAGE_ENTRY) {
//     await loadModule()
//   } else {
//     const script = document.createElement('script')
//     const domain = 'http://localhost:9000'
//     script.src = domain + '/remoteEntry.js?t=' + Date.now()
//     script.type = 'text/javascript'
//     script.async = true

//     script.addEventListener('load', async () => {
//       const module = await loadModule()
//     })
//     script.addEventListener('error', (err) => {
//       console.error('环境初始化失败', err)
//       // 兜底数据
//     })
//     document.body.appendChild(script)
//   }

// }

// async function loadModule() {
//   await __webpack_init_sharing__('default')
//   // @ts-expect-error: 1
//   const container = window.STAGE_ENTRY
//   // @ts-expect-error: 1
//   await container.init(__webpack_share_scopes__.default)
//   const factory = await container.get('./init')
//   const module = factory()
//   return module
// }
