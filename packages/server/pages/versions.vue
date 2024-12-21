<template>
  <ClientOnly>
    <ElButton @click="() => handleCreate()">新增</ElButton>
    <ElTable
      :data="list"
    >
      <ElTableColumn label="版本" prop="version" />
      <ElTableColumn label="名称" prop="name" />
      <ElTableColumn label="访问标签" prop="tags" />
      <ElTableColumn label="操作">
        <template #default="{row}">
          <ElButton
            text
            type="primary"
            :disabled="!row.id"
            @click="handleEdit(row)"
          >编辑</ElButton>
          <ElButton
            text
            type="danger"
            :disabled="!row.id"
            @click="handleDelete(row)"
          >删除</ElButton>
        </template>
      </ElTableColumn>
    </ElTable>

    <ElDialog v-model="show" width="550px">
      <ElForm
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <ElFormItem label="版本" prop="version">
          <ElInput v-model="form.version" />
        </ElFormItem>
        <ElFormItem label="名称" prop="name">
          <ElInput v-model="form.name" />
        </ElFormItem>
        <ElFormItem label="标签" prop="tags">
          <ElSelect
            v-model="form.tags"
            filterable
            allow-create
            multiple
          >
            <ElOption
              v-for="tag in tags"
              :key="tag"
              :label="tag"
              :value="tag"
            />
          </ElSelect>
        </ElFormItem>
      </ElForm>

      <template #footer>
        <footer>
          <ElButton>取消</ElButton>
          <ElButton @click="handleSubmit">确认</ElButton>
        </footer>
      </template>
    </ElDialog>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { UnwrapRef } from 'vue';


const res = await useAsyncData(() => request<any[]>('/api/versions'))
const list = shallowRef<any[]>(res.data.value || [])

async function getVersions() {
  const res = await request<any[]>('/api/versions')
  list.value = res
}

const tags = shallowRef<any[]>((await useAsyncData(() => request<any[]>('/api/tags'))).data.value || [])

const rules = {
  version: { required: true, message: '必填' },
  name: { required: true, message: '必填' },
  tags: { required: true, message: '必填' },
}

const show = ref(false)
const form = ref({
  tags: [],
  name: '',
  version: '',
})

function handleCreate() {
  show.value = true
  form.value = {
    name: '',
    version: '',
    tags: [],
  }
}


function handleEdit(row: UnwrapRef<typeof form>) {
  form.value = row
  show.value = true
}
async function handleDelete(row: { id: string }) {
  await request(`/api/versions/${row.id}`, { method: 'delete' })
  getVersions()
}

const formRef = useTemplateRef('formRef')
async function handleSubmit() {
  await formRef.value?.validate()
  await request('/api/versions', { method: 'POST', body: form.value })
  show.value = false

  getVersions()
}


watchEffect(() => {
  if (show.value) {
    nextTick().then(() => {
      formRef.value?.clearValidate()
    })
  }
}, { flush: 'post' })
</script>
