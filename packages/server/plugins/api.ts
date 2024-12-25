export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute()
  const config = useRuntimeConfig()
  const baseUrl = (import.meta.client ? (config.public.baseUrl) : config.baseUrl) as string
  const api = $fetch.create({
    baseURL: baseUrl,
    onRequest({ request, options, error }) {
      const cookie = useRequestHeader('cookie')
      cookie && options.headers.set('cookie', cookie)
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo({ name: 'auth', query: {
          redirect: decodeURIComponent(route.path)
        }}, { replace: true }))
      }
    }
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api
    }
  }
})
