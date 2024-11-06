<script setup>
// Imports
</script>

<template>
  <!-- 173 X 69 -->
  <USkeleton v-if="!useLogo()" class="!rounded-lg h-[69px] w-[174px]" />
  <img v-else :src="useLogo()" alt="logo" srcset="" class="logo h-[69px]" >
</template>

<style lang="scss" scoped></style>
