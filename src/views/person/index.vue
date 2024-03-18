<template>
    <t-card>
        <div class="center-top">
            <but
           :borderRadius="'50%'"
           :width="'80px'"
           :height="'80px'"
           ></but>
        </div>
        <h1 class="node">欢迎使用, HiuNote</h1>
        <div class="node-notice">管理自己的信息、隐私和安全，让 HiuNote 更好地了解和保护您的需求。</div>
        <div class="profile-person-notice">
            <div class="profile-graph">
                <div class="title">昵称</div>
                <div class="title nodes">{{ columns.username }}</div>
                <button class="touch-change">更换个人昵称可帮助您个性化您的账号</button>
            </div>
            <div class="profile-graph">
                <div class="title">实名</div>
                <div class="title nodes">{{ columns.realname }}</div>
                <button class="touch-change">更换绑定实名可帮助您个性化您的账号</button>
            </div>
            <div class="profile-graph">
                <div class="title">xxxx</div>
                <div class="title nodes">*****</div>
                <button class="touch-change">更换个人密钥可帮助您个性化您的账号</button>
            </div>
        </div>
        <img src="../../assets/image/people.png" alt="" class="image">
        <div class="under-box-check">
            <t-button variant="outline" class="btn-top-margin button-done" @click="visible = true">修改我的信息</t-button>
            <t-dialog v-model:visible="visible" :on-confirm="checkKeys" destroyOnClose="true" theme="success" width="30%">
                <p>输入你的密钥</p>
                <t-input v-model="keys"></t-input>
            </t-dialog>
        </div>
    </t-card>
    <t-drawer
      v-model:visible="seesable"
      header="我的个人信息"
      :on-overlay-click="() => (visible = false)"
      placement="top"
      @cancel="visible = false"
      mode="push"
      size="400px"
      :on-confirm="checkOut"
    >
    <div class="div">
        <div class="flex">
            <t-input-adornment prepend="用户名">
                <t-input v-model="userDetails.username" />
            </t-input-adornment>
            <br>
            <t-input-adornment prepend="真实姓名">
                <t-input v-model="userDetails.realname"/>
            </t-input-adornment>
            <br>
            <t-input-adornment prepend="身份证号">
                <t-input v-model="userDetails.id_card"/>
            </t-input-adornment>
            <br>
            <t-input-adornment prepend="密码">
                <t-input v-model="userDetails.password"/>
            </t-input-adornment>
            <br>
            <t-input-adornment prepend="密钥">
                <t-input v-model="userDetails.keys"/>
            </t-input-adornment>
        </div>
    </div>
    </t-drawer>
  </template>
  
<script setup lang="ts">
    import { MessagePlugin } from 'tdesign-vue-next'
    import { ref,onMounted, watch} from "vue"
    import { useUserStore } from "@/store";
    import userApi from '@/api/user';
    const visible = ref(false);
    const seesable = ref(false);
    const userStore = useUserStore()
    const userDetails = ref({
        "username": "",
        "realname": "",
        "id_card": "",
        "password": "",
        "keys": ""
    })
    let columns = ref({
        "username": "1",
        "realname": "1"
    })
    const userInfo = ref<any>(null) 
    onMounted(async () => {
        const res = await userApi.person(userStore.currentUser!.nickname)
        userInfo.value = res
        updateColumns()
        console.log(res)
    })
    watch(userInfo, () => {
        updateColumns()
    })

    const updateColumns = () => {
        if(userInfo.value) {
            userDetails.value.username = columns.value.username = userInfo.value.username;
            userDetails.value.realname = columns.value.realname = userInfo.value.realname;
            columns.value = { ...columns.value };
            userDetails.value.password = userInfo.value.password;
            userDetails.value.id_card = userInfo.value.id_card;
            userDetails.value.keys = userInfo.value.keys;
        }
    }

    const keys = ref<any>(null)
    const checkKeys = async () => {
        const res = await userApi.keys(userStore.currentUser!.nickname,keys.value)
        console.log(keys.value,res)
        if(res.code === 200) {
            seesable.value = true
            visible.value = false;
        } else {
            MessagePlugin.info('你没有权限访问',1000)
        }
    }

    const checkOut = () => {
        console.log('Checking out')
        MessagePlugin.info('数据保存中...', 1000);
        const timer = setTimeout(() => {
          clearTimeout(timer);
          MessagePlugin.info('数据保存成功!');
          seesable.value = false
        }, 1000);
    }

</script>
  
<style scoped lang="less">
.t-input-adornment {
    width: 300px;
    margin-left: 16px;
}
.div {
    display: flex;
    justify-content: center;
    align-items: center;
}
.image {
    position: absolute;
    bottom: 5px;
    right: 6px;
    margin-left: 50%;
    height: 100px;
}
.nodes {
    font-weight: 600;
    cursor: pointer;
}
.profile-edit-container {
    overflow: hidden;
}
.center-top {
    -top: 60px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
}
.node {
text-align: center;
line-height: 2.25rem;
font-size: 1.75rem;
letter-spacing: 0;
font-weight: 400;
hyphens: auto;
font-family: "Google Sans",Roboto,Arial,sans-serif; 
}
.node-notice {
font-size: 16px;
font-weight: 400;
letter-spacing: 0;
line-height: 24px;
hyphens: auto;
word-break: break-word;
word-wrap: break-word;
color: #444746;
margin-top: 16px;
text-align: center;
}
.profile-person-notice {
width: 54%;
height: auto;
margin: 60px auto 20px;
flex-grow: 1;
flex-shrink: 1;
background-color: #fff;
border-radius: 8px;
border: 1px solid #e1e3e1;
box-sizing: border-box;
overflow: hidden;

}
.profile-graph {
padding-left: 24px;
padding-right: 24px;
padding-top: 15px;
padding-bottom: 16px;
display: flex;
align-items: stretch;
flex-wrap: wrap;
border-bottom: 1px solid #e1e3e1;
flex-direction: row;
align-items: stretch;
}

.title {
padding-left: 30px;
flex: 3; 
color: #651bb4;
display: grid;
font-size: 14px;
align-content: center;
}

.touch-change {
flex: 7;
border: none;
padding: 0;
font: inherit;
cursor: pointer;
outline: inherit;
background-color: transparent;
font-size: 14px;
}

.button-done {
display: inline-flex;
margin: auto;
padding: 0.5rem 1rem;
background-color: #651bb4;
color: #ffffff;
font-size: 1rem;
line-height: 1.5rem;
font-weight: 500;
justify-content: center;
width: 180px;
border-radius: 0.375rem;
border: none;
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.under-box-check {
margin-top: 30px;
margin-bottom: 60px;
width: 100%;
display: flex;
}

</style>
  