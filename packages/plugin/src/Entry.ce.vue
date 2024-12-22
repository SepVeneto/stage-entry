<template>
  <button
    ref="btnRef"
    class="bg-white fixed w-10 h-10 rounded-full border flex justify-center items-center touch-none"
    :style="style"
    @click="handleClick"
  >
    <Icon class=" text-lg" />
  </button>

  <Transition>
    <div
      v-if="show"
      ref="modelRef"
      class="bg-white w-96 border shadow flex justify-center items-center flex-col p-5 transition-all absolute top-1/2 left-1/2 opacity-100 -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div class="mb-5">环境标签</div>
      <div class="rounded overflow-hidden p-2 border mb-5">
        <input
          class="focus:outline-none"
          placeholder="请输入环境标签"
          v-model="tag"
        >
      </div>
      <button
        class="w-20 h-10 rounded bg-blue-400 text-white"
        @click="handleSubmit"
      >切换</button>
    </div>
  </Transition>

  <Toast />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Icon from './Icon.vue'
import { onClickOutside, useDraggable } from '@vueuse/core';
import { useCookies } from '@vueuse/integrations/useCookies';
import Toast from './Toast.ce.vue';

const modelRef = ref()

const cookie = useCookies()

const btnRef = ref()
const { style } = useDraggable(btnRef, {
  initialValue: { x: window.innerWidth - 50, y: window.innerHeight - 50 }
})

onClickOutside(modelRef, () => {
  show.value = false
})
const tag = ref('')
const show = ref(false)
watch(show, (val) => {
  if (val) {
    tag.value = cookie.get('Stage-Tag')
  }
})
function handleClick() {
  show.value = true
}
function handleSubmit() {
  show.value = false
  const date = new Date()
  // TODO: 时间
  date.setTime(date.getTime() + 10000 * 24*3600*1000)
  cookie.set('Stage-Tag', tag.value, {
    path: '/',
    expires: date,
  })

  // @ts-expect-error: inject
  window.location.href = window.STAGE_ENTRY_URL
}
</script>

<style >
@import "./style.css";
</style>
