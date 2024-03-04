<template>
    <t-aside :width="appStore.menucollapse ? '64px':'232px'">
        <t-menu :collapsed="appStore.menucollapse" :defaultValue="$route.name">
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
</style>