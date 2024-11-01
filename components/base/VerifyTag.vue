<script setup>
// Props
defineProps({
  verify: { type: Boolean, default: false },
})
</script>

<template>
  <div
    class="flex items-center h-max self-center"
    :class="[{ 'text-success': verify }, { 'text-error': !verify }]"
  >
    <UIcon
      :name="
        verify
          ? 'i-material-symbols:check-small-rounded'
          : 'i-material-symbols:close-small-outline-rounded'
      "
      class="text-xl"
    />
    <span class="text-xs font-medium">
      {{ verify ? t('verified') : t('notVerify') }}
    </span>
  </div>
</template>
