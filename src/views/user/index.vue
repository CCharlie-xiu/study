<template>
    <t-card>
        <div class="action-area">
            <t-button v-permission="PermissionEnum.USER_LIST_CREATE" @click="handlerCreate">create</t-button>
        </div>
        <div class="search-area">
            <t-input class="search-input" placeholder="input to search" v-model="searchKey.name"></t-input>
            <t-button @click="fetchData">
                <template #icon>
                    <t-icon name="search" />
                  </template>
            </t-button>
        </div>
        <t-table :columns="columns" :loading="loading" row-key="index" :data="data" :pagination="pagination" @page-change="onPageChange">
            <template #operation="slotProps">
                <t-button v-permission="PermissionEnum.USER_LIST_EDIT" variant="text" theme="primary" @click="handlerEdit(slotProps)">edit</t-button>
            </template>
            <template #roles="slotProps">
                <t-tag
                  v-for="(role, index) in slotProps.row.roles"
                  :key="index"
                  theme="primary"
                  variant="light"
                  style="margin-right: 8px; cursor: pointer"
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
        title: 'Name',
    },{
        colKey:'nickname',
        title: 'Nickname',
    },{
        colKey:'roles',
        title: 'Roles',
    },{
        colKey:'operation',
        title: 'Operation',
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