<script setup>
// Imports
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
const form = reactive({
  password: '',
  confirmPassword: '',
  dateOfBirth: '',
  referCode: route.query?.ref || referCodeLocal.value || '',
  affCode: route.query?.aff_regis_code?.toUpperCase() || affCodeLocal.value?.toUpperCase() || '',
})
const errors = reactive({})

// Computeds
const validator = computed(() =>
  useValidator(form, errors).rules({
    password: Rules()
      .required(t('validation.pleaseEnterPassword'))
      .password(t('validation.passwordErr')),
    confirmPassword: Rules()
      .required(t('validation.pleaseEnterPassword'))
      .isMatch({ errMsg: t('validation.passwordsNotMatch'), field: 'password' }),
    ...(props.signupSetting?.dateOfBirth && {
      dateOfBirth: Rules()
        .required(t('validation.pleaseEnterDateOfBirth'))
        .date(t('validation.invalidDateFormat')),
    }),
    ...(useLobbySetting()?.enableReferCode && {
      referCode: Rules().engAlphabetOrNumeric(t('invalidFriendReferralCode')),
    }),
    ...((form.affCode || props.setting?.affiliateCodeRequired) && {
      affCode: props.setting?.affiliateCodeRequired
        ? Rules()
            .engAlphabetOrNumeric(t('invalidAffiliateCode'))
            .required(t('specifyTheAffiliateCode'))
        : Rules().option().engAlphabetOrNumeric(t('invalidAffiliateCode')),
    }),
  }),
)

// Functions
const handleInput = (field) => {
  if (field === 'affCode') {
    form.affCode = form.affCode?.toUpperCase()
  }
  validator.value.validate(field)
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
  }, 100)
}
</script>

<template>
  <div class="flex justify-center items-center flex-col w-full">
    <div class="w-full">
      <UForm :state="form" class="space-y-4" @submit="handleSubmit">
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
        <div
          v-if="signupSetting?.dateOfBirth || useLobbySetting()?.enableReferCode"
          class="w-full flex justify-between gap-2"
        >
          <UFormGroup
            v-if="signupSetting?.dateOfBirth"
            :class="{
              '!w-[50%]': signupSetting?.dateOfBirth && useLobbySetting()?.enableReferCode,
            }"
            class="w-full"
            label="วันเกิด"
            name="dateOfBirth"
            :error="errors?.dateOfBirth?.message"
          >
            <BaseInput
              v-model="form.dateOfBirth"
              placeholder="DD/MM/YYYY"
              data-maska="##/##/####"
              @update:model-value="handleInput('dateOfBirth')"
            />
          </UFormGroup>
          <UFormGroup
            v-if="useLobbySetting()?.enableReferCode"
            :class="{
              '!w-[50%]': signupSetting?.dateOfBirth && useLobbySetting()?.enableReferCode,
            }"
            class="w-full"
            label="Referal Code"
            name="referCode"
            :error="errors?.referCode?.message"
          >
            <BaseInput
              v-model="form.referCode"
              placeholder="กรอกรหัสเชิญเพื่อน"
              @update:model-value="handleInput('referCode')"
            />
          </UFormGroup>
        </div>
        <UFormGroup label="รหัสผ่าน" name="password" :error="errors?.password?.message">
          <BaseInput
            v-model="form.password"
            type="password"
            placeholder="กรอกรหัสผ่าน"
            @update:model-value="handleInput('password'), handleInput('confirmPassword')"
          />
        </UFormGroup>
        <UFormGroup
          label="ยืนยันรหัสผ่าน"
          name="confirmPassword"
          :error="errors?.confirmPassword?.message"
        >
          <BaseInput
            v-model="form.confirmPassword"
            type="password"
            placeholder="กรอกรหัสผ่าน"
            @update:model-value="handleInput('confirmPassword'), handleInput('password')"
          />
        </UFormGroup>
        <BaseValidateList ref="checkValidate" :password="form.password" />
        <UButton
          label="สมัครสมาชิก"
          class="!w-full"
          type="submit"
          :ui="{ rounded: 'rounded-full' }"
          size="xl"
          variant="solid"
          :disabled="!validator.isFormValid"
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
