import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap"
import "./styles/main.css"
import mitt from 'mitt';
const emitter = mitt();

loadFonts()

const app = createApp(App)
app.config.globalProperties.emitter = emitter;
app.use(vuetify)
  .use(router)
  .mount('#app')
