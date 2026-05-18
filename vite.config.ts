import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 3000,
    port: parseInt(process.env.VITE_PORT || '5000', 10),
    // port: 8080,
    // headers: {
      // 'Content-Security-Policy': "script-src 'self' 'unsafe-inline' https://apis.google.com; script-src-elem 'self' 'unsafe-inline'"
      // 'Content-Security-Policy': "script-src 'self' 'unsafe-inline' https://apis.google.com/js/api.js'unsafe-eval'; object-src 'self'"
      // "content_security_policy": "script-src 'self' https://apis.google.com/js/api.js 'unsafe-eval'; object-src 'self'"
    // }
    allowedHosts: ['stockpro-deploy.onrender.com'], // ✅ Add this line
  },
  // optimizeDeps: {
  //   exclude: ['filestack-react'],
  // },
  // ssr: {
  //   noExternal: ['filestack-react'], // ensures it's bundled if SSR
  // },
  // resolve: {
  //   alias: {
  //     // Make sure to use the correct path to your `@svgr/webpack` installation
  //     'react-svg': '@svgr/webpack?-svgo,+titleProp,+ref!@svgr/webpack',
  //   },
  // },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
})