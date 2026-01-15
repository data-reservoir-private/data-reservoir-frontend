// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ['@mui/*']
  },
  plugins: [
    tsconfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  optimizeDeps: {
    include: ['@clerk/tanstack-react-start', 'cookie']
  },
  resolve: {
    alias: [
      {
        find: "use-sync-external-store/shim/index.js",
        replacement: "react",
      },
      {
        find: "cookie",
        replacement: "cookie-es",
      },
    ],
  },
});