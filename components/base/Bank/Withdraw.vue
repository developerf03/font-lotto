<script setup>
// import { object, string } from 'yup'
// import placeholder from '~/constants/placeholder';

// Composables
const { showPaymentModal, showTransactionsModal, handVerifyOTPModal, handleBankAccountModal } =
  useModals()
const {
  bankListLoading,
  gateWayOption,
  banks,
  getGateWays,
  getBankAccounts,
  fetchBankList,
  createWithdraw,
} = usePayment()
const { promotionWithdrawCheck } = usePromotion()
const route = useRoute()
const signUpSetting = computed(() => useSignUpSetting())

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
const accountOptions = computed(() => [
  {
    value: 'main',
    label: t('defaultAccount'),
  },
  {
    value: 'other',
    label: t('useAnotherAccount'),
  },
])
const loading = ref(false)
const currentPromotion = ref(null)
const refCodeOTP = useState('refCodeOTP')

// Computed
// const schema = object({
//   gateway: string().required('กรุณาเลือก gateway'),
// })

const dataBankAccount = computed(() => banks.value?.bankAccountList?.find((v) => v?.isDefault))
const balanceWallet = computed(() => useAuth()?.balance.value)
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
    ? !addBankForm?.accountName || !addBankForm?.bankCode?.bankCode || !addBankForm?.accountNumber
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
  () =>
    useLobbySetting()?.setting.value?.withdrawSetting?.[useDefaults()?.currencyCode]
      ?.enableOtherBank,
)

const withdrawCondition = computed(() =>
  getConditionsByEvidence(
    currentPromotion.value?.detail?.evidence,
    currentPromotion.value?.stacking_exist,
  ),
)

// Watch

// Functions
const handleWithdrawSubmit = () => {
  if (signUpSetting.value?.verifyWithdraw) {
    handVerifyOTPModal({
      active: true,
      typeSend: 'withdraw',
      cb: submitWithdraw,
    })
  } else {
    submitWithdraw()
  }
}

const submitWithdraw = async () => {
  loading.value = true
  try {
    //
    await createWithdraw({
      currencyCode: useDefaults()?.currencyCode,
      gatewayCode: selectGateWay.value?.gatewayCode,
      channelCode: selectGateWay.value?.channelCode,
      redirectUrl: `${location.origin}${route.fullPath}`,
      amount: $format.removeCommas(withdrawForm.withdraw),
      bankAccountId: dataBankAccount.value.id,
      refCode: refCodeOTP.value?.Code || '',
      ...(enableOtherBank.value &&
        !['main'].includes(bankOption.value) && {
          ...addBankForm,
          bankCode: addBankForm?.bankCode?.bankCode,
        }),
    })
    loading.value = false
    showPaymentModal(false, '', null)
  } catch (error) {
    console.log(error)
    if (error?.data?.code === 4078) {
      //
      useAlert({
        warning: true,
        title: t('alert'),
        text: t('withdrawConditionTurnover', { turnover: error?.data?.turnover }),
        confirmButtonText: t('close'),
      })
    } else {
      //
      useAlert({
        error: true,
        title: useErrorMsg({ error }),
        autoHide: true,
      })
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
  showTransactionsModal(true, 'withdraw')
}

const onRadioOtherBank = () => {
  addBankForm.accountName = dataBankAccount.value?.accountName
}

const handlePhoneOTP = () => {
  handVerifyOTPModal({
    active: true,
    typeSend: 'changeprofile',
  })
}

// onMounted
onMounted(() => {
  getGateWays({
    channelType: 'withdraw',
    currencyCode: useDefaults()?.currencyCode, // KRW , THB
  })
  promotionWithdrawCheck({ currencyCode: useDefaults()?.currencyCode }).then((res) => {
    currentPromotion.value = res
  })
  fetchBankList({ currencyCode: useDefaults()?.currencyCode })
  getBankAccounts({ currencyCode: useDefaults()?.currencyCode })
})
</script>

<template>
  <div class="withdraw-wrapper gap-2 flex justify-center items-center flex-col w-full">
    <!-- <pre> ==>{{ signUpSetting }}</pre> -->
    <div
      v-if="signUpSetting?.isVerify && !bankListLoading && banks.bankAccountList.length"
      class="w-full gap-2 flex justify-center items-center flex-col"
    >
      <div
        class="crad-Wallet card-tertiary w-full rounded-md flex justify-center items-center flex-col h-[81px]"
      >
        <div class="text-secondary text-sm">{{ t('remainingBalance') }}</div>
        <div class="text-primary font-medium text-xl <sm:(text-2xl)">
          {{ $format.currency(balanceWallet) }}
        </div>
      </div>
      <UForm :state="withdrawForm" class="space-y-4 w-full" @submit="handleWithdrawSubmit">
        <UFormGroup :label="t('serviceProviderChannel')" name="gateway">
          <USelectMenu
            v-model="withdrawForm.gateway"
            :placeholder="t('selectServiceProvider')"
            :options="gateWayOption"
            value-attribute="gatewayCode"
            option-attribute="channelNameDisplay"
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
            @change="onRadioOtherBank"
          />
          <BaseBankAccount
            v-if="bankOption === 'main'"
            :btn-copy="false"
            :account="dataBankAccount?.accountNumber"
            :bank-type="dataBankAccount?.bankName"
            :account-name="dataBankAccount?.accountName"
            :bank-short-name="dataBankAccount?.bankCode"
          />
          <div v-else class="pt-2">
            <div class="px-4 pt-3 pb-4 rounded-md border border-[1px] border-[#D1D1D1]">
              <UForm :state="addBankForm" class="space-y-2 w-full">
                <UFormGroup :label="t('accountHoldername')" name="accountName">
                  <BaseInput
                    v-model="addBankForm.accountName"
                    :placeholder="t('accountHoldername')"
                    readonly
                  />
                </UFormGroup>
                <UFormGroup :label="t('bank')" name="bankCode">
                  <!-- value-attribute="bankCode" -->
                  <USelectMenu
                    v-model="addBankForm.bankCode"
                    :placeholder="t('selectBank')"
                    :options="bankListOption"
                    searchable
                    option-attribute="bankDescription"
                  >
                    <template #empty> {{ t('noItems') }} </template>
                    <template v-if="addBankForm.bankCode?.imageUrl" #leading>
                      <UAvatar
                        v-if="addBankForm.bankCode?.imageUrl"
                        v-bind="{ src: addBankForm.bankCode?.imageUrl }"
                        size="2xs"
                      />
                    </template>
                  </USelectMenu>
                </UFormGroup>
                <UFormGroup :label="t('accountNumber')" name="accountNumber">
                  <BaseInput
                    v-model="addBankForm.accountNumber"
                    :placeholder="t('accountNumber')"
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
              <div>{{ t('table.amount') }}</div>
              <div v-if="withdrawForm.gateway" class="text-error">
                <span
                  v-if="selectGateWay.channelAmountMin && selectGateWay.channelAmountMax"
                  class="text-sm font-normal text-danger"
                  >{{
                    $t('minMax', {
                      min: $format.number(selectGateWay.channelAmountMin),
                      max: $format.number(selectGateWay.channelAmountMax),
                    })
                  }}</span
                >
                <span
                  v-else-if="selectGateWay.channelAmountMin"
                  class="text-sm font-normal text-danger"
                  >{{
                    $t('minimum', {
                      min: $format.number(selectGateWay.channelAmountMin),
                    })
                  }}</span
                >
                <span v-else class="text-sm font-normal text-danger">{{
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
            font-size="lg"
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
            class="!w-[23%] !h-9 <sm:(!w-[48%])"
            size="sm"
            variant="tertiary"
            @click="setWithdraw(item)"
            ><span class="<sm:text-lg"> {{ numeralCommas(item) }}</span></UButton
          >
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
          <div
            v-for="(group, groupIndex) in withdrawCondition"
            :key="groupIndex"
            class="w-full flex justify-center items-center flex-col gap-4 mt-3"
          >
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
        class="mt-4 underline text-highlight cursor-pointer <sm:(text-sm)"
        @click="onTransactions"
      >
        {{ t('transactionHistory') }}
      </div>
    </div>
    <!-- isVerify -->
    <div v-else class="gap-2 flex justify-center items-center flex-col w-full min-h-[454px]">
      <!-- NOT VERIFY -->
      <div
        v-if="!signUpSetting?.isVerify"
        class="flex flex-col justify-center items-center gap-2 w-full"
      >
        <nuxt-icon
          :name="signUpSetting?.verifyWith === 'phone' ? 'svg/verify-phone' : 'email-account'"
          class="text-6xl <sm:(text-5xl) text-tertiary"
        />
        <span class="text-tertiary mt-2 text-center <sm:(text-sm)">{{
          signUpSetting?.verifyWith === 'phone'
            ? $t('notVerifyPhoneForWithdrawal')
            : $t('pleaseVerifyEmailBeforeMakingWithdrawal')
        }}</span>
        <UButton
          :label="signUpSetting?.verifyWith === 'phone' ? $t('verifyPhone') : $t('verifyEmail')"
          type="submit"
          size="md"
          variant="solid"
          class="!min-w-[50px] w-auto mt-4"
          @click="handlePhoneOTP"
        />
      </div>
      <!-- NOT VERIFY -->

      <!-- NO BANK -->
      <div
        v-else-if="!banks.bankAccountList.length"
        class="flex flex-col justify-center items-center gap-2 w-full"
      >
        <nuxt-icon name="svg/bank" class="text-6xl <sm:(text-5xl) text-tertiary" />
        <span class="text-tertiary mt-2 text-center <sm:(text-sm)">{{
          $t('noAccountForWithdrawal')
        }}</span>
        <UButton
          :label="t('goToAddAccountForWithdrawal')"
          type="submit"
          size="md"
          variant="solid"
          class="!min-w-[50px] w-auto mt-4"
          @click="handleBankAccountModal(true), showPaymentModal(false, '', null)"
        />
      </div>
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
