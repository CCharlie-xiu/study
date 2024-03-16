<template>
  <t-dialog width="800px" @confirm="handleConfirm" :visible="show" @close="$emit('close')">
    
  </t-dialog>
</template>
  

  <script lang="ts" setup>
import { computed } from 'vue';

interface Props {
    show : boolean;
}
const props = withDefaults( defineProps<Props>(),{
    show : false,
})
const emit = defineEmits(["close","confirm"])
const visible = computed(() => props.show)
const handleConfirm = () => {
    emit('confirm')
}

  </script>
