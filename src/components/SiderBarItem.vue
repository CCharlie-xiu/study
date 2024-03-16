<template>
    <t-menu-item v-if="item && !item.children" :value="item.name" :to="{name: item.name}">
        <template #icon>
          <t-icon :name="item.meta.icon" />
        </template>
        {{item.meta.title}}
      </t-menu-item>
      <t-submenu v-if="item && item.children" :value="item.name" :title="item.meta.title">
        <template #icon>
            <t-icon :name="item.meta.icon" />
          </template>
        <SiderBarItem v-for="subitem in item.children" :key="subitem.name" :item="subitem"></SiderBarItem>
      </t-submenu>
</template>

<script lang="ts" setup>

defineProps({
    item: {
        type: Object,
        default: null
    }
})
</script>

<style lang="less" scoped>
.t-menu__item.t-is-active {
  background-color: #d0adfa;
  color: #0052d9;
}
</style>