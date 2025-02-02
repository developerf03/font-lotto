<script setup>
import { nextTick } from 'vue'
// import { object, string } from 'yup'

// Composables
const { showPaymentModal, showPaymentDepositQaModal, showTransactionsModal, paymentModal } =
  useModals()
const { getGateWays, gateWayOption, createDeposit, dataCreateDeposit } = usePayment()
const { fetchPromotions, promotionOptions, promotionDepositCheck } = usePromotion()
const route = useRoute()

// Stores

// State
const loading = ref(false)
const depositForm = reactive({
  gateway: null,
  deposit: null,
})
const promotionSelected = ref(paymentModal.value?.code || '')
const promotionCheck = ref({})
const promotionCheckApprove = ref(true)

// const dataCreateDeposit = ref({bankNameTh: 'ธนาคาร ไทยพาณิชย์ จำกัด (มหาชน)',
//     bankShortNameEN: 'SCB',
//     accountName: 'พศวีร์ แซ่ลิ้ม',
//     bankAccount: '2644433683',
//     money: 14.72,
//     promptpayQr: '00020101021229370016A000000677010111011300666297080825802TH5303764540514.72630491F0'
// })
// Computed
const selectGateWay = computed(() =>
  gateWayOption.value?.find((v) => v.gatewayCode === depositForm.gateway),
)

const depositInput = computed(() => +`${depositForm.deposit}`.replace(/,|\./g, ''))

const checkMinMax = computed(
  () =>
    selectGateWay.value?.channelAmountMin <= $format.removeCommas(depositForm.deposit) &&
    selectGateWay.value?.channelAmountMax >= $format.removeCommas(depositForm.deposit),
)

const promotionDetail = computed(() => usePromotionData(promotionCheck.value?.detail?.promotion))

const isDisableSubmitBtn = computed(() => {
  return !checkMinMax.value || !depositForm.gateway || !depositForm.deposit
})

// Watch

// Functions
const handleDepositSubmit = async () => {
  try {
    //
    loading.value = true
    const { url } = await createDeposit({
      currencyCode: useCurrencyCode(),
      gatewayCode: selectGateWay.value.gatewayCode,
      channelCode: selectGateWay.value.channelCode,
      redirectUrl: `${location.origin}${route.fullPath}`,
      amount: depositInput.value,
      ...(promotionSelected.value?.id && { promotionCode: promotionSelected.value?.id }),
    })
    if (url) {
      setTimeout(() => {
        if (depositForm.gateway.gatewayCode === 'alpha') {
          useNewWindowUrl(url)
        } else {
          location.href = url
        }
        loading.value = false
        showPaymentModal(false, '', null)
        loading.value = false
      }, 3200)
    } else {
      useAlert({
        success: true,
        title: t('success'),
        autoHide: true,
      })
      showPaymentModal(false, '', null)
      showPaymentDepositQaModal(true, true, dataCreateDeposit.value)
      loading.value = false
    }
  } catch (error) {
    //
    loading.value = false
    console.log('catch', error)
  }
}

const setDeposit = (val) => {
  const deposit = depositForm.deposit?.replace(/,|\./g, '') || 0
  const totalDeposit = parseInt(deposit) + parseInt(val)
  depositForm.deposit = numeralCommas(totalDeposit)

  if (paymentModal.value?.code) {
    onPromotionSelected(promotionSelected.value)
  }
}

const onPromotionSelected = (val) => {
  if (val !== 'null') {
    promotionDepositCheck({
      amount: depositInput.value || 0,
      currencyCode: useCurrencyCode(),
      promotionCode: val,
    }).then((res) => {
      promotionCheck.value = res
      promotionCheckApprove.value = res?.approve
    })
  } else {
    promotionCheckApprove.value = true
  }
}

const onSelectGateway = () => {
  depositForm.deposit = null
  promotionSelected.value = paymentModal.value?.code || ''
}

const onTransactions = () => {
  showPaymentModal(false, '', null)
  showTransactionsModal(true, 'deposit')
}

const inputCheckPro = () => {
  setTimeout(() => {
    if (paymentModal.value?.code) {
      onPromotionSelected(promotionSelected.value)
    }
  }, 300);
}

// onMounted
onMounted(() => {
  nextTick(() => {
    getGateWays({
      channelType: 'deposit',
      currencyCode: useCurrencyCode(), // KRW , THB
    })
    fetchPromotions({
      currency: useCurrencyCode(),
      page: 1,
      pageSize: 100,
    })
    if (promotionSelected.value) {
      onPromotionSelected(promotionSelected.value)
    }
  })
})
</script>

<template>
  <div class="deposit-wrapper gap-2 flex justify-center items-center flex-col w-full">
    <div class="text-error text-xs <sm:text-2xs">
      กรุณาตรวจสอบช่องทางการฝากเงินของท่านให้ถูกต้อง และระบุจำนวนเงินตามที่ระบบกำหนด
    </div>
    <UForm :state="depositForm" class="space-y-4 w-full" @submit="handleDepositSubmit">
      <UFormGroup :label="t('serviceProviderChannel')" name="gateway">
        <USelectMenu
          v-model="depositForm.gateway"
          :placeholder="t('selectServiceProvider')"
          :options="gateWayOption"
          value-attribute="gatewayCode"
          option-attribute="channelName"
          @change="onSelectGateway"
        >
          <template #empty> {{ t('noItems') }} </template>
          <!-- <template #leading="{ leading: person }">
            <UAvatar :src="person?.avatar.src" alt="Avatar" />
          </template> -->
        </USelectMenu>
      </UFormGroup>
      <UFormGroup name="deposit">
        <template #label>
          <div class="flex items-center gap-1 mb-1">
            <div class="text-sm">{{ t('table.amount') }}</div>
            <div v-if="depositForm.gateway" class="text-sm text-error">
              <span
                v-if="selectGateWay.channelAmountMin && selectGateWay.channelAmountMax"
                class="text-xs font-normal text-danger"
                >{{
                  $t('minMax', {
                    min: $format.number(selectGateWay.channelAmountMin),
                    max: $format.number(selectGateWay.channelAmountMax),
                  })
                }}</span
              >
              <span
                v-else-if="selectGateWay.channelAmountMin"
                class="text-xs font-normal text-danger"
                >{{
                  $t('minimum', {
                    min: $format.number(selectGateWay.channelAmountMin),
                  })
                }}</span
              >
              <span v-else class="text-xs font-normal text-danger">{{
                $t('maximum', {
                  max: $format.number(selectGateWay.channelAmountMax),
                })
              }}</span>
            </div>
          </div>
        </template>
        <pre>{{depositForm.deposit}}</pre>
        <BaseInput
          v-model="depositForm.deposit"
          placeholder="0.00"
          type="currency"
          :disabled="!depositForm.gateway"
          @input="inputCheckPro"
        />
      </UFormGroup>
      <div
        v-if="!['tron'].includes(selectGateWay?.gatewayCode) && selectGateWay?.amountRatio?.length"
        class="flex flex-wrap gap-3 mb-4 <sm:(gap-2)"
      >
        <UButton
          v-for="(item, index) in selectGateWay?.amountRatio"
          :key="index"
          :label="numeralCommas(item)"
          class="!w-[23%] !h-9 <sm:(!w-[30%])"
          size="sm"
          variant="tertiary"
          @click="setDeposit(item)"
        />
      </div>
      <UFormGroup :label="t('promotions')">
        <USelectMenu
          v-model="promotionSelected"
          :placeholder="t('selectPromotion')"
          :options="promotionOptions"
          value-attribute="id"
          option-attribute="name"
          :disabled="!depositInput"
          @change="onPromotionSelected"
        >
          <template #empty> {{ t('noItems') }} </template></USelectMenu
        >
      </UFormGroup>
      <div
        v-if="promotionSelected !== 'null' && promotionDetail?.code"
        class="w-full mb-4 p-4 card-secondary rounded-lg animate__animated animate__fadeIn"
        :class="[
          {
            'border border-[var(--danger)]': promotionCheckApprove === false,
          },
          {
            'border border-[var(--success)]': promotionCheckApprove === true,
          },
        ]"
      >
        <div class="flex justify-between items-center mb-4">
          <span class="text-base font-semibold text-link">{{ promotionDetail.title }}</span>
        </div>
        <div class="text-base font-semibold mb-1 mt-4">
          {{ t('details') }}
        </div>
        <div
          class="<sm:text-sm sm:text-sm md:text-base text-secondary pl-4 ml-4"
          v-html="promotionDetail?.detail || '-'"
        />
        <!-- Deposit conditions -->
        <div class="text-base font-semibold mb-1 mt-4">
          {{ t('depositConditions') }}
        </div>
        <div class="mt-0 font-normal <sm:text-sm sm:text-sm md:text-base">
          <ul class="list-disc pl-8">
            <li
              v-for="(item, index) in promotionDetail?.condition?.deposit"
              :key="index"
              class="text-secondary"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <!-- withdraw conditions -->
        <div v-if="promotionDetail?.condition?.withdraw?.length === 1">
          <div class="text-base font-semibold mb-1 mt-4">
            {{ t('withdrawalConditions') }}
          </div>
          <div class="mt-0 font-normal <sm:text-sm sm:text-sm md:text-base">
            <ul class="list-disc pl-8">
              <li
                v-for="(item, index) in promotionDetail?.condition?.withdraw[0]"
                :key="index"
                class="text-secondary"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <!-- withdraw group conditions -->
        <div v-if="promotionDetail?.condition?.withdraw.length > 1">
          <div class="text-base font-semibold mb-1 mt-4">
            {{ t('withdrawalConditions') }}
          </div>
          <div
            v-for="(conditionGroup, index) in promotionDetail.condition.withdraw"
            :key="index"
            class="mt-0 font-normal <sm:text-sm sm:text-sm md:text-base"
          >
            <p class="indent-sm text-secondary">
              {{ t('conditionsGroup', { n: index + 1 }) }}
            </p>
            <ul class="list-disc pl-8">
              <li v-for="(item, i) in conditionGroup" :key="i" class="text-secondary">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <!-- Benefits -->
        <div class="mt-4">
          <p class="text-base font-semibold mb-1">
            {{ t('benefits') }}
          </p>
          <ul class="list-disc pl-8 text-sm sm:text-base">
            <li
              v-for="(benefit, index) in promotionDetail.benefits"
              :key="index"
              class="text-secondary"
            >
              {{ benefit }}
            </li>
          </ul>
        </div>
        <!-- Playable game types -->
        <!-- <div class="mt-4">
          <p class="text-base font-semibold mb-1">
            {{ t('playableGameTypes') }}
          </p>
          <div class="flex gap-2 flex-wrap">
            <span
              v-for="(type, index) in promotionDetail.tags"
              :key="index"
              class="uppercase px-2 py-1 bg-card-tertiary rounded-lg text-xs"
              >{{ type }}</span
            >
          </div>
        </div> -->
      </div>
      <UButton
        :label="t('deposit')"
        type="submit"
        size="md"
        variant="solid"
        :loading="loading"
        :disabled="isDisableSubmitBtn || !promotionCheckApprove"
      />
    </UForm>
    <div
      class="mt-4 underline text-highlight cursor-pointer text-base <sm:(text-sm)"
      @click="onTransactions"
    >
      {{ t('transactionHistory') }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
