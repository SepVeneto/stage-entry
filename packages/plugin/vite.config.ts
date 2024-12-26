import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite'
import vue from '@vitejs/plugin-vue'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vite.dev/config/
export default defineConfig({
  define: { 'process.env.NODE_ENV': '"production"' },
  server: {
    origin: 'http://localhost:9000',
    port: 9000,
  },
  build: {
    outDir: '../server/public/plugin',
    target: 'chrome69',
    emptyOutDir: true,
    lib: {
      name: 'STAGE_ENTRY',
      entry: './src/init.ts',
      formats: ['es'],
    }
  },
  plugins: [
    // 兼容chrome89以下的版本
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    }),
    federation({
      name: 'core',
      manifest: true,
      getPublicPath: 'return window.STAGE_ENTRY_PLUGIN',
      exposes: {
        './init': './src/init',
      },
    }),
    vue(),
  ],
})
