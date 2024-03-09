<template>
    <t-aside :width="appStore.menucollapse ? '64px':'200px'">
        <t-menu :collapsed="appStore.menucollapse" :defaultValue="$route.name" :width="appStore.menucollapse ? '64px':'200px'">
            <template #logo>
                <img :width="appStore.menucollapse ? '40px':'136px'" class="logo" src="https://www.tencent.com/img/index/menu_logo_hover.png" alt="logo" />
              </template>
            <SiderBarItem v-for="item in permissionStore.menuRoutes" :key="item.name" :item="item"></SiderBarItem>
        </t-menu>
    </t-aside>
</template>

<script lang="ts" setup>
import {useAppStore} from "@/store" 
import SiderBarItem from "@/components/SiderBarItem.vue";
import { usePermissionStore } from "@/store/permission";
const appStore = useAppStore()
const permissionStore = usePermissionStore()
</script>

<style scoped>
</style>q