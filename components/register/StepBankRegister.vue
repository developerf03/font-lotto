<script setup>
// Imports
import { useDebounceFn } from '@vueuse/core'

// Props
const props = defineProps({
  setForm: { type: Function, required: true },
  resetForm: { type: Function, required: true },
  steps: { type: Array, required: true },
  nextStep: { type: Function, required: true },
  submitRegister: { type: Function, required: true },
  loading: { type: Boolean, required: true },
})

// Composables
const { bankListByCurrency, fetchBankList } = usePayment()
const { profileCheckData } = usePlayerStore()

// State
const form = reactive({
  accountName: '',
  bankCode: '',
  accountNumber: '',
})

// Computeds
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

const handleChangeCurrency = () => {
  if (form?.bankCode?.currencyCode === useCurrencyCode()) return
  fetchBankList({ currencyCode: useCurrencyCode() })
  form.bankCode = ''
  form.accountNumber = ''
  validator.value.clearErrorFields(['bankCode', 'accountNumber'])
}

const handleCheckData = async (field) => {
  if (!(form.accountName && form.accountNumber && form.bankCode)) return
  try {
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
  }
}

const handleCancelBank = () => {
  props.nextStep(props.steps[0])
}

const setValueToMainForm = () => {
  Object.keys(form).forEach((o) => {
    props.setForm(o, form[o])
  })
}

const handleSubmit = () => {
  setValueToMainForm()
  setTimeout(() => {
    props.submitRegister()
    setTimeout(() => {}, 500)
  }, 100)
}

onMounted(() => {
  fetchBankList({ currencyCode: useCurrencyCode() })
})
</script>

<template>
  <div class="flex justify-center items-center flex-col w-full">
    <div class="w-full">
      <UForm class="space-y-4" @submit="handleSubmit">
        <UFormGroup label="ชื่อบัญชี" name="accountName">
          <BaseInput
            v-model="form.accountName"
            placeholder="กรอกชื่อบัญชี"
            @keyup="validator.validate('accountName')"
          />
        </UFormGroup>
        <UFormGroup label="ธนาคาร" name="bankCode">
          <USelectMenu
            v-model="form.bankCode"
            :options="bankList"
            searchable
            value-attribute="bankCode"
            option-attribute="bankDescription"
            placeholder="เลือกธนาคาร"
            @change="handleChangeCurrency"
          >
            <template #option="{ option: value }">
              <UAvatar v-if="value" v-bind="{ src: value?.imageUrl }" size="2xs" />
              <span>{{ value.bankDescription }}</span>
            </template>
          </USelectMenu>
        </UFormGroup>
        <UFormGroup label="เลขบัญชีธนาคาร" name="accountNumber">
          <BaseInput
            v-model="form.accountNumber"
            type="number"
            placeholder="กรอกเลขบัญชีธนาคาร"
            @keyup="validator.validate('accountNumber')"
          />
        </UFormGroup>
        <div class="w-full flex justify-center items-center gap-2">
          <div class="w-50">
            <UButton size="sm" variant="outline" @click="handleCancelBank">
              <p class="text-secondary flex justify-center">ย้อนกลับ</p>
            </UButton>
          </div>
          <div class="w-50">
            <UButton
              label="เพิ่มบัญชี"
              class="!w-full"
              type="submit"
              :ui="{ rounded: 'rounded-full' }"
              size="xl"
              variant="solid"
            />
          </div>
        </div>
      </UForm>
    </div>
  </div>
</template>
