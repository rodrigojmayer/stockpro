import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // headers: {
      // 'Content-Security-Policy': "script-src 'self' 'unsafe-inline' https://apis.google.com; script-src-elem 'self' 'unsafe-inline'"
      // 'Content-Security-Policy': "script-src 'self' 'unsafe-inline' https://apis.google.com/js/api.js'unsafe-eval'; object-src 'self'"
      // "content_security_policy": "script-src 'self' https://apis.google.com/js/api.js 'unsafe-eval'; object-src 'self'"
    // }
  }
})
