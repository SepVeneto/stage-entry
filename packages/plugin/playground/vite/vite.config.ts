// import { federation } from "@module-federation/vite";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // federation({
    //   name: 'consumer',
    //   filename: 'remoteEntry.js'
    // }),
    vue(),
  ],
})
