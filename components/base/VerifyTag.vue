<script setup>
// Props
defineProps({
  verify: { type: Boolean, default: false },
})
</script>

<template>
  <div
    class="flex items-center py-1 px-2 rounded-[5px] h-max self-center text-white"
    :class="[{ 'card-success': verify }, { 'card-error': !verify }]"
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
      {{ verify ? 'ยืนยันตัวตนแล้ว' : 'ยังไม่ยืนยันตัวตน' }}
    </span>
  </div>
</template>
