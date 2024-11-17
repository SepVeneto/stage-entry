import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  define: { 'process.env.NODE_ENV': '"production"' },
  server: {
    origin: 'http://localhost:9000',
    port: 9000,
  },
  base: 'http://localhost:5500',
  build: {
    lib: {
      name: 'STAGE_ENTRY',
      entry: './src/init.ts',
      formats: ['es'],
    }
  },
  plugins: [
    federation({
      name: 'core',
      manifest: true,
      exposes: {
        './init': './src/init',
      },
    }),
    vue(),
  ],
})
