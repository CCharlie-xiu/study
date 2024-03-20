<template>
    <t-row :gutter="[0,6]">
        <t-col :span="12">
          <t-card>
            <t-descriptions title="个人描述" :column="6">
              <t-descriptions-item label="用户名">{{ infocard.Username }}</t-descriptions-item>
              <t-descriptions-item label="真实姓名">{{ infocard.RealName }}</t-descriptions-item>
              <t-descriptions-item label="已有笔记"
                ><t-statistic :value="infocard.NoteSum" trend="increase" color="blue" /></t-descriptions-item
              >
              <t-descriptions-item label="已有仓库"
                ><t-statistic :value="infocard.StoreSum" trend="increase" color="orange" /></t-descriptions-item
              >
              <t-descriptions-item label="累计在线"
                ><t-statistic :value="infocard.EditTime" trend="increase" unit="h" color="green" /></t-descriptions-item
              >
              <t-descriptions-item label=""><img style="height:64px" src="@/assets/image/dash.png" alt=""></t-descriptions-item>
            </t-descriptions>
            
          </t-card>
        </t-col>

        <t-col :span="12">
          <t-card>
            <div class="oneline">
              <t-tag theme="primary" size="large" variant="light" style="node">代办清单(TodoList)</t-tag>
              <t-input placeholder="请输入代办事项" class="int" v-model="todoname" /><t-button class="btn" @click="addHandler">添加</t-button>
            </div>
              <t-list style="max-height: 200px;">
                <t-list-item v-for="(item,index) in todolist" :key="index">
                  <t-list-item-meta :title="item.TodoName" />{{ formatDate( item.CreateTime )}}
                  <template #action>
                    <span>
                      <t-link theme="primary" hover="color" style="margin-left: 16px"> <t-tag theme="primary"
                         size="large" variant="light" @click="deleteHandler(item.TodoName)">完成</t-tag></t-link>
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
import { MessagePlugin } from 'tdesign-vue-next';
const userStore = useUserStore()
const infocard = ref({
  "Username": "",
  "RealName": "",
  "NoteSum": "",
  "StoreSum": "",
  "EditTime": 0
});
const todolist = ref<any>(null);

onMounted(async () => {
  gettodo()
  const username = userStore.currentUser || ""
  const res = await dh.dashboard(username);
  infocard.value = res;

});

const formatDate = (timestampInSeconds: number) => {
  const timestampInMilliseconds = timestampInSeconds * 1000; // 将秒转换为毫秒
  const date = new Date(timestampInMilliseconds);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const username = userStore.currentUser || ""
const gettodo = async() => {
  
  const user = await dh.todolist(username)
  todolist.value = user;
  console.log(user)
}

const show = ref<boolean>(false)
const todoname = ref<any>(null)
const addHandler = async () => {
  const user = userStore.currentUser || ''
  if (todoname.value) {
    const res = await dh.addtodo(user,todoname.value)
    if(res.code == 200) {
      gettodo()
      show.value = true
    }else {
      MessagePlugin.info("添加失败")
    }
  } else {
    MessagePlugin.info("请输入代办事项")
  }
  
}

const deleteHandler = async (value: string) => {
  const res = await dh.deltodo(username,value)
  if(res.code == 200) {
      gettodo()
      MessagePlugin.success("删除成功")
    }else {
      MessagePlugin.info("删除失败")
  }
}

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