<script setup>
// Imports
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'

// Composables
const menu = useMenu()
</script>

<template>
  <div class="home-banner-wrapper w-full">
    <div class="pt-[100%] relative">
      <!-- BANNER -->
      <div class="banner-mask absolute top-0 left-0 w-full h-full overflow-hidden">
        <swiper
          class="w-full h-full rounded-[20px] mlg:rounded-none"
          loop
          :slides-per-view="1"
          :speed="800"
          :pagination="true"
          :modules="[Pagination, Autoplay]"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
            reverseDirection: true,
          }"
        >
          <swiper-slide v-for="index in 3" :key="index" class="w-full h-full">
            <img
              src="~/assets/images/banners/banner.gif"
              alt="banner"
              class="w-full h-full object-cover"
            >
          </swiper-slide>
        </swiper>
      </div>
      <!-- MENU -->
      <div
        class="absolute bottom-0 left-0 card-primary w-[31%] h-[31.1%] rounded-[25%] p-5 hidden mlg:block"
      >
        <UVerticalNavigation :links="menu" class="navigation-secondary h-full" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home-banner-wrapper {
  @media only screen and (min-width: 1024.9px) {
    .banner-mask {
      -webkit-mask-image: url('../../assets/images/banners/banner-mask.svg');
      mask-image: url('../../assets/images/banners/banner-mask.svg');
      mask-repeat: no-repeat;
      mask-size: 100%;
    }
  }

  .swiper-pagination.swiper-pagination-bullets {
    width: 67%;
    right: 0;
    left: unset;
    .swiper-pagination-bullet {
      background: rgba(255, 255, 255, 0.5) !important;
      opacity: 1 !important;
      box-shadow: rgba(0, 0, 0, 0.8) 0px 1px 3px 0px;
      border-radius: 100%;
      &.swiper-pagination-bullet-active {
        transition: width 0.3s;
        width: 25px;
        background: white !important;
        border-radius: 10px;
      }
    }
  }
}
</style>
