import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist'
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/globalStyles/variables.scss" as *;`
      }
    }
  }
})
