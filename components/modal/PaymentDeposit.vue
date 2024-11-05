<script setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

// Composables
const { depositTrigger, cancelTransactionPayment } = usePayment()

// Stores
const { paymentDepositQaModal, showPaymentDepositQaModal } = useModals()

// State
const depositCountdownTimeSec = ref(120)

// Computed
const paymentQrCode = computed(() => useQRCode(paymentDepositQaModal.value?.item?.promptpayCode))

// Watch
watch(depositTrigger, () => {
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
        <!-- <div class="text-sm <sm:(text-xs)">( โอนภายใน 04:30 น. )</div> -->

        <!-- 600000 = 10นาที -->
        <base-countdown v-slot="props" :time="depositCountdownTimeSec * 1000" :pad-start="true">
          <div v-if="props.fullSeconds" class="flex gap-2 justify-center">
            <div class="font-light text-base <sm:(text-sm)">{{ $t('withinTime') }}</div>
            <div class="font-light text-base <sm:(text-sm) text-primary">
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
