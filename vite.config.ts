import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-dom') || id.includes('node_modules/react/')) return 'vendor-react'
          if (id.includes('three') || id.includes('@react-three')) return 'vendor-three'
          if (id.includes('framer-motion') || id.includes('gsap')) return 'vendor-motion'
        },
      },
    },
  },
})
