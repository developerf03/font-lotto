<script setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

// props
// const props = defineProps({
// data: {
//   type: Object,
//   default: () => {},
// },
// banks: {
//   type: Array,
//   default: () => [],
// },
// })

// Composables
const { depositTrigger, cancelTransactionPayment } = usePayment()

// Stores
const { paymentDepositQaModal, showPaymentDepositQaModal } = useModals()

// State

// Computed
const paymentQrCode = computed(() => useQRCode(paymentDepositQaModal.value?.item?.promptpayCode))

// Watch
watch(depositTrigger, () => {
  console.log('depositTrigger', depositTrigger)
  showPaymentDepositQaModal(false, false, null)
})

// Functions
const oncancelPaymentQa = () => {
  cancelTransactionPayment()
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
    <!-- <pre>{{ paymentDepositQaModal.item }}</pre> -->
    <div class="body-payment-deposit flex justify-center items-center flex-col w-full gap-4">
      <div class="text-base <sm:(text-sm)">
        {{
          paymentDepositQaModal.qa
            ? 'กรุณาแสกน QR นี้เพื่อเติมเงิน'
            : 'กรุณาคัดลอกบัญชีและโอนเงินตามที่กำหนด'
        }}
      </div>
      <div class="w-full flex justify-center items-center flex-col gap-2">
        <div class="text-4xl <sm:(text-3xl)">{{ paymentDepositQaModal?.item?.amount }} บาท</div>
        <div class="text-xs <sm:(text-2xs)">
          {{
            paymentDepositQaModal.qa
              ? '(โอนตามจำนวนที่กำหนดภายใน 5 นาที ห้ามปัดยอด)'
              : '(โอนตามจำนวนที่กำหนดภายใน 5 นาที ห้ามปัดยอด เมื่อโอนแล้วห้ามปิดหน้านี้)'
          }}
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
          class="w-1/2 min-w-[168px]"
        >
        <div class="text-sm <sm:(text-xs)">( โอนภายใน 04:30 น. )</div>
      </div>
      <BaseBankAccount
        btn-copy
        :account="paymentDepositQaModal?.item?.account"
        :bank-type="paymentDepositQaModal?.item?.bankType"
        :account-name="paymentDepositQaModal?.item?.accountName"
        :bank-short-name="paymentDepositQaModal?.item?.bankShortName"
      />
      <UButton
        label="ยกเลิกรายการ"
        class="!w-full"
        :ui="{ rounded: 'rounded-full' }"
        size="md"
        variant="tertiary"
        @click="oncancelPaymentQa"
      />
    </div>
  </baseModal>
</template>

<style lang="scss" scoped></style>
