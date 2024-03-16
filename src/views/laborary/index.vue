<template>
    <div class="node">
        <t-card :title="item.name" :subtitle="item.created_time" hover-shadow :style="{ width: '420px' }" v-for="(item,index) in infoRepo" :key="index" class="card">
            {{ infoMessage }}
            <template #actions>
                <t-drawer v-model:visible="visible" header="仓库信息" :show-overlay="false" size="87%" closeOnOverlayClick="true" @click="clickHandler">
                    <p>This is a controlled drawer</p>
                  </t-drawer>
                <t-button variant="outline" @click="handleClick">打开仓库</t-button>
            </template>
        </t-card>
    </div>
</template>

<script lang="ts" setup>
import { MessagePlugin, type ButtonProps } from 'tdesign-vue-next';
import repository from '@/api/repository';
import { onMounted, ref } from 'vue';
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

</script>

<style lang="less" scoped>
.node {
    display: flex;
    flex-wrap: wrap;
    .card {
        margin: 6px;
    }
}
</style>