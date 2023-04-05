import { createApp } from 'vue'
import 'uno.css'
import '@storyblok/design-system/dist/storyblok-design-system.css'
import BlokInk from '@storyblok/design-system'
/* import '@unocss/reset/tailwind-compat.css' */

import './style.css'
import App from './App.vue'


if (!document.querySelector('#app')) {
  const rootElement = document.createElement('div')
  rootElement.id = 'app'
  document.body.appendChild(rootElement)
}
const app = createApp(App)
app.use(BlokInk)
app.mount('#app')
