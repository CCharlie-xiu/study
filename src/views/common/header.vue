<template>
    <t-header class="header">
        <collapse-button v-model:collapse="appStore.menucollapse"></collapse-button>
        <div class="operation-area">
            <t-dropdown :options="[{content:'退出登录', value: 'logout'}]" :min-column-width="112" @click="clickHandler">
                <t-button style="margin-right: 20px; background-color: #651bb4; border-color:#651bb4">
                    <template #icon>
                        <icon name="user"></icon>
                    </template>
                    {{userStore.currentUser && userStore.currentUser}}
                </t-button>
            </t-dropdown>
        </div>
    </t-header>
</template>

<script lang="ts" setup>
import { useUserStore,useAppStore } from "@/store";
import { Icon} from "tdesign-vue-next"
import type { DropdownOption } from "tdesign-vue-next"
import { useRoute, useRouter } from "vue-router";
import CollapseButton from "@/components/CollapseButton.vue";

const userStore= useUserStore()
const appStore = useAppStore()
const router = useRouter();
const route = useRoute();
const clickHandler = async ({value}:DropdownOption) => {
    switch (value) {
        case 'logout':
            await appStore.logout()
            await router.push(`login?redirect=${route.fullPath}`)
            break;
    
        default:
            throw new Error(`Invalid`)
    }
}
</script>

<style scoped lang="less">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 52px;
 
}
</style>