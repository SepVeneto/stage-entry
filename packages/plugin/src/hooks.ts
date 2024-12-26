const DEFAULT_CONFIG = {
  duration: 3000,
  zIndex: 9999,
}
export function useConfig() {
  const config = window.__STAGE_ENTRY__ || {}
  return {
    ...DEFAULT_CONFIG,
    ...config,
  }
}