<template>
  <t-dialog width="800px" @confirm="handleConfirm" :visible="visible" @close="$emit('close')">
    <t-form ref="form" :colon="true" :label-width="0" >
      <t-form-item name="storename">
        <t-select v-model="formData.storename" placeholder="请选择存储的仓库">
          <template #prefixIcon>
            <icon name="browse" style="margin-right: 8px" />
          </template>
          <t-option v-for="repo in storeOptions" :key="repo" :value="repo">{{ repo }}</t-option>
        </t-select>
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
  import { computed, onMounted, reactive, ref } from 'vue';
  import { Icon } from 'tdesign-vue-next';
  import repository from '@/api/repository';
  import { useUserStore } from '@/store';
  const userStore = useUserStore()
  const user = userStore.currentUser || ''
  const formData = reactive({
    "storename": "",
    "keys": "",
  })
  const storeOptions = ref([]);
  
  onMounted(async () => {
    try {
    const response = await repository.repos(user);
    const storeNames = response.map(item => item.StoreName); 
    storeOptions.value = storeNames;
    console.log(storeOptions.value); // 打印提取后的 storename 数组
  } catch (error) {
    console.error('Failed to fetch store options:', error);
  }
});

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
