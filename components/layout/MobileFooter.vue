<script setup>
// Composables
const menu = useMenu()
</script>

<template>
  <div
    class="mobile-header-wrapper w-[calc(100vw_-_32px)] h-[70px] p-2 fixed bottom-4 left-1/2 transform -translate-x-1/2 card-primary rounded-[20px] z-10 md:w-[calc(100vw_-_48px)]"
  >
    <UHorizontalNavigation :links="menu" />
  </div>
</template>

<style lang="scss" scoped>
.mobile-header-wrapper {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>
