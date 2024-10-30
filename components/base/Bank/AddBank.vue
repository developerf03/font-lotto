<script setup>
// Composables
// import { object, string } from 'yup'

// Stores
const emit = defineEmits(['form'])

// State
const addBankForm = reactive({
  accountName: null,
  bankShortName: null,
  account: null,
})

const bankOption = ref([
  {
    bankCode: 'SGTT',
    currencyCode: 'VND',
    bankDescription: 'Sacom Bank',
    imageUrl:
      'https://tm-bucket-development.s3.ap-southeast-1.amazonaws.com/dfe1a798-3239-4a25-8f77-f71930bb3f74',
  },
  {
    bankCode: 'hongleongbank',
    currencyCode: 'VND',
    bankDescription: 'Hong Leong',
    imageUrl: null,
  },
  {
    bankCode: 'TPBV',
    currencyCode: 'VND',
    bankDescription: 'TP',
    imageUrl:
      'https://tm-bucket-development.s3.ap-southeast-1.amazonaws.com/62c8ace6-aa6a-4746-9abb-0c4d6c37a7c0',
  },
  {
    bankCode: 'ASCB',
    currencyCode: 'VND',
    bankDescription: 'Asia Comercial Bank',
    imageUrl:
      'https://tm-bucket-development.s3.ap-southeast-1.amazonaws.com/32628c5d-7554-4a5e-a576-afb5d5013357',
  },
])

// Computed
// const schema = object({
//   accountName: string().required('กรุณากรอกชื่อบัญชี'),
//   bankShortName: string().required('กรุณาเลือกธนาคาร'),
//   account: string().required('กรุณาเลือกธนาคาร'),
// })

// Watch
watch(addBankForm, () => {
  emit('form', addBankForm)
})

// Functions
const updateInput = (e) => {
  if (
    e?.target?.value &&
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(e.data) &&
    e.inputType !== 'deleteContentBackward'
  ) {
    e.target.value = String(e?.target?.value)
  } else {
    if (e.inputType === 'deleteContentBackward') {
      e.target.value = String(e?.target?.value)
    } else {
      e.target.value = addBankForm.account
    }
  }
}
</script>

<template>
  <div class="add-bank-wrapper w-full">
    <UForm :state="addBankForm" class="space-y-2 w-full">
      <UFormGroup label="ชื่อบัญชี" name="accountName">
        <BaseInput v-model="addBankForm.accountName" placeholder="กรอกชื่อบัญชี" />
      </UFormGroup>
      <UFormGroup label="ธนาคาร" name="bankShortName">
        <USelectMenu
          v-model="addBankForm.bankShortName"
          placeholder="เลือกธนาคาร"
          :options="bankOption"
          value-attribute="bankCode"
          option-attribute="bankDescription"
        >
          <template #empty> {{ t('noItems') }} </template></USelectMenu
        >
      </UFormGroup>
      <UFormGroup label="เลขบัญชีธนาคาร" name="account">
        <BaseInput
          v-model="addBankForm.account"
          placeholder="กรอกเลขบัญชีธนาคาร"
          @input="updateInput"
        />
      </UFormGroup>
    </UForm>
  </div>
</template>

<style lang="scss" scoped></style>
