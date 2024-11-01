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
    console.log('0')
    breakpoints = promotionSwiperSlide?.value?.breakpoints['1025']?.slidesPerView
  } else if (width.value >= 1000) {
    console.log('1')
    breakpoints = promotionSwiperSlide?.value?.breakpoints['100']?.slidesPerView
  } else if (width.value >= 900) {
    console.log('2')
    breakpoints = promotionSwiperSlide?.value?.breakpoints['900']?.slidesPerView
  } else if (width.value >= 800) {
    console.log('3')
    breakpoints = promotionSwiperSlide?.value?.breakpoints['800']?.slidesPerView
  } else if (width.value >= 768) {
    console.log('4')
    breakpoints = promotionSwiperSlide?.value?.breakpoints['768']?.slidesPerView
  } else if (width.value >= 640) {
    console.log('5')
    breakpoints = promotionSwiperSlide?.value?.breakpoints['640']?.slidesPerView
  } else if (width.value >= 600) {
    console.log('6')
    breakpoints = promotionSwiperSlide?.value?.breakpoints['600']?.slidesPerView
  } else if (width.value >= 550) {
    console.log('7')
    breakpoints = promotionSwiperSlide?.value?.breakpoints['550']?.slidesPerView
  } else if (width.value >= 450) {
    console.log('8')
    breakpoints = promotionSwiperSlide?.value?.breakpoints['450']?.slidesPerView
  } else if (width.value >= 400) {
    console.log('9')
    breakpoints = promotionSwiperSlide?.value?.breakpoints['400']?.slidesPerView
  } else if (width.value >= 0) {
    console.log('10')
    breakpoints = promotionSwiperSlide?.value?.breakpoints['0']?.slidesPerView
  }

  const promoteslist = []
  
  promoteslist.push(...activePromotes.value)
  if (activePromotes.value.length > breakpoints) {
    promoteslist.push(...activePromotes.value)
  }
  return promoteslist
})

// const promotionSlideList = computed(() => {
//   let breakpoints = '0'
//   console.log('width', width.value)

//   if (width.value >= 0 || width.value <= 399) {
//     console.log('0')
//     breakpoints = promotionSwiperSlide?.value?.breakpoints['0']?.slidesPerView
//   } else if (width.value >= 400 || width.value <= 449) {
//     console.log('1')
//     breakpoints = promotionSwiperSlide?.value?.breakpoints['400']?.slidesPerView
//   } else if (width.value >= 450 || width.value <= 549) {
//     console.log('2')
//     breakpoints = promotionSwiperSlide?.value?.breakpoints['450']?.slidesPerView
//   } else if (width.value >= 550 || width.value <= 599) {
//     console.log('3')
//     breakpoints = promotionSwiperSlide?.value?.breakpoints['550']?.slidesPerView
//   } else if (width.value >= 600 || width.value <= 649) {
//     console.log('4')
//     breakpoints = promotionSwiperSlide?.value?.breakpoints['600']?.slidesPerView
//   } else if (width.value >= 640 || width.value <= 767) {
//     console.log('5')
//     breakpoints = promotionSwiperSlide?.value?.breakpoints['640']?.slidesPerView
//   } else if (width.value >= 768 || width.value <= 799) {
//     console.log('6')
//     breakpoints = promotionSwiperSlide?.value?.breakpoints['768']?.slidesPerView
//   } else if (width.value >= 800 || width.value <= 899) {
//     console.log('7')
//     breakpoints = promotionSwiperSlide?.value?.breakpoints['800']?.slidesPerView
//   } else if (width.value >= 900 || width.value <= 999) {
//     console.log('8')
//     breakpoints = promotionSwiperSlide?.value?.breakpoints['900']?.slidesPerView
//   } else if (width.value >= 1000 || width.value <= 1024) {
//     console.log('9')
//     breakpoints = promotionSwiperSlide?.value?.breakpoints['1000']?.slidesPerView
//   } else if (width.value >= 1025) {
//     console.log('10')
//     breakpoints = promotionSwiperSlide?.value?.breakpoints['1025']?.slidesPerView
//   }
//   // else {
//   //   console.log('else')
//   //   breakpoints = promotionSwiperSlide?.value?.breakpoints['1025']?.slidesPerView
//   // }

//   console.log('breakpoints', breakpoints)

//   return activePromotes
// })
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
  </div>
</template>

<style lang="scss" scoped>
img {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
}
</style>
