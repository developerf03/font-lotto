<script setup>
// Imports
import VOtpInput from 'vue3-otp-input'

// Props
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: '',
  },
  errorFill: {
    type: String,
    default: '', // error, success , warning
  },
})

const emit = defineEmits('onChange', 'onComplete')

// States
const inputRef = ref(null)

const handleOnComplete = (value) => {
  emit('update:modelValue', value)
  emit('complete', value)
}

const handleOnChange = (value) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div>
    <VOtpInput
      id="otp-input-container"
      ref="inputRef"
      :value="modelValue"
      :num-inputs="5"
      autofocus
      :should-auto-focus="true"
      :input-classes="errorFill"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
    />
    <slot name="error" />
  </div>
  <!-- <Teleport v-if="inputRef && error" to="#otp-input-container">
    <p class="otp-input-error">{{ error }}</p>
  </Teleport> -->
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
  .error {
    border: 1px solid var(--danger) !important;
  }
  .warning {
    border: 1px solid var(--warning) !important;
  }
  .success {
    border: 1px solid var(--success) !important;
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
