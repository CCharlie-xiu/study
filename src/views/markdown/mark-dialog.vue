<template>
  <t-dialog width="800px" @confirm="handleConfirm" :visible="visible" @close="$emit('close')">
    <t-form ref="form" :colon="true" :label-width="0" >
      <t-form-item name="storename">
        <t-input v-model="formData.storename" placeholder="请输入存储的仓库">
          <template #prefix-icon>
            <icon name="lock-on" />
          </template>
        </t-input>
      </t-form-item>
  
      <t-form-item name="keys">
        <t-input v-model="formData.keys" placeholder="请输入文章关键词">
          <template #prefix-icon>
              <icon name="lock-on" />
          </template>
        </t-input>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
  

<script lang="ts" setup>
  import { computed, reactive } from 'vue';
  import { Icon } from 'tdesign-vue-next';
  const formData = reactive({
    "storename": "xxxx",
    "keys": "xxxx",
  })
  interface Props {
      show : boolean;
  }
  const props = withDefaults( defineProps<Props>(),{
      show : false,
  })
  const emit = defineEmits(["close","confirm"])
  const visible = computed(() => props.show)
  const handleConfirm = () => {
      emit('confirm', formData)
  }
</script>
