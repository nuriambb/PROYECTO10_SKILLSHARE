import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist'
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/globalStyles/_variables.scss";`
      }
    }
  }
})
