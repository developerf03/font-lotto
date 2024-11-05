<script setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

// Composables
const { depositTrigger, cancelTransactionPayment, fetchTransactions } = usePayment()

// Stores
const { paymentDepositQaModal, showPaymentDepositQaModal } = useModals()

// State
const depositCountdownTimeSec = ref(300)
const loadingCancelTransaction = ref(false)

// Computed
const paymentQrCode = computed(() => useQRCode(paymentDepositQaModal.value?.item?.promptpayCode))

// Watch
watch(depositTrigger, () => {
  console.log('depositTrigger', depositTrigger)
  showPaymentDepositQaModal(false, false, null)
})

// Functions

const onCancelTransaction = () => {
  loadingCancelTransaction.value = true
  useAlert({
    confirmButtonText: t('ok'),
    cancelButtonText: t('cancel'),
    // title: 'แจ้งเตือน',
    text: t('warningCancelItem'),
    confirmCallback: async () => {
      try {
        await cancelTransactionPayment()
        loadingCancelTransaction.value = false
        useAlert({
          success: true,
          title: t('success'),
        })
        fetchTransactions({
          sDate: '1970-01-01 00:00:00',
          eDate: $format.getLocalDate(),
          page: 1,
          pageSize: 5,
          type: ['add'],
        })
        showPaymentDepositQaModal(false, false, null)
      } catch {
        loadingCancelTransaction.value = false
        useAlert({
          warning: true,
          title: t('alert'),
          text: t('pendingTransaction'),
        })
      }
    },
    cancelCallback: () => {
      loadingCancelTransaction.value = false
    },
  })
}

const handleCountDownEnd = () => {
  cancelTransactionPayment()
  fetchTransactions({
    sDate: '1970-01-01 00:00:00',
    eDate: $format.getLocalDate(),
    page: 1,
    pageSize: 5,
    type: ['add'],
  })
  showPaymentDepositQaModal(false, false, null)
}
</script>

<template>
  <baseModal
    id="payment-deposit-modal-wrapper"
    v-model="paymentDepositQaModal.active"
    :disable-click-out="true"
    :hide-icon-close="false"
  >
    <div class="body-payment-deposit flex justify-center items-center flex-col w-full gap-4">
      <div class="text-lg <sm:(text-base)">
        {{ t('topUpAmount') }}
      </div>
      <div class="w-full flex justify-center items-center flex-col gap-2">
        <div class="">
          <span class="text-highlight text-4xl <sm:(text-3xl)">{{
            $format.currency(paymentDepositQaModal?.item?.amount)
          }}</span>
          <span class="text-2xl <sm:(text-xl) ml-1"> {{ useDefaults()?.currencyCode }}</span>
        </div>
        <div class="text-xs <sm:(text-2xs) text-danger">
          {{ t('pleaseTransferOnly') }}
        </div>
      </div>
      <div
        v-if="paymentDepositQaModal.qa && paymentDepositQaModal?.item?.promptpayCode"
        class="w-full flex justify-center items-center flex-col"
      >
        <img
          v-if="paymentDepositQaModal?.item?.promptpayCode"
          :src="paymentQrCode?.value"
          alt="qrcode payment"
          class="w-1/2 min-w-[168px] rounded-md border border-[2px]"
        >
        <base-countdown
          v-slot="props"
          :time="depositCountdownTimeSec * 1000"
          :pad-start="true"
          @end="handleCountDownEnd"
        >
          <div v-if="props.fullSeconds" class="flex gap-2 justify-center mt-2">
            <div class="font-light text-base <sm:(text-sm) text-highlight">
              {{ $t('withinTime') }}
            </div>
            <div class="font-light text-base <sm:(text-sm) text-highlight">
              <span v-if="props.minutes > 0"> {{ props.minutes }}.</span
              ><span> {{ props.seconds }}</span>
              {{ props.minutes > 0 ? $t('minutes') : $t('seconds') }}
            </div>
          </div>
        </base-countdown>
      </div>
      <BaseBankAccount
        btn-copy
        :account="paymentDepositQaModal?.item?.account"
        :bank-type="paymentDepositQaModal?.item?.bankType"
        :account-name="paymentDepositQaModal?.item?.accountName"
        :bank-short-name="paymentDepositQaModal?.item?.bankShortName"
      />
      <UButton
        :label="t('cancelTransaction')"
        class="!w-full"
        :ui="{ rounded: 'rounded-full' }"
        size="md"
        variant="cancel"
        :loading="loadingCancelTransaction"
        @click="onCancelTransaction"
      />
    </div>
  </baseModal>
</template>

<style lang="scss" scoped></style>
