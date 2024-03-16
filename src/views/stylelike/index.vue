<template>
  <t-watermark
  :watermark-content="{ text: 'hiunote©️bighandsome' }"
  :y="100"
  :x="100"
  :width="180"
  :height="80"
>

    <t-space direction="vertical" size="large">
    <t-tabs v-model="value">
      <t-tab-panel :value="1" label="样式【报告】类" :destroy-on-hide="true">
        <panel1></panel1>
      </t-tab-panel>
      <t-tab-panel :value="2" label="样式【英文】类" :destroy-on-hide="true">
        <panel2></panel2>
      </t-tab-panel>
      <t-tab-panel :value="3" label="样式【数学】类" :destroy-on-hide="true">
        <panel3></panel3>
      </t-tab-panel>
      <t-tab-panel :value="4" label="样式【政治】类" :destroy-on-hide="true">
        <panel4></panel4>
      </t-tab-panel>
      <t-tab-panel :value="5" label="样式【代码】类" :destroy-on-hide="true">
        <panel5></panel5>
      </t-tab-panel>
      <t-tab-panel :value="6" label="样式选择类型 2" :destroy-on-hide="true">
        <panel6></panel6>
      </t-tab-panel>
      <t-tab-panel :value="7" label="样式选择类型 2" :destroy-on-hide="true">
        <panel7></panel7>
      </t-tab-panel>
      <t-tab-panel :value="8" label="未知样式类型 1" :destroy-on-hide="true" :disabled="true">
      </t-tab-panel>
      <t-tab-panel :value="9" label="未知样式类型 2" :destroy-on-hide="true" :disabled="true">
      </t-tab-panel>
      <t-tab-panel :value="10" label="未知样式类型 3" :destroy-on-hide="true" :disabled="true">
      </t-tab-panel>
      
    </t-tabs>
    </t-space>
  </t-watermark>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import panel1 from './panel1.vue';
import panel2 from './panel2.vue';
import panel3 from './panel3.vue';
import panel4 from './panel4.vue';
import panel5 from './panel5.vue';
import panel6 from './panel6.vue';
import panel7 from './panel7.vue';

const value = ref<number>(1)
</script>
