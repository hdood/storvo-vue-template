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
      '^/(?!dist|src|node_modules|@vite|@id).*': `http://${config.sandboxId}.str.test`,
      // {
      //   target: `http://${config.sandboxId}.str.test`,
      // configure(proxy, options) {
      //   proxy.on('proxyRes', (proxyRes, req, res) => {
      //     let body: any = []
      //     proxyRes.on('data', function (chunk) {
      //       body.push(chunk)
      //     })
      //     proxyRes.on('end', function () {
      //       body = Buffer.concat(body).toString()
      //       console.log('res from proxied server:', body)
      //       res.end('my response to cli')
      //     })
      //   })
      // },
      // },
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
