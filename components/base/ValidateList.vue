<script setup>
// Import
import { defineExpose } from 'vue'

// Props
const props = defineProps({
  password: {
    type: [String, Number],
    default: '',
  },
})

// State

// Computeds
const checkLength = computed(() => (props.password.length > 7 ? true : false))
const checkUppercase = computed(() => (isUpperCase(props.password) ? true : false))
const checkLowercase = computed(() => (isLowerCase(props.password) ? true : false))
const checkNumbercase = computed(() => (isNummberCase(props.password) ? true : false))

defineExpose({
  checkLength,
  checkUppercase,
  checkLowercase,
  checkNumbercase,
})

// Functions
const isUpperCase = (str) => /[A-Z]/.test(str)
const isLowerCase = (str) => /[a-z]/.test(str)
const isNummberCase = (str) => /\d/.test(str)
</script>

<template>
  <div class="w-full card-secondary p-2 rounded-md gap-2 <sm:(flex-col gap-4)">
    <div class="flex justify-start items-center gap-4">
      <UIcon
        name="ri:checkbox-circle-fill"
        class="w-5 h-5 bg-[var(--icon-inactive)]"
        :class="{ '!bg-[var(--icon-default)]': checkLength }"
      />
      <p class="color-[var(--font-primary)]">{{ t('condition.beAtLeastCharacters', { min: 8 }) }}</p>
    </div>
    <div class="flex justify-start items-center gap-4">
      <UIcon
        name="ri:checkbox-circle-fill"
        class="w-5 h-5 bg-[var(--icon-inactive)]"
        :class="{ '!bg-[var(--icon-default)]': checkUppercase }"
      />
      <p class="color-[var(--font-primary)]">{{ t('condition.uppercaseLetter') }}</p>
    </div>
    <div class="flex justify-start items-center gap-4">
      <UIcon
        name="ri:checkbox-circle-fill"
        class="w-5 h-5 bg-[var(--icon-inactive)]"
        :class="{ '!bg-[var(--icon-default)]': checkLowercase }"
      />
      <p class="color-[var(--font-primary)]">{{ t('condition.lowercaseLetter') }}</p>
    </div>
    <div class="flex justify-start items-center gap-4">
      <UIcon
        name="ri:checkbox-circle-fill"
        class="w-5 h-5 bg-[var(--icon-inactive)]"
        :class="{ '!bg-[var(--icon-default)]': checkNumbercase }"
      />
      <p class="color-[var(--font-primary)]">{{ t('condition.atLeastOneNumber') }}</p>
    </div>
  </div>
</template>

<style lang="scss"></style>
