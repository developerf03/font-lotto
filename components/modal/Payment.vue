<script setup>
// Composables
const { paymentModal } = useModals()

// Stores

// State
const items = ref([
  {
    id: 'deposit',
    label: t('deposit'),
  },
  {
    id: 'withdraw',
    label: t('withdraw'),
  },
])

// Computed
const componentsPaymentBank = computed(() => ({
  deposit: {
    component: resolveComponent('BaseBankDeposit'),
  },
  withdraw: {
    component: resolveComponent('BaseBankWithdraw'),
  },
}))

// computed

const tabPayment = computed(() =>
  items.value?.findIndex((item) => item.id === paymentModal.value?.tab),
)

// Watch

// Functions
const onChange = (val) => {
  paymentModal.value.tab = items.value?.[val]?.id
  paymentModal.value.code = null
}
</script>

<template>
  <baseModal id="payment-modal-wrapper" v-model="paymentModal.active" :click-out-side="false">
    <UTabs v-model="tabPayment" :items="items" @change="onChange" />
    <component :is="componentsPaymentBank?.[paymentModal.tab]?.component" />
  </baseModal>
</template>

<style lang="scss" scoped></style>
