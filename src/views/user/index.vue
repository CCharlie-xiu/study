<template>
    <t-card>
        <div class="action-area">
            <t-button v-permission="PermissionEnum.USER_LIST_CREATE" @click="handlerCreate">添加客户</t-button>
        </div>
        <div class="search-area">
            <t-input class="search-input" placeholder="查找客户" v-model="searchKey.name"></t-input>
            <t-button @click="fetchData">
                <template #icon>
                    <t-icon name="search" />
                  </template>
            </t-button>
        </div>
        <t-table :columns="columns" :loading="loading" :table-layout="true" row-key="index" :data="data" :pagination="pagination" @page-change="onPageChange">
            <template #operation="slotProps">
                <t-button v-permission="PermissionEnum.USER_LIST_EDIT" variant="text" theme="primary" @click="handlerEdit(slotProps)">修改</t-button>
            </template>
            <template #roles="slotProps">
                <t-tag
                  v-for="(role, index) in slotProps.row.roles"
                  :key="index"
                  theme="primary"
                  variant="light"
                  style="margin-right: 8px; cursor: pointer; font-size: 10px"
                  >{{ role }}
                </t-tag>
            </template>
        </t-table>
    </t-card>
    <edit-dialog :show="showdialog" :data="editData" @close="onDialogClose" @confirm="handlerConfirm"></edit-dialog>
</template>

<script lang="ts" setup>
import type { UserCreateRequest, UserType } from '@/api/types';
import userApi from '@/api/user';
import { useSearch } from '@/composables/useSearch';
import { PermissionEnum } from '@/config/permission.config';
import { reactive } from 'vue';
import editDialog from './edit-dialog.vue';
import { useEditDialog } from '@/composables/useEditDialog';

const columns = [
    {
        colKey:'id',
        title: 'ID',
    },{
        colKey:'username',
        title: '真实姓名',
    },{
        colKey:'nickname',
        title: '昵称',
    },{
        colKey:'address',
        title: '地址',
    },{
        colKey:'phonenumber',
        title: '电话',
    },{
        colKey:'roles',
        title: '角色',
    },{
        colKey:'operation',
        title: '操作',
    }
];
const searchKey = reactive({
        name: "",
})
const {data, pagination, loading, fetchData, onPageChange} = useSearch<UserType,{name:string;}>(userApi,searchKey)
const { showdialog, editData, handlerCreate, handlerEdit, onDialogClose, handlerConfirm } = useEditDialog<UserType,UserCreateRequest>(userApi,"user")

</script>

<style lang="less" scoped>

</style>