<template>
    <div class="node">
        <t-card :title="item.name" :subtitle="item.created_time" hover-shadow :style="{ width: '420px' }" v-for="(item,index) in infoRepo" :key="index" class="card">
            {{ infoMessage }}
            <template #actions>
                <t-drawer v-model:visible="visible" header="仓库信息" :show-overlay="false" size="87%" closeOnOverlayClick="true" @click="clickHandler">
                    <p>This is a controlled drawer</p>
                  </t-drawer>
                <t-button variant="outline" @click="handleClick" theme="primary">打开仓库</t-button>
                <t-button variant="outline" @click="hadnleDelete" theme="danger" style="margin-left: 5px">删除仓库</t-button>
            </template>
        </t-card>
        <t-card hover-shadow class="card" :style="{ width: '420px' }" >
            <t-input label="仓库名称：" />
            <t-divider />
            <t-input label="仓库简述：" />
            <t-divider />
            <t-button variant="outline" @click="createclick" theme="success">创建仓库</t-button>
        </t-card>
        <t-dialog v-model:visible="seesable" :on-confirm="checkKeys" destroyOnClose="true" theme="success" width="30%">
            <p>输入你的密钥</p>
            <t-input v-model="keys"></t-input>
        </t-dialog>
    </div>
</template>

<script lang="ts" setup>
import { MessagePlugin, type ButtonProps } from 'tdesign-vue-next';
import repository from '@/api/repository';
import { useUserStore } from "@/store";
import { onMounted, ref } from 'vue';
import userApi from '@/api/user';
const userStore = useUserStore()
const visible = ref(false);
const handleClick: ButtonProps['onClick'] = () => {
  visible.value = true;
};
const clickHandler = () => {
  //MessagePlugin.success('操作');
};

const infoRepo = ref<any>(null)
onMounted(async () => {
    const repo = await repository.repos()
    infoRepo.value = (repo).data
})

const title = '标题';
const infoMessage = `卡片内容，以描述性为主，可以是文字、图片或图文组合的形式。按业务需求进行自定义组合。`;

const createclick = () => {
    MessagePlugin.success("success")
}

const seesable = ref(false);
const hadnleDelete = () => {
    seesable.value = true
}

const keys = ref<any>(null)
const checkKeys = async () => {
    const res = await userApi.keys(userStore.currentUser!.nickname,keys.value)
    console.log(keys.value,res)
    if(res.code === 200) {
        seesable.value = false
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

</style>