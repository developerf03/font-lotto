<script setup>
// Imports
import MobileHeader from '~/components/layout/MobileHeader.vue'
import MobileFooter from '~/components/layout/MobileFooter.vue'
</script>

<template>
  <!-- HEADER MOBILE -->
  <MobileHeader class="mlg:hidden" />
  <!-- MAIN CONTENT -->
  <main class="w-full flex flex-col max-w-[1296px] mx-auto">
    <slot />
  </main>
  <!-- FOOTER MOBILE -->
  <MobileFooter class="mlg:hidden" />
</template>
