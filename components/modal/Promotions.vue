<script setup>
// import { useWindowSize } from '@vueuse/core'

// Composables
const { promotionsModal } = useModals()
// const { fetchPromotions, getPromotionDetail, promotions, loading } = usePromotion()
// const { $i18n } = useNuxtApp()
// const { width } = useWindowSize()
// const { user } = useAuth()

// computed

// function
const onOpenedModal =()=>{
console.log('onOpenedModal');

}
</script>

<template>
  <BaseModal
    id="promotions-wrapper"
    v-model="promotionsModal"
    disable-click-out
    :title="t('promotions')"
    @opened="onOpenedModal"
  >
    <div class="w-full pt-4">promotionsModal</div>
  </BaseModal>
</template>

<style lang="scss">
#promotions-wrapper {
  .body-modal {
    width: 100%;
    max-width: 1300px !important;
  }
  // .card-image {
  //   padding-top: calc(288 / 288 * 100%);
  // }
}
</style>
