/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3014
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  }
})
