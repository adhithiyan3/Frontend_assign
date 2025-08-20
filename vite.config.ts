import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), 
    react()],
      test: {
    globals: true,               // allows using "describe", "it", "expect" globally
    environment: 'jsdom',        // simulates a browser-like DOM for testing React
    setupFiles: './src/tests/setup.ts', // sets up matchers like "@testing-library/jest-dom"
  },
})
