<script setup>
// Imports
import VOtpInput from 'vue3-otp-input'

// Props
defineProps({
  error: {
    type: String,
    default: '',
  },
})

const emit = defineEmits('onChange', 'onComplete')

// States
const inputRef = ref(null)
</script>

<template>
  <VOtpInput
    id="otp-input-container"
    ref="inputRef"
    :num-inputs="5"
    @on-change="(val) => emit('onChange', val)"
    @on-complete="(val) => emit('onComplete', val)"
  />
  <Teleport v-if="inputRef && error" to="#otp-input-container">
    <p class="otp-input-error">{{ error }}</p>
  </Teleport>
</template>

<style lang="scss">
.otp-input-container {
  display: block !important;
  gap: 8px;
  width: max-content;
  &:has(.otp-input-error) {
    input {
      outline: 1px solid var(--input-error);
      &:focus {
        outline: 2px solid var(--input-error);
      }
    }
  }
  div {
    display: inline-flex !important;
    margin-right: 8px;
    &:nth-child(5) {
      margin-right: 0px !important;
    }
    input {
      width: 44px;
      height: 52px;
      background: var(--card-secondary);
      border-radius: 10px;
      text-align: center;
      font-size: 20px;
      color: var(--font-primary);
      &:focus {
        outline: 2px solid var(--input-focus);
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.otp-input-error {
  width: 100%;
  color: var(--input-error) !important;
  font-size: 14px;
  text-align: center;
}
</style>
