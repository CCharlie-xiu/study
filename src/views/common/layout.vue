<template>
    <div>
        <t-layout class="main-layout">
            <sidebar></sidebar>
            <t-layout>
              <GlobalHeader></GlobalHeader>
              <t-content class="content-layout"><router-view></router-view></t-content>
              <t-footer>Footer</t-footer>
            </t-layout>
        </t-layout>
    </div>
</template>

<script lang="ts" setup>
import GlobalHeader from "./header.vue"
import sidebar from "./sidebar.vue"
</script>

<style scoped lang="less">
.main-layout {
    height: 100vh;
    .content-layout {
        padding: 24px;
        
    }
}
</style>