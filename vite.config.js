import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * `__BUILD_YEAR__` is inlined identically into both the client bundle and the
 * SSR bundle, so the prerendered HTML and the client's first render agree on
 * the footer copyright year. Without it, `new Date().getFullYear()` would be
 * evaluated on the server at build time and again in the browser, which is a
 * hydration mismatch across a year boundary.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
})
