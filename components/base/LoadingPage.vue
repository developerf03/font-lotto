<script setup>
const loading = useLoading()
</script>

<template>
  <div
    v-if="loading"
    class="loading-wrapper w-screen h-screen fixed flex items-center justify-center bg-[#000000] bg-opacity-80"
  >
    <div class="flex flex-col justify-center items-center">
      <span class="text-sm">{{ $t('loading') }}</span>
       <base-loading-dot class="lg"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-wrapper {
  z-index: 9999;
}
</style>
