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
  // Promise.all([fetchBankList({ currencyCode: useCurrencyCode() })])
})
</script>

<template>
  <div
    class="bank-account-wrapper w-full card-secondary flex justify-between items-center p-2 rounded-md gap-2 <sm:(gap-4)"
  >
    <div class="flex items-center gap-2 <sm:(w-full)">
      <div class="flex justify-center flex-col gap-2">
        <nuxt-icon filled class="icon-bank-account" name="svg/user-circle" />
        <img
          :src="
            banks?.bankList.filter((s) => s.bankCode === bankShortName)[0]?.imageUrl ||
            placeholder.placeholderBank
          "
          class="w-6 h-6 rounded-full custom-position <sm:(w-[18px] h-[18px])"
        >
        <nuxt-icon filled class="icon-bank-account" name="svg/bank" />
      </div>
      <div class="flex justify-center flex-col gap-2">
        <div class="text-base <sm:text-sm">{{ accountName || '-' }}</div>
        <div class="text-base <sm:text-sm">{{ bankType || '-' }}</div>
        <div class="text-base <sm:text-sm">{{ account || '-' }}</div>
      </div>
    </div>
    <UButton
      v-if="btnCopy"
      label="คัดลอกบัญชี"
      size="sm"
      variant="outline"
      class="!w-auto !whitespace-nowrap"
      @click="useCopyClipboard(account)"
    />
  </div>
</template>

<style lang="scss">
.bank-account-wrapper {
  .nuxt-icon svg {
    width: 24px !important;
    height: 24px !important;
    margin: 0px !important;
    @media (max-width: 639.9px) {
      width: 18px !important;
      height: 18px !important;
    }
  }
}
</style>
