<script setup>
// Import

// Composables
const { getBankAccounts, banks } = usePayment()

// Stores
const { bankAccountModal, handleBankAccountModal } = useModals()

// Computeds
const dataBankAccount = computed(() => banks?.value?.bankAccountList?.find((v) => v?.isDefault))
console.log('dataBankAccount :>> ', dataBankAccount.value)

// Functions
const fetchApi = async () => {
  await getBankAccounts({ currencyCode: useCurrencyCode() })
}

// Mounted
onMounted(() => {
  fetchApi()
})

// Watchs
watch(bankAccountModal, (val) => {
  console.log('val :>> ', val)
  if (val) {
    getBankAccounts({ currencyCode: useCurrencyCode() })
  }
})
</script>

<template>
  <baseModal
    id="bank-account-sub-menu-modal-wrapper"
    v-model="bankAccountModal"
    :disable-click-out="true"
    :hide-icon-close="false"
  >
    <pre>{{ bankAccountModal }}</pre>
    <div class="flex justify-center items-center flex-col w-full gap-4">
      <span>จัดการบัญชีธนาคาร</span>
      <BaseBankAccount
        btn-copy
        :account="dataBankAccount?.accountNumber"
        :bank-type="dataBankAccount?.bankName"
        :account-name="dataBankAccount?.accountName"
        :bank-short-name="dataBankAccount?.bankCode"
      />
      <UButton
        label="ปิด"
        class="!w-full"
        :ui="{ rounded: 'rounded-full' }"
        size="md"
        variant="tertiary"
        @click="handleBankAccountModal(false)"
      />
    </div>
  </baseModal>
</template>
