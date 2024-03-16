<template>
    <div class="topnav">
        <t-input-adornment prepend="标题">
            <t-input placeholder="请输入内容" v-model="title" />
        </t-input-adornment>
        <t-button theme="primary" class="btn" @click="handlerSave">
            保存
        </t-button>
    </div>
    <v-md-editor v-model="text" height="500px"></v-md-editor>
    <mark-dialog :show="showdialog" @close="onDialogClose" @confirm="handlerConfirm"></mark-dialog>
  </template>
  
  <script>
  import MarkDialog from '@/views/markdown/mark-dialog.vue'
  export default {
    components: {
        MarkDialog
    },
    data() {
      return {
        text: '',
        title: '',
        showdialog: false
      };
    },
    methods: {
        handlerSave() {
            this.showdialog = true
            console.log("1")
        },
        handlerConfirm() {
            this.showdialog = false
        },
        onDialogClose() {
            this.showdialog = false
        }
    },
  };
  </script>
  <style scoped lang="less">
  .topnav {
    display: flex;
    padding: 6px 6px;
    background-color: aliceblue;
    margin-bottom: 6px;
    .btn {
      margin-left: 10px;
    }
  }
</style>