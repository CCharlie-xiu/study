<template>
    <div class="login-container">
        <div class="content">
            <t-card>
                <h1>bishe</h1>
                <div>
                  <t-form ref="form" :colon="true" :label-width="0" :data="formData" :rules="rules" @submit="handleLogin">
                    <t-form-item name="username" class="login-form">
                      <t-input v-model="formData.username" clearable placeholder="请输入账户名">
                        <template #prefix-icon>
                          <icon name="desktop"/>
                        </template>
                      </t-input>
                    </t-form-item>
                
                    <t-form-item name="password">
                      <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
                        <template #prefix-icon>
                            <icon name="lock-on" />
                        </template>
                      </t-input>
                    </t-form-item>
                
                    <t-form-item>
                      <t-button theme="primary" type="submit" block :loading="loading">登录</t-button>
                    </t-form-item>
                  </t-form>
                </div>
            </t-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Icon, MessagePlugin } from 'tdesign-vue-next';
import type { SubmitContext } from 'tdesign-vue-next';
import { reactive,ref } from 'vue';
import type {TokenRequest} from "../../api/types";
import {useAppStore,useUserStore} from "../../store";
import { useRouter } from 'vue-router';

const formData = reactive<TokenRequest>({
    username: '',
    password: ''
})

const rules = {
    username: [{ required: true, message: '请输入账户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)
const handleLogin = async ({validateResult}: SubmitContext) => {
  if(validateResult !== true) {
    return
  }
  loading.value = true
  try {
    await appStore.login(formData)
    await userStore.fetchCurrentUser()
    await MessagePlugin.success("success login")
    await router.push({name: 'dashboard'})
  } finally { 
    loading.value = false
  }
}
</script>

<style scoped lang="less">
.login-container {
    width: 100%;
    height: 100vh;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
        width: 300px;
    }
}
</style>