<script setup>
// Imports
import { object, string } from 'yup'
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
const formRef = ref(null)
const form = reactive({
  form: {
    accountName: '',
    bankCode: '',
    accountNumber: '',
  },
  schema: object({
    accountName: string().test({
      async test(value, ctx) {
        if (!value) {
          return ctx.createError({ message: 'Specify holder name' })
        }
        const data = await checkAccountName()
        if (data) {
          return ctx.createError({ message: data })
        }
        return true
      },
    }),
    bankCode: string()
      .required('Please Select bank')
      .test({
        async test(value, ctx) {
          const data = await checkBankCode()
          if (data) {
            return ctx.createError({ message: data })
          }
          return true
        },
      }),
    accountNumber: string()
      .min(10, 'Please enter at least 10 digits')
      .test({
        async test(value, ctx) {
          if (!value) {
            return ctx.createError({ message: 'Specify account number' })
          }
          if (value.length > 20) {
            return ctx.createError({ message: 'Maximum length 20 digits' })
          }
          const data = await checkAccountNumber()
          if (data) {
            return ctx.createError({ message: data })
          }
          return true
        },
      }),
  }),
  onSubmit: async () => {
    handleSubmit()
  },
})

// Computeds
const bankList = computed(() => bankListByCurrency.value(useCurrencyCode()))

// Functions
const checkAccountName = useDebounceFn(() => handleCheckData('accountName'), 200)
const checkBankCode = useDebounceFn(() => handleCheckData('bankCode'), 200)
const checkAccountNumber = useDebounceFn(() => handleCheckData('accountNumber'), 200)

const handleCheckData = async (field) => {
  if (!(form.form.accountName && form.form.accountNumber && form.form.bankCode)) return
  try {
    await profileCheckData({
      accountName: form.form.accountName,
      accountNumber: form.form.accountNumber,
      bankCode: form.form.bankCode,
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
  Object.keys(form.form).forEach((o) => {
    props.setForm(o, form.form[o])
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
      <UForm
        ref="formRef"
        :schema="form.schema"
        :state="form.form"
        class="space-y-4"
        @submit="form.onSubmit"
      >
        <UFormGroup label="ชื่อบัญชี" name="accountName">
          <BaseInput
            v-model="form.form.accountName"
            placeholder="กรอกชื่อบัญชี"
            @input="formRef.validate('accountName', { silent: true })"
          />
        </UFormGroup>
        <UFormGroup label="ธนาคาร" name="bankCode">
          <USelectMenu
            v-model="form.form.bankCode"
            :options="bankList"
            searchable
            value-attribute="bankCode"
            option-attribute="bankDescription"
            placeholder="เลือกธนาคาร"
          >
            <template #leading="{ value }">
              <pre>{{ value }}</pre>
              <UAvatar v-if="value" v-bind="{ src: value?.imageUrl }" size="2xs" />
            </template>
            <template #option="{ option: value }">
              <UAvatar v-if="value" v-bind="{ src: value?.imageUrl }" size="2xs" />
              <span>{{ value.bankDescription }}</span>
            </template>
          </USelectMenu>
        </UFormGroup>
        <UFormGroup label="เลขบัญชีธนาคาร" name="accountNumber">
          <BaseInput
            v-model="form.form.accountNumber"
            type="number"
            placeholder="กรอกเลขบัญชีธนาคาร"
            @input="formRef.validate('accountNumber', { silent: true })"
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
