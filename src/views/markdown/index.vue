<template>
    <div class="topnav">
        <t-input-adornment prepend="标题">
            <t-input placeholder="请输入标题" v-model="notename" />
        </t-input-adornment>
        <t-button theme="primary" class="btn" @click="handlerSave">
            保存
        </t-button>
    </div>
    <v-md-editor v-model="text" height="500px"></v-md-editor>
    <mark-dialog :show="showdialog" @close="onDialogClose" @confirm="handlerConfirm"></mark-dialog>
  </template>
  
  <script>
  import markwrite from '@/api/markwrite';  
  import MarkDialog from '@/views/markdown/mark-dialog.vue'
  import { MessagePlugin } from 'tdesign-vue-next';
  import { useUserStore } from '@/store';
  const userStore = useUserStore()
  const user = userStore.currentUser || ''
  export default {
    components: {
        MarkDialog
    },
    data() {
      return {
        text: '',
        notename: '',
        showdialog: false,
        formData: {} 
      };
    },
    methods: {
        handlerSave() {
            this.showdialog = true
            console.log("1")
        },
        async handlerConfirm(formData) {
            MessagePlugin.info('数据保存中...', 1000);
            const timer = setTimeout(async () => {
              clearTimeout(timer);
              this.showdialog = false
              const { storename, keys } = formData;
              const res = await markwrite.create(this.text,storename,this.notename,keys,user)
              console.log(this.notename,this.text,storename,keys,res,this.formData);
              MessagePlugin.info('数据保存成功!');
            }, 1000);
           
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