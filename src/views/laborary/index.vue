<template>
    <div class="node">
        <t-card :title="item.StoreName" :subtitle="item.CreateTime" hover-shadow :style="{ width: '420px' }" v-for="(item,index) in infoRepo" :key="index" class="card">
            {{ item.Resume }}
            <template #actions>
                <t-drawer v-model:visible="visible" header="仓库信息" :show-overlay="false" size="87%" closeOnOverlayClick="true" @click="clickHandler" :on-confirm="confirmtoclose">
                    <div v-for="(item,index) in infoCard" :key="index" style="margin-top: 6px">
                        <t-card :bordered="false" hover-shadow style="margin: 3px 0">
                            <t-descriptions column="4">
                                <t-descriptions-item label="笔记名称"  class="description-item">{{item.NoteName}}</t-descriptions-item>
                                <t-descriptions-item label="关键词" style="width:200px">{{item.Keysword}}</t-descriptions-item>
                                <t-descriptions-item label="仓库">{{item.StoreName}}</t-descriptions-item>
                                <t-descriptions-item label="操作">
                                    <t-button @click="copyKeyword(item.Keysword)">复制关键词</t-button>
                                </t-descriptions-item>
                              </t-descriptions>
                        </t-card>
                    </div>
                  </t-drawer>
                <t-button variant="outline" @click="handleClick(item.StoreName)" theme="primary">打开仓库</t-button>
                <t-button variant="outline" @click="hadnleDelete(item.StoreName)" theme="danger" style="margin-left: 5px">删除仓库</t-button>
            </template>
        </t-card>
        <t-card hover-shadow class="card" :style="{ width: '420px' }" >
            <t-input label="仓库名称：" v-model="storeInfo.storename"/>
            <t-divider />
            <t-input label="仓库简述：" v-model="storeInfo.resume" />
            <t-divider />
            <t-button variant="outline" @click="createclick" theme="success">创建仓库</t-button>
        </t-card>
        <t-dialog v-model:visible="seesable" :on-confirm="checkKeys" theme="success" width="30%">
            <p>输入你的密钥</p>
            <t-input v-model="keys"></t-input>
        </t-dialog>
    </div>
    <t-notification
      class="notification"
      placement="top-left"
      v-if="show"
      theme="success"
      title="添加成功"
      content="刚刚加入新的仓库"
      :duration="2000"
      @duration-end="show = false"
    />
</template>

<script lang="ts" setup>
import { MessagePlugin, type ButtonProps } from 'tdesign-vue-next';
import repository from '@/api/repository';
import { useUserStore } from "@/store";
import { onMounted, ref } from 'vue';
import userApi from '@/api/user';
import markwrite from '@/api/markwrite';
const userStore = useUserStore()
const visible = ref(false);
const user = userStore.currentUser || ''
const notestorename = ref<any>(null);
let infoCard = ref<any>({})

const copyKeyword = (keyword: string) => {
  navigator.clipboard.writeText(keyword)
    .then(() => {
        MessagePlugin.success('关键词已复制到剪贴板');
    })
    .catch((error) => {
      console.error('复制失败:', error);
      MessagePlugin.success('复制失败');
    });
};
const confirmtoclose = () => {
    visible.value = false
}
const handleClick: ButtonProps['onClick'] = async (resstore) => {
    notestorename.value = resstore
    const res = await markwrite.notestore(user,notestorename.value)
    infoCard.value = res
    console.log(res)
    visible.value = true;
};
const clickHandler = () => {
  //MessagePlugin.success('操作');
};

const storeInfo = ref({
    "storename": "",
    "resume": ""
})


const infoRepo = ref<any>(null)
onMounted(async () => {
    getStore()
})

const getStore = async () => {
    const user = userStore.currentUser || ''
    const repo = await repository.repos(user)
    infoRepo.value = repo
}

const show = ref<boolean>(false)
const createclick = async () => {
    console.log(user,storeInfo.value.storename,storeInfo.value.resume)
    const res = await repository.createStore(user,storeInfo.value.storename,storeInfo.value.resume)
    console.log(res)
    getStore()
    MessagePlugin.success("添加成功")
    show.value = true
    storeInfo.value = {
        "storename": "",
        "resume": ""
    }
}

const seesable = ref(false);
const delsto = ref<any>(null)
const hadnleDelete = (res) => {
    seesable.value = true;
    delsto.value = res
}

const keys = ref<any>(null)
const checkKeys = async () => {
    console.log("1")
    const res = await userApi.keys(user,keys.value)
    console.log(keys.value,res)
    if(res.code === 200) {
        const store = await repository.deleteStore(user,delsto.value,keys.value)
        if(store.code === 200) {
            MessagePlugin.success('成功删除',1000)
            seesable.value = false
            getStore()
        } else {
            MessagePlugin.success('删除失败',1000)
        }
    } else {
        MessagePlugin.info('你没有权限访问',1000)
    }
}
</script>

<style lang="less" scoped>
.node {
    display: flex;
    flex-wrap: wrap;
    .card {
        margin: 6px;
    }
}
.t-divider {
    margin: 6px 0;
}
.notification {
    position: absolute;
    top: 70px;
    left: 16px;
    z-index: 1500;
  }
</style>