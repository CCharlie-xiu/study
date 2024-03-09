<template>
    <div class="info-card" size="medium"
    :bordered="false">
      <div class="node">
        <icon class="icon" :name="info.icon"></icon>
        <div class="header">
          {{ info.title }}
        </div>
        <span class="num">{{ info.number.toLocaleString() }} </span>
          <span class="unit"> {{ info.unit }}</span>
      </div>
        
    </div>
</template>
<script setup lang="ts">
import { Icon } from "tdesign-vue-next";
interface Props {
  info: Info;
}
type Info = {
  icon: string;
  title: string;
  color: string;
  number: number;
  unit: string;
};

defineProps<Props>()
</script>
<style lang="less" scoped>
.info-card{
  margin: 6px 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .node {
    display: block;
    .icon {
      font-size: 32px;
      position: relative;
    }
    .header {
      font-size: 16px;
      line-height: 30px;
    }
    .unit {
      font-weight: 600;
      margin-left: 3px;
    }
    .num {
      font-size: 30px;
      line-height: 45px;
    }
  }
}
</style>

