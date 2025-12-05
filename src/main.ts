import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import '@/assets/main.css'

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })

    console.log(pages)

    return pages[`./Pages/${name}.vue`] as any
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})
