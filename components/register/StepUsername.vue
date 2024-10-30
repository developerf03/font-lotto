<script setup>
// Import
import { object, string } from 'yup'
import { useStorage, useDebounceFn } from '@vueuse/core'
import { convertPhoneNumber } from '~/utils/utils'

// Props
const props = defineProps({
  steps: { type: Array, required: true },
  nextStep: { type: Function, required: true },
  setForm: { type: Function, required: true },
  signupSetting: { type: Object, default: () => {} },
  setting: { type: Object, default: () => {} },
  remainSec: {
    type: [String, Number],
    required: true,
  },
})

const emit = defineEmits(['update:remainSec'])

// Composables
const { handleLoginModal, handleRegisterModal } = useModals()
const route = useRoute()

// Stores
const { profileCheckData, sendOTP } = usePlayerStore()
const affCodeLocal = useStorage('aff_regis_code', '')
const referCodeLocal = useStorage('ref', '')
const checkValidate = ref(null)

// State
const formRef = ref(null)
const form = reactive({
  form: {
    playerUsername: '',
    email: '',
    phone: '',
    callingCode: '',
    callingPhone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    referCode: route.query?.ref || referCodeLocal.value || '',
    affCode: route.query?.aff_regis_code?.toUpperCase() || affCodeLocal.value?.toUpperCase() || '',
  },
  schema: object({
    ...(props.signupSetting?.registerWith?.username && {
      playerUsername: string()
        .min(6, t('validation.pleaseInputAtLeast', { min: 6 }))
        .max(18, t('validation.maximumLength', { max: 18 }))
        .required('Please enter username')
        .test({
          async test(value, ctx) {
            if (!checkFormatUsername(value)) {
              return ctx.createError({
                message: t('validation.mustContainLettersNumericUnderscore'),
              })
            }
            const data = await checkUsername()
            if (data) {
              return ctx.createError({ message: data.message })
            }
            return true
          },
        }),
    }),
    ...(props.signupSetting?.registerWith?.email && {
      email: string()
        .email(t('validation.emailInValid'))
        .test({
          async test(value, ctx) {
            if (!value) {
              return ctx.createError({ message: t('validation.pleaseEnterEmail') })
            }
            const data = await checkEmail()
            if (data) {
              return ctx.createError({ message: data.message })
            }
            return true
          },
        }),
    }),
    ...(props.signupSetting?.registerWith?.phone && {
      phone: string().test({
        async test(value, ctx) {
          if (value.length < 10) {
            return ctx.createError({ message: t('validation.pleaseInputAtLeast', { min: 10 }) })
          }
          const data = await checkPhone()
          if (data) {
            return ctx.createError({ message: data.message })
          }
          form.form.callingPhone = convertPhoneNumber(
            form.form.phone,
            form.form.callingCode[0]?.callingCode,
          )
          return true
        },
      }),
    }),
    ...(useLobbySetting()?.enableReferCode &&
      props.signupSetting?.requireBank && {
        dateOfBirth: string().date().required('Please select date'),
      }),
    ...(props.signupSetting?.requireBank && {
      password: string().test({
        test(value, ctx) {
          if (!checkValidate.value.checkLength) {
            return ctx.createError({ message: t('condition.beAtLeastCharacters', { min: 8 }) })
          }
          if (!checkValidate.value.checkUppercase) {
            return ctx.createError({ message: t('condition.uppercaseLetter') })
          }
          if (!checkValidate.value.checkLowercase) {
            return ctx.createError({ message: t('condition.lowercaseLetter') })
          }
          if (!checkValidate.value.checkNumbercase) {
            return ctx.createError({ message: t('condition.atLeastOneNumber') })
          }
          return true
        },
      }),
    }),
    ...(props.signupSetting?.requireBank && {
      confirmPassword: string().test({
        test(value, ctx) {
          if (value !== form.form.password || !value) {
            return ctx.createError({ message: t('validation.passwordsNotMatch') })
          }
          return true
        },
      }),
    }),
  }),
  submitFirstStep: async () => {
    // if require verify
    if (props?.signupSetting?.verifyRegister === true) {
      onSendOtp()
      return
    }
    // if not require verify
    if (props?.signupSetting?.verifyRegister === false) {
      setValueToMainForm()
      props.nextStep()
    }
  },
})

// Computeds

// Fuctions
const checkUsername = useDebounceFn(() => onCheckData('playerUsername'), 200)
const checkEmail = useDebounceFn(() => onCheckData('email'), 200)
const checkPhone = useDebounceFn(() => onCheckData('phone'), 200)

const checkFormatUsername = (val) => !/[^a-zA-Z0-9_]/gm.test(val)

const onCheckData = async (field) => {
  try {
    await profileCheckData({ [field]: form.form?.[field] || '' })
    return ''
  } catch (error) {
    return error?.data
  }
}

const setCallingCode = () => {
  form.form.callingCode = useCountryCallingCodes()
}

const setValueToMainForm = () => {
  Object.keys(form.form).forEach((o) => {
    props.setForm(o, form.form[o])
  })
}

const onSendOtp = async () => {
  try {
    const { code, remain } = await sendOTP({
      // if verify with phone
      ...(props?.signupSetting?.verifyWith === 'phone' && {
        phone: form.form.phone,
        callingCode: form.form.callingCode[0]?.callingCode,
        callingPhone: form.form.callingPhone,
      }),
      // if verify with email
      ...(props?.signupSetting?.verifyWith === 'email' && {
        email: form.form.email,
      }),
      currency: 'THB',
      type: 'register',
    })
    setValueToMainForm()
    if (code === 6040) {
      // OTP confirmed already.
      props.nextStep(props.steps[2])
    } else {
      emit('update:remainSec', remain || 300)
      props.nextStep()
    }
  } catch (error) {
    if (error.data?.code === 6041) {
      // OTP has been sent.
      setValueToMainForm()
      emit('update:remainSec', error.data?.remain || 300)
      props.nextStep()
    } else if (error.data?.code === 6040) {
      // OTP confirmed already.
      setValueToMainForm()
      props.nextStep(props.steps[2])
    } else {
      // send OTP error
      useAlert({
        error: true,
        text: error.data?.message,
        autoHide: true,
      })
    }
  }
}

onMounted(() => {
  setCallingCode()
})
</script>

<template>
  <div class="flex justify-center items-center flex-col w-full">
    <div class="font-bold text-primary <sm:(text-sm)">
      {{
        (signupSetting.registerWith.username || signupSetting.registerWith.email) &&
        signupSetting.registerWith.phone
          ? t('validation.pleaseEnterAllInformation')
          : t('validation.pleaseEnterPhoneNumber')
      }}
    </div>
    <div class="w-full">
      <UForm
        ref="formRef"
        :schema="form.schema"
        :state="form.form"
        class="space-y-4"
        @submit="form.submitFirstStep"
      >
        <UFormGroup
          v-if="signupSetting?.registerWith?.username"
          :label="t('username')"
          name="playerUsername"
        >
          <BaseInput
            v-model="form.form.playerUsername"
            :placeholder="t('username')"
            @input="formRef.validate('playerUsername', { silent: true })"
          />
        </UFormGroup>
        <UFormGroup v-if="signupSetting?.registerWith?.email" :label="t('email')" name="email">
          <BaseInput v-model="form.form.email" :placeholder="t('email')" />
        </UFormGroup>
        <UFormGroup v-if="signupSetting?.registerWith?.phone" :label="t('phone')" name="phone">
          <BaseInput
            v-model="form.form.phone"
            :placeholder="t('phone')"
            type="tel"
            :maxlength="10"
            @input="formRef.validate('phone', { silent: true })"
          />
        </UFormGroup>
        <div v-if="signupSetting.requireBank" class="w-full flex justify-between gap-2">
          <UFormGroup
            v-if="signupSetting?.dateOfBirth"
            :class="{
              '!w-[50%]': signupSetting?.dateOfBirth && useLobbySetting()?.enableReferCode,
            }"
            class="w-full"
            :label="t('dateOfBirth')"
            name="dateOfBirth"
          >
            <BaseInput
              v-model="form.form.dateOfBirth"
              :class="{ 'validate-date': !form.form.dateOfBirth }"
              type="date"
              @input="formRef.validate('dateOfBirth', { silent: true })"
            />
            <span v-if="form.form.dateOfBirth === ''" class="text-danger">{{
              t('validation.pleaseEnterDateOfBirth')
            }}</span>
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
        <UFormGroup v-if="signupSetting.requireBank" label="รหัสผ่าน" name="password">
          <BaseInput v-model="form.form.password" type="password" placeholder="กรอกรหัสผ่าน" />
        </UFormGroup>
        <UFormGroup v-if="signupSetting.requireBank" label="ยืนยันรหัสผ่าน" name="confirmPassword">
          <BaseInput
            v-model="form.form.confirmPassword"
            type="password"
            placeholder="กรอกรหัสผ่าน"
            @input="formRef.validate('confirmPassword', { silent: true })"
          />
        </UFormGroup>
        <BaseValidateList
          v-if="signupSetting.requireBank"
          ref="checkValidate"
          :password="form.form.password"
        />
        <UButton
          class="!w-full"
          type="submit"
          :ui="{ rounded: 'rounded-full' }"
          size="xl"
          variant="solid"
          :disabled="
            formRef?.errors?.length > 0 ||
            (signupSetting.requireBank && form.form.dateOfBirth === '')
          "
        >
          <p>ต่อไป</p>
          <UIcon name="carbon:arrow-right" class="w-5 h-5" />
        </UButton>
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
