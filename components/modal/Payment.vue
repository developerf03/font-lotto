<script setup>
import transactionsAllModal from '~/components/modal/Transactions.vue'
// Composables
const { paymentModal } = useModals()

// Stores

// State

// Computed
const items = computed(() => [
  {
    id: 'deposit',
    label: t('deposit'),
  },
  {
    id: 'withdraw',
    label: t('withdraw'),
  },
])

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
  <baseModal id="payment-modal-wrapper" v-model="paymentModal.active" :disable-click-out="true">
    <UTabs v-model="tabPayment" :items="items" @change="onChange" />
    <component :is="componentsPaymentBank?.[paymentModal.tab]?.component" />
    <transactionsAllModal />
  </baseModal>
</template>

<style lang="scss" scoped></style>
