<script setup>
// Imports
import PromotionSlide from '~/components/layout/PromotionSlide.vue'

// Composables
const { user } = useAuth()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-max pt-[146px] pb-[calc(70px_+_16px_+_20px)] 2xl:py-6 mlg:(pt-10 h-[100dvh]) lg:(pt-[205px]"
    :class="[{ 'pt-[161px]': user }]"
  >
    <!-- BANNER AND MENU -->
    <div
      class="w-full flex flex-col items-stretch justify-between px-4 gap-4 mlg:(flex-row gap-0) md:(px-6)"
    >
      <HomeBanner class="w-full mlg:!w-[67%]" />
      <HomeMenu class="w-full mlg:!w-[32%]" />
    </div>
    <!-- PROMOTION SLIDE -->
    <PromotionSlide class="mt-5 pl-4 pr-0 md:(pl-6) mlg:(mt-9 px-6)" />
  </div>
</template>
