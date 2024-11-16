import type { UseFetchOptions } from "#app"
import type { KeysOf } from '#app/composables/asyncData'

const fetch = $fetch.create({
  onResponse(config) {
    if (config.response.status === 401) {
      const route = useRoute()
      navigateTo({ name: 'auth', query: { redirect: decodeURIComponent(route.path) }})
    }
  }
})

type HttpOption<T> = UseFetchOptions<T, T, KeysOf<T>, any>
export function useHttp<T>(url: string, options: HttpOption<T> = {}) {
  // @ts-expect-error: 1
  return fetch<T>(url, {
    ...options
  })
}