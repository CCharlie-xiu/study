const reportMark = `
# 代码笔记模板

## 简介

本文档记录了一些代码示例以及相应的解释和注意事项，旨在帮助读者更好地理解和使用代码。

## 代码示例1

### <span style="color:blue">示例 1 - JavaScript</span>

\`\`\`javascript
function greet(name) {
    console.log(\`Hello, ${name}!\`);
}

greet("Alice");
\`\`\`

## 代码示例2

### <span style="color:blue">示例 2 - JavaScript</span>

\`\`\`javascript
function greet(name) {
    import { createPinia } from 'pinia';
    import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
    import { permissionDirective } from './directives/permission';
    import { plugin } from "echarts-for-vue";
    import * as echarts from "echarts";
}

greet("Alice");
\`\`\`

`

export default reportMark