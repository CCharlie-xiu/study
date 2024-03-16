<template>
    <t-card :class="{ wide: isWide }">
        <v-md-editor v-model="text" height="473px" left-toolbar="undo redo | emoji customToolbar2 customToolbar3"></v-md-editor>
    </t-card>
</template>

<script>
import reportMark from './model/panel5';
export default {
  data() {
    return {
        text: ``,
        isWide: false, // 是否应用 wide 类
        wideWidth: 1200,
    };
  },
  mounted() {
    this.text = (reportMark)
  },
};


</script>

<style scoped lang="less">
.wide {
    width: 100%;
}
</style>