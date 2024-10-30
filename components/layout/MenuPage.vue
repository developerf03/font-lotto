<script setup>
const items = [
  {
    label: 'Tab1',
    icon: 'i-heroicons-information-circle',
  },
  {
    label: 'Tab2',
    icon: 'i-heroicons-arrow-down-tray',
    disabled: true,
  },
  {
    label: 'Tab3',
    icon: 'i-heroicons-eye-dropper',
  },
]
</script>

<template>
  <div>
    <UTabs :items="items" />
  </div>
</template>
