
import { createApp, h } from 'vue'
import TDesign from 'tdesign-vue-next';
import App from './App.vue'
import router from "@/router"
import "@/assets/less/base.less"
import 'tdesign-vue-next/dist/reset.css';
import 'tdesign-vue-next/es/style/index.css';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { permissionDirective } from './directives/permission';
import { plugin } from "echarts-for-vue";
import * as echarts from "echarts";


const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(router)
app.use(TDesign)
app.use(pinia)
app.use(plugin, { echarts, h });
app.directive('permission',permissionDirective)
app.mount('#app')
