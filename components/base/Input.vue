<script setup>
// Imports
import { vMaska } from 'maska/vue'

// Props
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  fontSize: {
    type: String,
    default: 'sm',
  },
  placeholder: {
    type: String,
    default: '',
  },
  dataMaska: {
    type: String,
    default: '',
  },
  copy: { type: [String, Number], default: '' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  trailing: { type: Boolean, default: false },
})

// Emits
const emit = defineEmits(['update:modelValue', 'maska'])

// Variables
const digitSetting = {
  sm: {
    0: { class: '!pr-[32px]', text: '.00' },
    1: { class: '!pr-[29px]', text: '00' },
    2: { class: '!pr-[20px]', text: '0' },
    3: { class: '!pr-3', text: '' },
  },
  md: {
    0: { class: '!pr-[34px]', text: '.00' },
    1: { class: '!pr-[31px]', text: '00' },
    2: { class: '!pr-[22px]', text: '0' },
    3: { class: '!pr-3', text: '' },
  },
  lg: {
    0: { class: '!pr-[36px]', text: '.00' },
    1: { class: '!pr-[33px]', text: '00' },
    2: { class: '!pr-[24px]', text: '0' },
    3: { class: '!pr-3', text: '' },
  },
}

// States
const inputRef = ref(null)
const eye = ref(false)
const digit = reactive({ setting: {} })

// Computeds
const inputType = computed(() =>
  props.type === 'password'
    ? eye.value
      ? 'text'
      : 'password'
    : ['currency', 'number'].includes(props.type)
    ? 'text'
    : props.type,
)

// Functions
const convertCurrency = (value) => {
  if (/^0/gm.test(value)) {
    return numeralCommas(removeCommas(value))
  } else if (!/\./gm.test(value) && value.length > 15) {
    return value.slice(0, -1)
  } else if (/[.]+\d\d/gm.test(value)) {
    return numeralCommas(removeCommas(value.split('.', 2).join('.')).toFixed(2))
  } else {
    return numeralCommas(value.split('.', 2).join('.'))
  }
}

const getDigitSetting = (value) => {
  if (value) {
    return digitSetting[props.fontSize][numeralCommas(value, 'decimal')?.length || 0]
  }
  return digitSetting[props.fontSize][0]
}

const handleInput = (e) => {
  if (!e) {
    emit('update:modelValue', '')
    inputRef.value.$forceUpdate()
    return
  }

  // if type currency
  if (props.type === 'currency') {
    if (/^[0-9.,]*$/gm.test(e)) {
      const result = convertCurrency(e)
      emit('update:modelValue', result)
      digit.setting = getDigitSetting(result)
    } else {
      const result = e.replace(/[^0-9.,]/g, '')
      emit('update:modelValue', result)
    }
    inputRef.value.$forceUpdate()
    return
  }

  // if type number / tel
  if (['number', 'tel'].includes(props.type)) {
    const reg = /^\d+$/
    if (e.match(reg)) {
      emit('update:modelValue', e)
    } else {
      const result = e.replace(/[^0-9]/g, '')
      emit('update:modelValue', result)
    }
    inputRef.value.$forceUpdate()
    return
  }

  emit('update:modelValue', e)
}

// Mounted
onMounted(() => {
  if (props.type === 'currency') {
    digit.setting = getDigitSetting(inputRef?.value?.modelValue)
  }
})
</script>

<template>
  <UInput
    ref="inputRef"
    v-maska
    :data-maska="dataMaska"
    :type="inputType"
    :placeholder="type === 'currency' ? '0' : placeholder"
    :class="[
      `text-${fontSize}`,
      { 'text-right': type === 'currency' },
      { 'input-readonly': readonly },
    ]"
    :input-class="type === 'currency' ? digit.setting?.class : ''"
    :disabled="disabled || readonly"
    @maska="emit('maska', $event)"
    @update:model-value="handleInput"
  >
    <template v-if="['password', 'currency'].includes(type) || copy || trailing" #trailing>
      <slot name="trailing" />
      <div class="flex items-center justify-center gap-2">
        <span
          v-if="type === 'currency'"
          class="text-sm text-[var(--input-placeholder)] input-digit"
          :class="[{ 'opacity-70': disabled }]"
          >{{ digit.setting?.text }}</span
        >
        <UIcon
          v-if="type === 'password'"
          :name="eye ? 'i-mdi:eye-outline' : 'i-mdi:eye-off-outline'"
          class="w-5 h-5 cursor-pointer pointer-events-auto text-secondary"
          @click="eye = !eye"
        />
        <UIcon
          v-if="copy"
          name="i-tabler:copy"
          class="w-5 h-5 cursor-pointer pointer-events-auto text-[var(--icon-default)]"
          @click="useCopyClipboard(copy)"
        />
      </div>
    </template>
  </UInput>
</template>
