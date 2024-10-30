<script setup>
// Imports
import MobileHeader from '~/components/layout/MobileHeader.vue'
import MobileFooter from '~/components/layout/MobileFooter.vue'

// Composables
const { user } = useAuth()
const menu = useMenu()

</script>

<template>
  <!-- HEADER MOBILE -->
  <MobileHeader class="mlg:hidden" />
  <!-- MAIN CONTENT -->
  <main
    class="flex gap-8 max-w-[calc(1784px + 66px)] px-[66px] py-[146px] 2xl:p-0 mlg:(pt-10 pb-10 h-[100dvh]) lg:(pt-[170px] px-10) <lg:(px-[20px]) <sm:(px-[18px])"
    :class="[{ 'pt-[161px]': user }]"
  >
    <!-- MENU -->
    <div class="card-primary w-[260px] min-h-[160px] h-min rounded-[30px] p-5 hidden mlg:block">
      <UVerticalNavigation :links="menu" class="navigation-secondary h-full" />
    </div>
    <slot />
  </main>
  <!-- FOOTER MOBILE -->
  <MobileFooter class="mlg:hidden" />
</template>
