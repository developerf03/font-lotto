<script setup>
// Imports
import dataNotFound from '~/assets/icons/2d/data-not-found.png'

// Props
defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'svg/empty',
  },
  image: {
    type: String,
    default: '',
  },
  titleClass: {
    type: String,
    default: '',
  },
  iconClass: {
    type: String,
    default: '',
  },
  imageClass: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="no-item-warpper flex flex-col justify-center items-center py-6">
    <div class="rounded-full btn-secondary flex justify-center items-center">
      <img
        v-if="image"
        :src="image ? image : dataNotFound"
        alt="data-not-found"
        srcset=""
        class="mb-2 w-15 <sm:w-12"
        :class="imageClass"
      >
      <nuxt-icon
        v-else
        :name="icon"
        class="text-6xl <sm:text-5xl !icon-primary"
        :class="iconClass"
      />
    </div>
    <span class="text-tertiary text-lg mt-2 <sm:(text-sm mt-1)" :class="titleClass">{{
      title || $t('noItems')
    }}</span>
  </div>
</template>

<style lang="scss">
.no-item-warpper {
  path,
  .nuxt-icon.nuxt-icon--fill * {
    fill: var(--icon-primary) !important;
  }
}
</style>
