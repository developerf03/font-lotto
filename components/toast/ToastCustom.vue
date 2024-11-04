<script setup>
// Imports
import { Vue3Lottie } from 'vue3-lottie'
import copy from '~/assets/icons/lottie/copy.json'
import success from '~/assets/icons/lottie/success.json'
import error from '~/assets/icons/lottie/error.json'

// Props
const props = defineProps({
  data: { type: Object, default: () => {} },
  closeToast: {
    type: Function,
    default: () => {},
  },
})

// Variables
const status = {
  copy,
  success,
  error,
}
</script>

<template>
  <div
    class="toast-custom flex items-center gap-3"
    :class="`toast-status-${data?.status}`"
    @click="props.closeToast()"
  >
    <Vue3Lottie :animation-data="status?.[data?.status]" :height="24" :width="24" class="!m-0" />
    <span>{{ data?.text }}</span>
  </div>
</template>
