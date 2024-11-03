<script setup>
// Import
import { useDebounceFn } from '@vueuse/core'

// Composables
const {
  getBankAccounts,
  bankAccountsLoading,
  banks,
  bankListByCurrency,
  fetchBankList,
  createBank,
} = usePayment()
const { bankAccountModal } = useModals()

// Stores
const { profileCheckData } = usePlayerStore()

// States
const form = reactive({
  accountName: '',
  bankCode: '',
  accountNumber: '',
})
const errors = reactive({})
const loading = reactive({
  accountName: false,
  bankCode: false,
  accountNumber: false,
})
const isTyping = ref(false)

// Computeds
const dataBankAccount = computed(() => banks?.value?.bankAccountList?.find((v) => v?.isDefault))
const isLoading = computed(() => !Object.values(loading).every((o) => o === false))
const bankList = computed(() => bankListByCurrency.value(useCurrencyCode()))
const validator = computed(() =>
  useValidator(form, errors).rules({
    accountName: Rules().required(t('specifyHolderName')).custom(checkAccountName),
    accountNumber: Rules()
      .required(t('specifyAccountnumber'))
      .minLength({
        errMsg: t('validation.pleaseInputAtLeast', { min: 10 }),
        min: 10,
      })
      .maxLength({
        errMsg: t('validation.maximumLength', { max: 20 }),
        max: 20,
      })
      .custom(checkAccountNumber),
    bankCode: Rules().required(t('specifyBankcode')).custom(checkBankCode),
  }),
)

// Functions
const checkAccountName = useDebounceFn(() => handleCheckData('accountName'), 200)
const checkBankCode = useDebounceFn(() => handleCheckData('bankCode'), 200)
const checkAccountNumber = useDebounceFn(() => handleCheckData('accountNumber'), 200)
const debounceTyped = useDebounceFn(() => (isTyping.value = false), 300)

const handleCheckData = async (field) => {
  if (!(form.accountName && form.accountNumber && form.bankCode)) return
  try {
    loading[field] = true
    await profileCheckData({
      accountName: form.accountName,
      accountNumber: form.accountNumber,
      bankCode: form.bankCode,
    })
    return ''
  } catch (error) {
    if (field === 'accountName' && [5030, 5031, 5032, 5033, 5034].includes(error?.data?.code)) {
      return 'Duplicate account name'
    }
    if (field === 'accountNumber' && [5032, 5034, 5035, 5036, 5038].includes(error?.data?.code)) {
      return 'Duplicate bank account number'
    }
    if (field === 'bankCode' && [5030, 5033, 5034, 5035, 5036, 5038].includes(error?.data?.code)) {
      return 'Duplicate bank account'
    }
    return ''
  } finally {
    setTimeout(() => {
      loading[field] = false
    }, 500)
  }
}

const handleInput = (field) => {
  validator.value.validate(field)
  isTyping.value = true
  debounceTyped()
}

const handleSubmit = async () => {
  try {
    await createBank({
      accountName: form.accountName,
      accountNumber: form.accountNumber,
      bankCode: form.bankCode,
      currencyCode: useCurrencyCode(),
      type: 'withdraw',
    })
    useAlert({
      success: true,
      text: t('addedBankAccountSuccess'),
      autoHide: true,
    })
    getBankAccounts({ currencyCode: useCurrencyCode() })
    resetForm()
  } catch (error) {
    useAlert({
      error: true,
      text: error.data?.message,
      autoHide: true,
    })
  }
}

const resetForm = () => {
  Object.assign(form, clearObj(form))
}

// Watchs
watch(bankAccountModal, (val) => {
  if (val) {
    getBankAccounts({ currencyCode: useCurrencyCode() })
    fetchBankList({ currencyCode: useCurrencyCode() })
  }
})
</script>

<template>
  <baseModal
    id="bank-account-sub-menu-modal-wrapper"
    v-model="bankAccountModal"
    :title="t('bankAccountlabel')"
    :disable-click-out="true"
    :hide-icon-close="true"
  >
    <!-- Skeleton -->
    <div v-if="bankAccountsLoading" class="flex justify-center items-center flex-col w-full gap-4">
      <USkeleton class="h-[200px] !rounded-lg 2xl:rounded-[20px] w-full" />
      <USkeleton class="h-[42px] !rounded-xl 2xl:rounded-[20px] w-full" />
    </div>
    <div
      v-if="dataBankAccount && !bankAccountsLoading"
      class="flex justify-center items-center flex-col w-full gap-4 mb-6"
    >
      <BaseBankAccount
        v-if="dataBankAccount"
        :account="dataBankAccount?.accountNumber"
        :bank-type="dataBankAccount?.bankName"
        :account-name="dataBankAccount?.accountName"
        :bank-short-name="dataBankAccount?.bankCode"
      />
    </div>
    <div v-if="!dataBankAccount && !bankAccountsLoading" class="w-full">
      <div class="flex justify-center items-center flex-col w-full">
        <div class="w-full">
          <UForm class="space-y-4" @submit="handleSubmit">
            <UFormGroup
              :label="t('accountHoldername')"
              name="accountName"
              :error="errors?.accountName?.message"
            >
              <BaseInput
                v-model="form.accountName"
                :placeholder="t('accountHoldername')"
                @update:model-value="handleInput('accountName')"
              />
            </UFormGroup>
            <UFormGroup :label="t('bank')" name="bankCode" :error="errors?.bankCode?.message">
              <USelectMenu
                v-model="form.bankCode"
                :options="bankList"
                searchable
                value-attribute="bankCode"
                option-attribute="bankDescription"
                :placeholder="t('selectBank')"
                @update:model-value="handleInput('bankCode')"
              >
                <template #option="{ option: value }">
                  <UAvatar v-if="value" v-bind="{ src: value?.imageUrl }" size="2xs" />
                  <span>{{ value.bankDescription }}</span>
                </template>
              </USelectMenu>
            </UFormGroup>
            <UFormGroup
              :label="t('accountNumber')"
              name="accountNumber"
              :error="errors?.accountNumber?.message"
            >
              <BaseInput
                v-model="form.accountNumber"
                type="number"
                :placeholder="t('specifyAccountnumber')"
                @update:model-value="handleInput('accountNumber')"
              />
            </UFormGroup>
            <div class="w-full flex justify-center items-center gap-2">
              <!-- <div class="w-50">
                <UButton size="sm" variant="outline" @click="handleCancelBank">
                  <p class="text-secondary flex justify-center">{{ t('back') }}</p>
                </UButton>
              </div> -->
              <!-- <div class="w-50"> -->
              <UButton
                :label="t('save')"
                class="!w-full"
                type="submit"
                :ui="{ rounded: 'rounded-full' }"
                size="xl"
                variant="solid"
                :loading="isLoading"
                :disabled="!validator.isFormValid || isLoading || isTyping"
              />
              <!-- </div> -->
            </div>
          </UForm>
        </div>
      </div>
    </div>
  </baseModal>
</template>
