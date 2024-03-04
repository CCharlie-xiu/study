<template>
    <t-card>
        <div class="action-area">
            <t-button v-permission="PermissionEnum.USER_ROLES_CREATE" @click="handlerCreate">create</t-button>
        </div>
        <div class="search-area">
            <t-input class="search-input" placeholder="input to search" v-model="searchKey.name"></t-input>
            <t-input class="search-input" placeholder="input to search" v-model="searchKey.label"></t-input>
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
        </t-table>
    </t-card>
    <edit-dialog :show="showdialog" :data="editData" @close="onDialogClose" @confirm="handlerConfirm"></edit-dialog>
</template>

<script lang="ts" setup>
import roleApi from '@/api/role';
import type { RoleCreateRequest, RoleType } from '@/api/types';
import { useEditDialog } from '@/composables/useEditDialog';
import { useSearch } from '@/composables/useSearch';
import { PermissionEnum } from '@/config/permission.config';
import { reactive } from 'vue';
import editDialog from './role-edit-dialog.vue';

const columns = [
    {
        colKey:'id',
        title: 'ID',
    },{
        colKey:'username',
        title: 'Name',
    },{
        colKey:'label',
        title: 'Label',
    },{
        colKey:'operation',
        title: 'Operation',
    }
];
const searchKey = reactive({
    name: "",
    label: "",
})
const {showdialog, handlerConfirm, handlerCreate, editData, handlerEdit, onDialogClose} = useEditDialog<RoleType,RoleCreateRequest>(roleApi)
const {data, pagination, loading, fetchData, onPageChange} = useSearch<RoleType,{name:string;label:string}>(roleApi,searchKey)
</script>

<style scoped>
</style>