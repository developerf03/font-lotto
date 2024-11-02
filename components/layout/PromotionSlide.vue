<script setup>
// Imports
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import { useWindowSize } from '@vueuse/core'

const { activePromotes } = useInformation()
const { width } = useWindowSize()

const promotionSwiperSlide = ref(null)

const promotionSlideList = computed(() => {
  let breakpoints = '0'

  if (width.value >= 1025) {
    breakpoints = promotionSwiperSlide?.value?.breakpoints['1025']?.slidesPerView
  } else if (width.value >= 1000) {
    breakpoints = promotionSwiperSlide?.value?.breakpoints['100']?.slidesPerView
  } else if (width.value >= 900) {
    breakpoints = promotionSwiperSlide?.value?.breakpoints['900']?.slidesPerView
  } else if (width.value >= 800) {
    breakpoints = promotionSwiperSlide?.value?.breakpoints['800']?.slidesPerView
  } else if (width.value >= 768) {
    breakpoints = promotionSwiperSlide?.value?.breakpoints['768']?.slidesPerView
  } else if (width.value >= 640) {
    breakpoints = promotionSwiperSlide?.value?.breakpoints['640']?.slidesPerView
  } else if (width.value >= 600) {
    breakpoints = promotionSwiperSlide?.value?.breakpoints['600']?.slidesPerView
  } else if (width.value >= 550) {
    breakpoints = promotionSwiperSlide?.value?.breakpoints['550']?.slidesPerView
  } else if (width.value >= 450) {
    breakpoints = promotionSwiperSlide?.value?.breakpoints['450']?.slidesPerView
  } else if (width.value >= 400) {
    breakpoints = promotionSwiperSlide?.value?.breakpoints['400']?.slidesPerView
  } else if (width.value >= 0) {
    breakpoints = promotionSwiperSlide?.value?.breakpoints['0']?.slidesPerView
  }

  const promoteslist = []

  promoteslist.push(...activePromotes.value)
  if (activePromotes.value.length > breakpoints) {
    promoteslist.push(...activePromotes.value)
  }
  return promoteslist
})
</script>

<template>
  <div class="w-full">
    <Swiper
      ref="promotionSwiperSlide"
      loop
      :slides-per-view="4.2"
      :space-between="8"
      :speed="800"
      :modules="[Autoplay]"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
        reverseDirection: false,
      }"
      :breakpoints="{
        1025: {
          slidesPerView: 4.2,
        },
        1000: {
          slidesPerView: 3.3,
          spaceBetween: 4,
        },
        900: {
          slidesPerView: 3.2,
          spaceBetween: 6,
        },
        800: {
          slidesPerView: 2.8,
          spaceBetween: 6,
        },
        768: {
          slidesPerView: 2.8,
          spaceBetween: 6,
        },
        640: {
          slidesPerView: 2.5,
          spaceBetween: 4,
        },
        600: {
          slidesPerView: 2.2,
          spaceBetween: 4,
        },
        550: {
          slidesPerView: 1.8,
          spaceBetween: 4,
        },
        450: {
          slidesPerView: 1.6,
          spaceBetween: 4,
        },
        400: {
          slidesPerView: 1.2,
          spaceBetween: 4,
        },
        0: {
          slidesPerView: 1.1,
          spaceBetween: 4,
        },
      }"
      class="rounded-l-[2vw] 2xl:rounded-l-[20px]"
    >
      <SwiperSlide v-for="(item, index) in promotionSlideList" :key="index" class="pr-1 pb-1">
        <img
          :src="width <= 640 ? item?.imageUrlMb : item?.imageUrlPc"
          :alt="item?.description"
          class="rounded-[2vw] 2xl:rounded-[20px]"
        >
      </SwiperSlide>
    </Swiper>
    <!-- Skeleton -->
    <div v-if="!activePromotes.length" class="flex gap-3 w-full">
      <USkeleton v-for="i in 4" :key="i" class="h-24 rounded-[2vw] 2xl:rounded-[20px] w-full" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
}
</style>
