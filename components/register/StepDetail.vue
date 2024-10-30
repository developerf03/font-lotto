<script setup>
// Imports
import { object, string } from 'yup'
import { useStorage } from '@vueuse/core'

// Props
const props = defineProps({
  phone: {
    type: [String, Number],
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  signupSetting: { type: Object, default: () => {} },
  setting: { type: Object, default: () => {} },
  setForm: { type: Function, required: true },
  resetForm: { type: Function, required: true },
  submitRegister: { type: Function, required: true },
  loading: { type: Boolean, required: true },
})

// Composables
const { handleLoginModal, handleRegisterModal } = useModals()
const route = useRoute()

// Stores
const affCodeLocal = useStorage('aff_regis_code', '')
const referCodeLocal = useStorage('ref', '')
const checkValidate = ref(null)

// State
const formRef = ref(null)
const form = reactive({
  form: {
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    referCode: route.query?.ref || referCodeLocal.value || '',
    affCode: route.query?.aff_regis_code?.toUpperCase() || affCodeLocal.value?.toUpperCase() || '',
  },
  schema: object({
    password: string().test({
      test(value, ctx) {
        if (!checkValidate.value.checkLength) {
          return ctx.createError({ message: 'Must be at least 8 characters' })
        }
        if (!checkValidate.value.checkUppercase) {
          return ctx.createError({ message: 'At least 1 uppercase English letter' })
        }
        if (!checkValidate.value.checkLowercase) {
          return ctx.createError({ message: 'At least 1 lowercase English letter' })
        }
        if (!checkValidate.value.checkNumbercase) {
          return ctx.createError({ message: 'At least 1 Number letter' })
        }
        return true
      },
    }),
    confirmPassword: string().test({
      test(value, ctx) {
        if (value !== form.form.password || !value) {
          return ctx.createError({ message: `Passwords don't match` })
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

// Functions
const setValueToMainForm = () => {
  Object.keys(form.form).forEach((o) => {
    props.setForm(o, form.form[o])
  })
}

const handleSubmit = () => {
  setValueToMainForm()
  setTimeout(() => {
    props.submitRegister()
  }, 100)
}
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
        <UFormGroup v-if="signupSetting?.verifyWith === 'email'" label="Email" name="email">
          <BaseInput :model-value="email" placeholder="email" readonly />
        </UFormGroup>
        <UFormGroup v-if="signupSetting?.verifyWith === 'phone'" label="เบอร์โทรศัพท์" name="phone">
          <BaseInput
            :model-value="phone"
            placeholder="เบอร์โทรศัพท์"
            type="tel"
            :maxlength="10"
            readonly
          />
        </UFormGroup>
        <div class="w-full flex justify-between gap-2">
          <UFormGroup
            v-if="signupSetting?.dateOfBirth"
            :class="{
              '!w-[50%]': signupSetting?.dateOfBirth && useLobbySetting()?.enableReferCode,
            }"
            class="w-full"
            label="วันเกิด"
            name="dateOfBirth"
          >
            <BaseInput
              v-model="form.form.dateOfBirth"
              :class="{ 'validate-date': !form.form.dateOfBirth }"
              type="date"
              placeholder="เช่น 01/01/2000"
              @input="formRef.validate('dateOfBirth', { silent: true })"
            />
            <span v-if="form.form.dateOfBirth === ''" class="text-danger"
              >Please select date of birth</span
            >
          </UFormGroup>
          <UFormGroup
            v-if="useLobbySetting()?.enableReferCode"
            :class="{
              '!w-[50%]': signupSetting?.dateOfBirth && useLobbySetting()?.enableReferCode,
            }"
            class="w-full"
            label="Referal Code"
            name="referCode"
          >
            <BaseInput
              v-model="form.form.referCode"
              placeholder="กรอกรหัสเชิญเพื่อน"
              @input="formRef.validate('referCode', { silent: true })"
            />
          </UFormGroup>
        </div>
        <UFormGroup label="รหัสผ่าน" name="password">
          <BaseInput v-model="form.form.password" type="password" placeholder="กรอกรหัสผ่าน" />
        </UFormGroup>
        <UFormGroup label="ยืนยันรหัสผ่าน" name="confirmPassword">
          <BaseInput
            v-model="form.form.confirmPassword"
            type="password"
            placeholder="กรอกรหัสผ่าน"
            @input="formRef.validate('confirmPassword', { silent: true })"
          />
        </UFormGroup>
        <BaseValidateList ref="checkValidate" :password="form.form.password" />
        <UButton
          label="สมัครสมาชิก"
          class="!w-full"
          type="submit"
          :ui="{ rounded: 'rounded-full' }"
          size="xl"
          variant="solid"
        />
      </UForm>
      <div class="p-6 flex justify-center gap-1">
        <div>มีบัญชีอยู่แล้ว?</div>
        <div
          class="text-blue-400 cursor-pointer"
          @click="handleLoginModal(true), handleRegisterModal(false)"
        >
          เข้าสู่ระบบ
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.validate-date {
  border: 1px solid var(--input-error);
  border-radius: 6px;
}
</style>
