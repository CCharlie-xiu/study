<template>
    <t-row :gutter="[0,6]">
        <t-col :span="5">
            <t-card >
              <div v-for="(item, index) in infocard" :key="index" class="infocard">
                <info-card :info="item"></info-card>
              </div>
            </t-card>
        </t-col>
        <t-col :span="3" style="margin-left: 6px">
          <t-card>
            <div class="top" split style="margin-bottom: 5px;"> 
              <div>公告</div>
            <div>查看更多</div>
            
            </div>
            <t-list  v-for="(item, index) in infobill" :key="index">
              <t-list-item>
                {{item.message}}
              </t-list-item>
            </t-list>
          </t-card>
        </t-col>
        <t-col :span="3" style="margin-left: 6px">
          <t-card>
              <div>帮助文档</div>
              <t-list split style="margin-top: 50px;">
                <t-list-item>
                  列表内容的描述性文字
                </t-list-item>
              </t-list>
          </t-card>
        </t-col>
        <t-col :span="4">
          <t-card>
            <div style="height: 355px">
              <e-charts :option="options2"></e-charts>
            </div>
          </t-card>
        </t-col>
        <t-col :span="7" style="margin-left: 12px">
          <t-card>
            <t-list split header="代操作">
              <t-list-item>
                列表内容的描述性文字
                <template #action>
                  <t-link theme="primary" hover="color" style="margin-left: 16px"> 执行 </t-link>
                  <t-link theme="primary" hover="color" style="margin-left: 16px"> 取消 </t-link>
                </template>
              </t-list-item>
            </t-list>
          </t-card>
          <t-card style="margin-top: 6px">
            <t-list split header="在执行">
              <t-list-item>
                列表内容的描述性文字
                <template #action>
                  <t-link theme="primary" hover="color" style="margin-left: 16px"> 完成 </t-link>
                  <t-link theme="primary" hover="color" style="margin-left: 16px"> 延后 </t-link>
                </template>
              </t-list-item>
            </t-list>
          </t-card>
          <t-card style="margin-top: 6px">
            <t-list split header="已完成">
              <t-list-item>
                列表内容的描述性文字
                <template #action>
                  <t-link theme="primary" hover="color" style="margin-left: 16px"> 完成 </t-link>
                  <t-link theme="primary" hover="color" style="margin-left: 16px"> 延后 </t-link>
                </template>
              </t-list-item>
            </t-list>
          </t-card>
        </t-col>
        
    </t-row>
    <template>
      <t-calendar />
    </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import dh from "@/api/dashboard"
import InfoCard from '@/components/InfoCard.vue';
import {onMounted } from 'vue';

const infocard = ref<any>(null);
const infobill = ref<any>(null);

onMounted(async () => {
  const res = await dh.dashboard();
  const ras = await dh.billboard();
  infocard.value = res.data;
  infobill.value = ras.data;
});
const options = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    data: ["w", "d", "b"],
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "w",
      type: "line",
      stack: "总量",
      areaStyle: {},
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "d",
      type: "line",
      stack: "总量",
      areaStyle: {},
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "b",
      type: "line",
      stack: "总量",
      areaStyle: {},
      data: [150, 232, 201, 154, 190, 330, 410],
    },
  ],
};
const options2 = {

  radar: {
    shape: 'circle',
    indicator: [
      { name: "技术能力", max: 10 },
      { name: "沟通能力", max: 10 },
      { name: "管理能力", max: 10 },
      { name: "产品思维", max: 10 },
      { name: "实战经验", max: 10 },
    ],
  },
  series: [
    {
      type: "radar",
      data: [
        {
          value: [10, 10, 10, 10, 10, 10],
          name: "理想分布",
        },
        {
          value: [5, 5, 3, 1, 5, 1],
          name: "实际分布",
        },
      ],
    },
  ],
};
</script>

<style scoped lang="less">
.infocard {
  display: inline-block;
}
.top {
  display: flex;
  justify-content: space-between;
}
</style>