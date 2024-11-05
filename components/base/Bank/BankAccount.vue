<script setup>
// Import
import placeholder from '~/constants/placeholder'

const { banks } = usePayment()

// Props
defineProps({
  account: {
    type: String,
    default: '',
  },
  bankType: {
    type: String,
    default: '',
  },
  accountName: {
    type: String,
    default: '',
  },
  bankShortName: {
    type: String,
    default: '',
  },
  btnCopy: {
    type: Boolean,
    default: false,
  },
})
// Composables
// const { banks, fetchBankList } = usePayment()
// Stores

// State

// Computeds

// Function

// onMounted
onMounted(() => {
  // Promise.all([fetchBankList({ currencyCode: useDefaults()?.currencyCode })])
})
</script>

<template>
  <div
    class="bank-account-wrapper w-full card-secondary flex justify-between items-center p-2 rounded-md gap-2 <sm:(gap-4 flex-col)"
  >
    <div class="flex flex-col gap-2 <sm:(w-full)">
      <div class="flex items-center gap-2">
        <nuxt-icon filled class="icon-bank-account" name="svg/user-circle" />
        <div class="text-base <sm:text-sm">{{ accountName || '-' }}</div>
      </div>
      <div class="flex gap-2">
        <img
          v-if="banks?.bankList.filter((s) => s.bankCode === bankShortName)[0]?.imageUrl"
          :src="
            banks?.bankList.filter((s) => s.bankCode === bankShortName)[0]?.imageUrl ||
            placeholder.placeholderBank
          "
          class="w-[24px] h-[24px] rounded-full custom-position <sm:(w-[18px] h-[18px])"
        >
        <nuxt-icon v-else filled class="icon-bank-account" name="svg/bank" />
        <div class="text-base <sm:text-sm">{{ bankType || '-' }}</div>
      </div>
      <div class="flex items-center gap-2">
        <nuxt-icon filled class="icon-bank-account" name="svg/bank" />
        <div class="text-base <sm:text-sm">{{ account || '-' }}</div>
      </div>
    </div>
    <UButton
      v-if="btnCopy"
      :label="t('copy')"
      size="sm"
      variant="outline"
      class="!w-auto !whitespace-nowrap <sm:!w-1/2"
      @click="useCopyClipboard(account)"
    />
  </div>
</template>

<style lang="scss">
.bank-account-wrapper {
  .nuxt-icon svg {
    width: 26px !important;
    height: 26px !important;
    margin: 0px !important;
    @media (max-width: 639.9px) {
      width: 20px !important;
      height: 20px !important;
    }
  }
}
</style>
