<script setup>
// Imports
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import mock1 from '~/assets/images/banners/promotion/mock1.png'
import mock2 from '~/assets/images/banners/promotion/mock2.png'
import mock3 from '~/assets/images/banners/promotion/mock3.jpg'
import mock4 from '~/assets/images/banners/promotion/mock4.png'
import mock5 from '~/assets/images/banners/promotion/mock5.png'

const promotion = [mock1, mock2, mock3, mock4, mock5]
</script>

<template>
  <div class="w-full">
    <Swiper
      loop
      :slides-per-view="4.2"
      :space-between="8"
      :speed="800"
      :modules="[Autoplay]"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
        reverseDirection: true,
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
      <SwiperSlide v-for="(item, index) in promotion" :key="index" class="pr-1 pb-1">
        <img :src="item" alt="promotion banner" class="rounded-[2vw] 2xl:rounded-[20px]" >
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
img {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
}
</style>
