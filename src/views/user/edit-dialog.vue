<template>
    <t-dialog :visible="visible" @close="$emit('close')" :header="user.id ? 'edit':'create'" width="900px" @confirm="handleConfirm">
        <t-form ref="form" v-if="user" :data="user" :rules="rules">
            <t-form-item label="username" name="username">
                <t-input placeholder="write in username" v-model="user.username"></t-input>
            </t-form-item>
            <t-form-item label="nickname" name="nickname">
                <t-input placeholder="write in nickname" v-model="user.nickname"></t-input>
            </t-form-item>
            <t-form-item label="roles" name="roles">
                <t-select :options="options" clearable multiple v-model="user.roles"></t-select>
            </t-form-item>
        </t-form>
    </t-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import type {Ref} from "vue";
import type {UserType} from "@/api/types"
interface Props {
    show : boolean;
    data : UserType | null;
}
const props = withDefaults( defineProps<Props>(),{
    show : false,
    data : null
})

const rules = {
    nickname: [
        { required: true, message: "Nickname", trigger: "blur"}
    ],username: [
        { required: true, message: "Username", trigger: "blur"}
    ]
}

const options = computed(() => {
    return [
        {
            label: "admin",
            value: "admin"
        },
        {
            label: "editor",
            value: "editor"
        }
    ]
})

const defaultData: UserType = {
    id: "",
    username: "",
    nickname: "",
    roles: [],
    permissions: []
}
const user:Ref<UserType | null> = ref(props.data || defaultData)

watch(props,(newValue) => {
    user.value = newValue.data || defaultData
})

const emit = defineEmits(["close","confirm"])
const visible = computed(() => props.show)


const form = ref(null)
const handleConfirm = () => {
    emit('confirm', user.value)
}
</script>

<style scoped>
</style>