
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

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/npm'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
import '@kangc/v-md-editor/lib/style/preview-html.css';
import hljs from 'highlight.js';
import 'katex/dist/katex.min.css'
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
VMdEditor.use(createEmojiPlugin());
VMdEditor.use(createKatexPlugin());

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(VMdEditor);
app.use(VMdPreviewHtml);
app.use(router)
app.use(TDesign)
app.use(pinia)
app.use(plugin, { echarts, h });
app.directive('permission',permissionDirective)
app.mount('#app')
