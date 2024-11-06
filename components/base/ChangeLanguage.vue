<script setup>
// Imports
import flags from '~/constants/flags'

// Composables
const { locale, locales } = useI18n()
const { handleLanguageModal } = useModals()

// Computeds
const language = computed(() => locales.value?.find((o) => o?.code === locale.value))
</script>

<template>
  <div
    class="flex items-center gap-3 w-max cursor-pointer py-2 mlg:py-0"
    @click="handleLanguageModal(true)"
  >
    <img
      :src="flags?.[language?.countryCode]"
      alt="country flag"
      class="h-auto rounded-full w-5 lg:w-6"
    >
    <span class="text-secondary text-sm sm:text-base">{{ language?.name }}</span>
  </div>
</template>
