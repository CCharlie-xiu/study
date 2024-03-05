<template>
    <t-dialog :visible="visible" @close="$emit('close')" :header="role.id ? 'edit':'create'" width="900px" @confirm="handleConfirm">
        <t-form ref="form" :data="role" :rules="rules" class="dialog-form">
            <t-form-item label="username" name="name">
                <t-input v-if="role.id" disabled :value="role.name"></t-input>
                <t-input v-if="!role.id" placeholder="write in username" v-model="role.name"></t-input>
            </t-form-item>
            <t-form-item label="nickname" name="label">
                <t-input placeholder="write in nickname" v-model="role.label"></t-input>
            </t-form-item>
            <t-form-item label="permissions" name="permissions">
                <t-tree
                :data="permissionsTree"
                hover
                expand-all
                :checkable="true"
                value-mode="all"
                v-model="role.permissions"
              />
            </t-form-item>
        </t-form>
    </t-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import type {Ref} from "vue";
import type {RoleType} from "@/api/types"
import {permissionsTree} from "@/config/permission.config"
interface Props {
    show : boolean;
    data : RoleType | null;
}
const props = withDefaults( defineProps<Props>(),{
    show : false,
    data : null
})

const rules = {
    name: [
        { required: true, message: "Nickname", trigger: "blur"}
    ]
}

const defaultData: RoleType = {
    id: "",
    name: "",
    label: "",
    permissions: []
}
const role:Ref<RoleType> = ref(props.data || defaultData)

watch(props,(newValue) => {
    role.value = newValue.data || defaultData
})

const emit = defineEmits(["close","confirm"])
const visible = computed(() => props.show)


const form = ref(null)
const handleConfirm = () => {
    emit('confirm', role.value)
}
</script>

<style scoped>
</style>