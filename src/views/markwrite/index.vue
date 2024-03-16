<template>
    <t-card>
        <div class="search-area">
            <t-input class="search-input" placeholder="根据关键词查找笔记"></t-input>
            <t-button >
                <template #icon>
                    <t-icon name="search" />
                  </template>
            </t-button>
        </div>
        <div v-for="(item,index) in infoCard" :key="index" style="margin-top: 6px">
            <t-card :bordered="false" hover-shadow style="margin: 3px 0">
                <t-descriptions column="6">
                    <t-descriptions-item label="笔记名称">{{item.notename}}</t-descriptions-item>
                    <t-descriptions-item label="创建时间">{{item.createtime}}</t-descriptions-item>
                    <t-descriptions-item label="关键词">{{item.keyword}}</t-descriptions-item>
                    <t-descriptions-item label="仓库">{{item.storename}}</t-descriptions-item>
                    <t-descriptions-item label="摘要">{{item.summary}}</t-descriptions-item>
                    <t-descriptions-item label="操作"><t-button @click="handlerOpen(item.notename)">打开</t-button>&nbsp;&nbsp;<t-button>删除</t-button></t-descriptions-item>
                  </t-descriptions>
            </t-card>
        </div>
    </t-card>
    <t-drawer v-model:visible="visible" header="header" :on-confirm="onClickConfirm" :close-btn="true">
        <p>{{ infoNO }}</p>
    </t-drawer>
  </template>
  
  <script lang="ts" setup>
  import markwriteApi from "@/api/markwrite";
import { MessagePlugin, type DrawerProps } from "tdesign-vue-next";
  import { onMounted,ref } from "vue";

  const infoCard = ref<any>(null)
  onMounted(async () => {
    const res = await markwriteApi.list()
    infoCard.value = res
    infoCard.value = infoCard.value.data || []
    console.log(infoCard.value.data)
  })

  const visible = ref(false);
  const infoNO = ref<any>(null);

  const handlerOpen = async (value: any) => {
    visible.value = true
    infoNO.value = value
    const res = await markwriteApi.searchList(value)
    infoNO.value = res.data
    console.log(res)
  }
  const onClickConfirm: DrawerProps['onConfirm'] = () => {
  MessagePlugin.info('数据保存中...', 1000);
  const timer = setTimeout(() => {
    clearTimeout(timer);
    visible.value = false;
    MessagePlugin.info('数据保存成功!');
  }, 1000);
};
  </script>
  <style lang="less" scoped></style>