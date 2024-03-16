<template>
    <t-dialog
      ref="dialog"
      width="900px"
      :visible="visible"
      :header="markwrite.id ? '编辑{{labelName}}' : '创建{{labelName}}'"
      @close="$emit('close')"
      @confirm="handleConfirm"
    >
      <t-form ref="form" class="dialog-form" :data="markwrite" :rules="rules">
        <t-form-item label="笔记名称" name="name">
          <t-input placeholder="请输入笔记名称" v-model="markwrite.name" />
        </t-form-item>
      </t-form>
    </t-dialog>
  </template>
  
  <script lang="ts" setup>
  import { computed, ref, watch } from "vue";
  import type { MarkwriteType } from "@/api/types";
  import type { Ref } from "vue";
  
  interface Props {
    show: boolean;
    data: MarkwriteType | null;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    show: false,
  });
  
  const rules = {
    name: [{ required: true, message: "笔记名称不能为空", trigger: "blur" }],
  };
  
  const defaultData: MarkwriteType = {
    id: "",
    name: "",
  };
  
  const markwrite: Ref<MarkwriteType> = ref(props.data || defaultData);
  
  watch(props, (newValue) => {
    markwrite.value = newValue.data || defaultData;
  });
  
  const emit = defineEmits(["close", "confirm"]);
  
  const visible = computed(() => props.show);
  
  // todo
  const form = ref(null);
  
  const handleConfirm = () => {
    emit("confirm", markwrite.value);
  };
  </script>
  
  <style scoped></style>