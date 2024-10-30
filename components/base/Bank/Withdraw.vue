<script setup>
// import { object, string } from 'yup'
// import placeholder from '~/constants/placeholder';

// Composables
const { showPaymentModal, showTransactionsModal } = useModals()
const { gateWayOption, banks, getGateWays, getBankAccounts, fetchBankList, createWithdraw } =
  usePayment()
const { promotionWithdrawCheck } = usePromotion()
const route = useRoute()
// Stores

// State
const withdrawForm = reactive({
  gateway: null,
  withdraw: null,
})
const addBankForm = reactive({
  accountName: null,
  bankCode: null,
  accountNumber: null,
})
const bankOption = ref('main')
const accountOptions = ref([
  {
    value: 'main',
    label: 'บัญชีหลัก',
  },
  {
    value: 'other',
    label: 'บัญชีอื่นๆ',
  },
])
const loading = ref(false)
const currentPromotion = ref(null)

// Computed
// const schema = object({
//   gateway: string().required('กรุณาเลือก gateway'),
// })

const dataBankAccount = computed(() => banks.value?.bankAccountList?.find((v) => v?.isDefault))

const selectGateWay = computed(() =>
  gateWayOption.value?.find((v) => v.gatewayCode === withdrawForm.gateway),
)

const bankListOption = computed(() =>
  banks.value?.bankList?.map((o) => ({
    ...o,
    avatar: { src: o?.imageUrl },
  })),
)

const isAddNewBank = computed(() => {
  return bankOption.value !== 'main'
    ? !addBankForm?.accountName || !addBankForm?.bankCode || !addBankForm?.accountNumber
    : false
})

const checkMinMax = computed(
  () =>
    selectGateWay.value?.channelAmountMin <= $format.removeCommas(withdrawForm.withdraw) &&
    selectGateWay.value?.channelAmountMax >= $format.removeCommas(withdrawForm.withdraw),
)

const isDisableSubmitBtn = computed(() => {
  return !checkMinMax.value || !withdrawForm.gateway || !withdrawForm.withdraw
})

const enableOtherBank = computed(
  () => useLobbySetting()?.setting.value?.withdrawSetting?.[useCurrencyCode()]?.enableOtherBank,
)

const withdrawCondition = computed(() =>
  getConditionsByEvidence(
    currentPromotion.value?.detail?.evidence,
    currentPromotion.value?.stacking_exist,
  ),
)

// Watch

// Functions
const handleWithdrawSubmit = async () => {
  console.log('submit')
  loading.value = true
  try {
    //
    await createWithdraw({
      currencyCode: useCurrencyCode(),
      gatewayCode: selectGateWay.value?.gatewayCode,
      channelCode: selectGateWay.value?.channelCode,
      redirectUrl: `${location.origin}${route.fullPath}`,
      amount: $format.removeCommas(withdrawForm.withdraw),
      bankAccountId: dataBankAccount.value.id,
      refCode: '',
      // refCode: refCodeOTP.value?.Code || '',
      ...(enableOtherBank.value &&
        !['main'].includes(bankOption.value) && {
          ...addBankForm,
          bankCode: bankOtherForm.bankCode,
        }),
    })
    loading.value = false
    showPaymentModal(false, '', null)
  } catch (error) {
    console.log(error)
    if (error?.data?.code === 4078) {
      //
    } else {
      //
    }
    loading.value = false
  }
}

const setWithdraw = (val) => {
  const withdraw = withdrawForm.withdraw?.replace(/,|\./g, '') || 0
  const totalWithdraw = parseInt(withdraw) + parseInt(val)
  withdrawForm.withdraw = numeralCommas(totalWithdraw)
}

const onSelectGateway = () => {
  withdrawForm.withdraw = null
}

const onTransactions = () => {
  showPaymentModal(false, '', null)
  showTransactionsModal(true, 'withdraw')
}

// onMounted
onMounted(() => {
  getGateWays({
    channelType: 'withdraw',
    currencyCode: useCurrencyCode(), // KRW , THB
  })
  promotionWithdrawCheck({ currencyCode: useCurrencyCode() }).then((res) => {
    currentPromotion.value = res
  })
  fetchBankList({ currencyCode: useCurrencyCode() })
  getBankAccounts({ currencyCode: useCurrencyCode() })
})
</script>

<template>
  <div class="withdraw-wrapper gap-2 flex justify-center items-center flex-col w-full">
    <div class="crad-Wallet w-full rounded-md flex justify-center items-center flex-col h-[81px]">
      <div class="text-secondary text-sm">ยอดเงินปัจจุบัน</div>
      <div class="text-primary font-medium text-xl <sm:(text-lg)">
        {{ $format.currency(useAuth()?.balance) }}
      </div>
    </div>
    <UForm :state="withdrawForm" class="space-y-4 w-full" @submit="handleWithdrawSubmit">
      <UFormGroup :label="t('serviceProviderChannel')" name="gateway">
        <USelectMenu
          v-model="withdrawForm.gateway"
          :placeholder="t('selectServiceProvider')"
          :options="gateWayOption"
          value-attribute="gatewayCode"
          option-attribute="channelName"
          @change="onSelectGateway"
        >
          <template #empty> {{ t('noItems') }} </template></USelectMenu
        >
      </UFormGroup>
      <!-- บัญชี -->
      <div class="flex flex-col gap-1">
        <URadioGroup
          v-if="enableOtherBank"
          v-model="bankOption"
          :options="accountOptions"
          class="account-group"
        />
        <BaseBankAccount
          v-if="bankOption === 'main'"
          :btn-copy="true"
          :account="dataBankAccount?.accountNumber"
          :bank-type="dataBankAccount?.bankName"
          :account-name="dataBankAccount?.accountName"
          :bank-short-name="dataBankAccount?.bankCode"
        />
        <div v-else class="pt-2">
          <div class="px-4 pt-3 pb-4 rounded-md border border-[1px] border-[#D1D1D1]">
            <UForm :state="addBankForm" class="space-y-2 w-full">
              <UFormGroup label="ชื่อบัญชี" name="accountName">
                <BaseInput v-model="addBankForm.accountName" placeholder="กรอกชื่อบัญชี" />
              </UFormGroup>
              <UFormGroup label="ธนาคาร" name="bankCode">
                <USelectMenu
                  v-model="addBankForm.bankCode"
                  placeholder="เลือกธนาคาร"
                  :options="bankListOption"
                  value-attribute="bankCode"
                  option-attribute="bankDescription"
                >
                  <template #empty> {{ t('noItems') }} </template></USelectMenu
                >
              </UFormGroup>
              <UFormGroup label="เลขบัญชีธนาคาร" name="accountNumber">
                <BaseInput
                  v-model="addBankForm.accountNumber"
                  placeholder="กรอกเลขบัญชีธนาคาร"
                  type="number"
                />
              </UFormGroup>
            </UForm>
          </div>
        </div>
      </div>

      <UFormGroup name="deposit">
        <template #label>
          <div class="flex items-center gap-1 mb-1">
            <div class="text-sm">{{ t('table.amount') }}</div>
            <div v-if="withdrawForm.gateway" class="text-sm text-error">
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
        <BaseInput
          v-model="withdrawForm.withdraw"
          placeholder="0.00"
          type="currency"
          :disabled="!withdrawForm.gateway"
        />
      </UFormGroup>
      <div
        v-if="!['tron'].includes(selectGateWay?.gatewayCode) && selectGateWay?.amountRatio.length"
        class="flex flex-wrap gap-3 mb-4 <sm:(gap-2)"
      >
        <UButton
          v-for="(item, index) in selectGateWay?.amountRatio"
          :key="index"
          :label="numeralCommas(item)"
          class="!w-[23%] !h-9 <sm:(!w-[30%])"
          size="sm"
          variant="tertiary"
          @click="setWithdraw(item)"
        />
      </div>

      <!-- withdrawCondition -->
      <div
        v-if="withdrawCondition?.length"
        class="w-full mb-4 p-4 card-secondary rounded-lg animate__animated animate__fadeIn"
        :class="[
          {
            'border !border-[var(--danger)]': currentPromotion?.approve === false,
          },
          {
            'border !border-[var(--success)]': currentPromotion?.approve === true,
          },
        ]"
      >
        <div class="text-lg font-normal">
          {{ t('withdrawalConditions') }}
        </div>
        <div v-for="(group, groupIndex) in withdrawCondition" :key="groupIndex" class="w-full flex justify-center items-center flex-col gap-4 mt-3">
          <div v-for="(item, index) in group" :key="index" class="pl-4 w-full">
            <div class="span-dashed text-sm font-normal text-secondary pl-4">
              {{ item.text }}
            </div>
            <div class="w-full">
              <UProgress :value="item.remaining" :max="item.conditionAmount" class="my-1" />
              <div class="flex justify-between items-center">
                <span class="text-sm <sm:text-xs">{{
                  item.game_type ? t('remainingBet') : t('remainingBalance')
                }}</span>
                <span class="text-sm <sm:text-xs"
                  >{{ $format.currency(item.remaining) }}/{{
                    $format.currency(item.condition_amount)
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <UButton
        :label="t('withdraw')"
        type="submit"
        size="md"
        variant="solid"
        :disabled="isDisableSubmitBtn || isAddNewBank"
        :loading="loading"
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

<style lang="scss">
.withdraw-wrapper {
  .account-group {
    fieldset {
      display: flex;
      gap: 10px;
    }
  }
  .crad-Wallet {
    background: linear-gradient(#ecf3ff, #ecf3ff) padding-box,
      linear-gradient(90deg, #4e65ff 0%, #5cdaed 100%) border-box;
    border: 1px solid transparent;
  }
  .border {
    border: 1px solid #d1d1d1;
  }
  .span-dashed {
    position: relative;
    &::before {
      content: '';
      background: #fff;
      width: 7px;
      height: 7px;
      border-radius: 100%;
      position: absolute;
      top: 5px;
      left: 0%;
    }
  }
}
</style>
