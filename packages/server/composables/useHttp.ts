export function request<T>(url: string, options: any = {}) {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$api<T>(url, options)
}
