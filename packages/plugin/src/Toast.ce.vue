<template>
  <Transition name="fade">
    <div class="fixed top-1/2 bottom-1/2 left-1/2 right-1/2 w-60 h-20 transform -translate-x-1/2 -translate-y-1/2" v-if="show">

	    <div id="toast-default"
		    class="flex items-center w-full max-w-xs p-4 text-white bg-black bg-opacity-50 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
		    role="alert">
		    <div
			    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
			    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
				    <path fill-rule="evenodd"
					    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
					    clip-rule="evenodd"></path>
			    </svg>
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
  setTimeout(() => {
    show.value = false
  }, 1800)
})
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
