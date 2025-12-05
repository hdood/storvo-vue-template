import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import config from './config.json'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { JSDOM } from 'jsdom'
import { readFileSync } from 'node:fs'

const indexHtmlPath = path.resolve(__dirname, 'index.html')

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '^/(?!dist|src|node_modules|@vite|@id).*':
        // works
        //  `http://${config.sandboxId}.str.test`,

        // does not work
        {
          target: `http://${config.sandboxId}.str.test`,
          changeOrigin: true,
          configure(proxy, options) {
            proxy.on('proxyReq', function (proxyReq, req, res, options) {
              proxyReq.setHeader('X-SANDBOX', '1')
            })
          },
        },
    },
  },
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
