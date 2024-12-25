<template>
  <Transition name="fade">
    <div class="fixed top-1/2 bottom-1/2 left-1/2 right-1/2 w-60 h-20 transform -translate-x-1/2 -translate-y-1/2" v-if="show">

	    <div id="toast-default"
		    class="flex items-center w-full max-w-xs p-4 text-white bg-black bg-opacity-50 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
		    role="alert">
		    <div
			    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
          <svg t="1735118438317" class="w-5 h-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5091" width="200" height="200"><path d="M463.6416 161.28a44.7552 44.7552 0 0 1 40.4032 12.2752l393.7216 393.7152a44.8 44.8 0 0 1 0 63.36l-262.4832 262.4768a44.8 44.8 0 0 1-63.36 0L178.2208 499.3856a44.7232 44.7232 0 0 1-12.8-37.0944V212.4864a51.2 51.2 0 0 1 51.2-51.2h247.0272zM381.856 359.104c24.9984-24.9984 24.9984-65.5232 0-90.5152-24.992-24.992-65.5168-24.992-90.5088 0-24.992 24.992-24.992 65.5168 0 90.5088 24.992 24.992 65.5168 24.992 90.5088 0z" fill="#59AAFF" p-id="5092"></path></svg>
		    </div>
		    <div class="ml-3 text-sm font-normal">{{message}}</div>
	    </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { useCookies } from '@vueuse/integrations/useCookies';
import { onMounted, ref } from 'vue';

const show = ref(false)
const message = ref('')
const cookie = useCookies()
onMounted(() => {
  show.value = true
  const tag = cookie.get('Stage-Tag')
  message.value = '当前环境标签：' + (tag || '稳定测试')
  console.log(
    `%cinfo`,
    "color: #409EFF; font-weight: bold ; padding: 4px;",
    message.value
  )
  setTimeout(() => {
    show.value = false
  }, config.duration)
})

let config = {
  duration: 3000,
}
loadConfig()
function loadConfig() {
  const customConfig = window.__STAGE_ENTRY__ || {}
  config = {
    ...config,
    ...customConfig,
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
