<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="w-96 h-48 border flex items-center justify-center p-5 shadow rounded flex-col">
      <div class="mb-5">密码</div>
      <ElInput
        v-model="password"
        type="password"
        @keydown.enter="onLogin"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const password = ref('')

function onLogin() {
  $fetch('/api/auth', { method: 'post', body: { pwd: password.value }})
}
</script>
