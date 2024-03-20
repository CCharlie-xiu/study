<template>
    <t-card>
        <div class="search-area">
            <t-input class="search-input" placeholder="根据关键词查找笔记" v-model="keysword"></t-input>
            <t-button @click="searchwithkeysword" >
                <template #icon>
                    <t-icon name="search" />
                  </template>
            </t-button>
        </div>
        <div v-for="(item,index) in infoCard" :key="index" style="margin-top: 6px">
            <t-card :bordered="false" hover-shadow style="margin: 3px 0">
                <t-descriptions column="6">
                    <t-descriptions-item label="笔记名称"  class="description-item">{{item.NoteName}}</t-descriptions-item>
                    <t-descriptions-item label="创建时间">{{formatDate(item.UpdatedAt) }}</t-descriptions-item>
                    <t-descriptions-item label="关键词" style="width:200px">{{item.Keysword}}</t-descriptions-item>
                    <t-descriptions-item label="仓库">{{item.StoreName}}</t-descriptions-item>
                    <t-descriptions-item label="上次更新">{{formatDate(item.UpdatedAt) }}</t-descriptions-item>
                    <t-descriptions-item label="操作">
                      <t-button @click="handlerOpen(item.NoteName)">打开</t-button>
                      &nbsp;&nbsp;<t-button @click="handlerDelete(item.NoteName)">删除</t-button></t-descriptions-item>
                  </t-descriptions>
            </t-card>
        </div>
        <div>
          <t-dialog v-model:visible="deleable" :on-confirm="onconfirmclick">
            <p>你确定要删除关于“ {{ Notename }} ”的笔记吗</p>
          </t-dialog>
        </div>
    </t-card>
    <t-drawer v-model:visible="visible" :header="header" :on-confirm="onClickConfirm" :close-btn="true" size="87%" >
      <v-md-editor v-model="markdownText" :preview="true" />
    </t-drawer>
  </template>
  
  <script lang="ts" setup>
  import markwriteApi from "@/api/markwrite";
  import { useUserStore } from "@/store";
  import { MessagePlugin, type DrawerProps } from "tdesign-vue-next";
  import { onMounted,ref } from "vue";
  import axios from 'axios';
  const userStore = useUserStore()
  const user = userStore.currentUser || ''
  let infoCard = ref<any>({})
  onMounted(async () => {
    getlist()
  })
  const keysword = ref<any>(null)

  const getlist = async () => {
    const res = await markwriteApi.list(user)
    infoCard.value = res
    console.log(res)
  }

  const visible = ref(false);
  const deleable = ref(false);
  const header = ref<any>(null);
  const markdownText = ref<any>('');
    const handlerOpen = async (value: any) => {
    visible.value = true;
    header.value = value;
    const res = await markwriteApi.addressNote(user, value);
    console.log(res.address);

    const fileUrl = `http://localhost:8080/${res.address}`;
    try {
        const response = await axios.get(fileUrl);
        markdownText.value = response.data.toString();
        console.log('Note content:', response.data);
    } catch (error) {
        console.error('Error fetching note content:', error);
    }
  }

  const onClickConfirm: DrawerProps['onConfirm'] = () => {
    MessagePlugin.info('数据缓冲中...',1000);
    const timer = setTimeout(async () => {
      clearTimeout(timer);
      visible.value = false
      MessagePlugin.success('数据缓冲成功');
    }, 1000);
  };

  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const Notename = ref<any>(null)
  const handlerDelete = (notename:string) => {
    console.log("1")
    deleable.value = true
    Notename.value = notename
  }

  const onconfirmclick = async () => {
    const res = await markwriteApi.deleteNote(user,Notename.value)
    if(res.code === 200) {
      deleable.value = false
      MessagePlugin.info('数据删除成功!');
      getlist()
    } else {
      MessagePlugin.info('数据删除失败!');
    }
  }

  const searchwithkeysword = async () => {
    if(keysword.value) {
      MessagePlugin.info('数据查询中...', 1000);
      const timer = setTimeout(async () => {
        clearTimeout(timer);
        const res = await markwriteApi.sreachNote(keysword.value)
        infoCard.value = res
        MessagePlugin.success('加载完成!');
      }, 1000);
    } else {
      const timer = setTimeout(async () => {
        clearTimeout(timer);
        getlist()
        MessagePlugin.info('重新加载!');
      }, 1000);
    }
    
  }
  
  </script>
  <style lang="less" scoped>

  </style>