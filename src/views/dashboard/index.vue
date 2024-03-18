<template>
    <t-row :gutter="[0,6]">
        <t-col :span="12">
          <t-card>
            <t-descriptions title="个人描述" :column="6">
              <t-descriptions-item label="用户名">TDesign</t-descriptions-item>
              <t-descriptions-item label="真实姓名">TDesign</t-descriptions-item>
              <t-descriptions-item label="已有笔记"
                ><t-statistic :value="82.76" trend="increase" color="blue" /></t-descriptions-item
              >
              <t-descriptions-item label="已有仓库"
                ><t-statistic :value="82.76" trend="increase" color="orange" /></t-descriptions-item
              >
              <t-descriptions-item label="累计在线"
                ><t-statistic :value="82.76" trend="increase" unit="h" color="green" /></t-descriptions-item
              >
              <t-descriptions-item label=""><img style="height:64px" src="@/assets/image/dash.png" alt=""></t-descriptions-item>
            </t-descriptions>
            
          </t-card>
          
        </t-col>
        <t-col :span="12">
          <t-card>
            <div class="oneline">
              <t-tag theme="primary" size="large" variant="light" style="node">代办清单(TodoList)</t-tag><t-input placeholder="请输入代办事项" class="int" /><t-button class="btn" @click="addHandler">添加</t-button>
            </div>
              <t-list style="max-height: 200px" @scroll="scrollHandler">
                <t-list-item v-for="(item,index) in todolist" :key="index">
                  <t-list-item-meta :title=item.message />
                  <template #action>
                    <span>
                      <t-link theme="primary" hover="color" style="margin-left: 16px">修改</t-link>
                      <t-link theme="primary" hover="color" style="margin-left: 16px"> <t-tag theme="primary" size="large" variant="light">完成</t-tag></t-link>
                    </span>
                  </template>
                </t-list-item>
              </t-list>
          </t-card>
        </t-col>
    </t-row>
    <t-notification
      class="notification"
      placement="top-left"
      v-if="show"
      theme="success"
      title="添加成功"
      content="刚刚加入一条代办"
      :duration="2000"
      @duration-end="show = false"
    />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import dh from "@/api/dashboard"
import {onMounted } from 'vue';
import { useUserStore } from "@/store";
const userStore = useUserStore()
const infocard = ref<any>(null);
const infobill = ref<any>(null);
const todolist = ref<any>(null);

onMounted(async () => {
  const user = await dh.todolist(userStore.currentUser!.nickname)
  const res = await dh.dashboard();
  const ras = await dh.billboard();
  infocard.value = res.data;
  infobill.value = ras.data;
  todolist.value = user.data;
  console.log(user)
});

const show = ref<boolean>(false)
const addHandler = () => {
  show.value = true
}

// const options = [
//   {
//     label: '2022-01-01',
//     content: '事件一',
//   },
//   {
//     label: '2022-02-01',
//     content: '事件二',
//   },
//   {
//     label: '2022-03-01',
//     content: '事件三',
//   },
//   {
//     label: '2022-04-01',
//     content: '事件四',
//   },
// ];

// const options2 = {

//   radar: {
//     shape: 'circle',
//     indicator: [
//       { name: "技术能力", max: 10 },
//       { name: "沟通能力", max: 10 },
//       { name: "管理能力", max: 10 },
//       { name: "产品思维", max: 10 },
//       { name: "实战经验", max: 10 },
//     ],
//   },
//   series: [
//     {
//       type: "radar",
//       data: [
//         {
//           value: [10, 10, 10, 10, 10, 10],
//           name: "理想分布",
//         },
//         {
//           value: [5, 5, 3, 1, 5, 1],
//           name: "实际分布",
//         },
//       ],
//     },
//   ],
// };
</script>

<style scoped lang="less">
.infocard {
  display: inline-block;
}
.top {
  display: flex;
  justify-content: space-between;
}
.t-timeline-horizontal {
  min-height: 0;
}
.oneline {
  display: flex;
  margin-bottom: 16px;
  .int {
    margin-left: 30px;
    width: 300px;
  }
  .btn {
    margin-left: 30px;
  }
  .node {
  color: #d0adfa;

  }
}
.notification {
  position: absolute;
  top: 70px;
  left: 16px;
  z-index: 1500;
}

.t-link--theme-primary,.t-tag--primary.t-tag--light {
  color: #651bb4;
}

.t-tag--primary.t-tag--ligh {
  color: #d0adfa;
}

.t-button--variant-base.t-button--theme-primary  {
  background-color: #651bb4;
  border-color: #651bb4;
}
</style>