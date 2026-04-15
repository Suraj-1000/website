import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


  plugins: [react()],
  root: "src",
  envDir: "../",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '127.0.0.1',
    hmr: {
      host: '127.0.0.1',
      protocol: 'ws',
    },
  },
})
