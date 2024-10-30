<script setup>
// Props
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  trailing: { type: Boolean, default: false },
  copy: { type: [String, Number], default: '' },
})

// Emits
const emit = defineEmits(['update:modelValue'])

// States
const inputRef = ref(null)
const eye = ref(false)

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
</script>

<template>
  <UInput
    ref="inputRef"
    :type="inputType"
    :placeholder="type === 'currency' ? '0.00' : placeholder"
    :class="[{ 'text-right': type === 'currency' }, { 'input-readonly': readonly }]"
    :disabled="disabled || readonly"
    @update:model-value="handleInput"
  >
    <template v-if="type === 'passwrod' || copy || trailing" #trailing>
      <slot name="trailing" />
      <div>
        <UIcon
          v-if="type === 'passwrod'"
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
