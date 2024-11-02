<script setup>
// Composables
const theme = useCookie('theme')

// Variables
const themeSetting = {
  'light-theme': { icon: 'i-tabler:sun', label: 'lightTheme', conditionChange: 'dark-theme' },
  'dark-theme': { icon: 'i-tabler:moon', label: 'darkTheme', conditionChange: 'light-theme' },
}

// Functions
const onChange = (o) => {
  theme.value = themeSetting?.[o]?.conditionChange
}
</script>

<template>
  <div v-if="theme" class="flex items-center gap-3 w-max cursor-pointer" @click="onChange(theme)">
    <UIcon :name="themeSetting?.[theme]?.icon" class="w-5 h-5 lg:(w-6 h-6)" />
    <span class="text-secondary text-sm sm:text-base">{{ t(themeSetting?.[theme]?.label) }}</span>
  </div>
</template>
