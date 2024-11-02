<script setup>
// Props
defineProps({
  play: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <span class="dot-jumping-wrapper dots-cont w-full grid grid-cols-3 gap-1">
    <span
      class="dot dot-1"
      :style="{ animationName: play ? 'jump' : '', animationDelay: '100ms' }"
    />
    <span
      class="dot dot-2"
      :style="{ animationName: play ? 'jump' : '', animationDelay: '200ms' }"
    />
    <span
      class="dot dot-3"
      :style="{ animationName: play ? 'jump' : '', animationDelay: '300ms' }"
    />
  </span>
</template>

<style lang="scss">
.dot-jumping-wrapper {
  .dot {
    width: 100%;
    padding-top: 100%;
    background: #fff;
    display: inline-block;
    border-radius: 50%;
    position: relative;
    animation-duration: 1s;
    animation-iteration-count: 1;
  }
  .dots-cont:hover > .dot {
    /* position: relative; */
    /* bottom: 0px; */
    animation: none;
  }
  .dots-cont .dot-1 {
    -webkit-animation-delay: 100ms;
    animation-delay: 100ms;
  }
  .dots-cont .dot-2 {
    -webkit-animation-delay: 200ms;
    animation-delay: 200ms;
  }
  .dots-cont .dot-3 {
    -webkit-animation-delay: 300ms;
    animation-delay: 300ms;
  }
}
@keyframes jump {
  0% {
    bottom: 0px;
  }
  20% {
    bottom: 5px;
  }
  40% {
    bottom: 0px;
  }
}
</style>
