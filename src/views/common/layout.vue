<template>
    <div>
        <t-layout class="main-layout">
            <sidebar></sidebar>
            <t-layout>
              <GlobalHeader></GlobalHeader>
              <t-content class="content-layout"><router-view></router-view></t-content>
              <t-footer style="text-align:center">Copyright @ 2023-{{ new Date().getFullYear() }} Hiunote. All Rights Reserved</t-footer>
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
        margin: 6px;
        border: 2px solid #f2f2f2;
        overflow: auto;
    }
}
</style>