<script setup>
// Import
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
    type: Number,
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
const textErrors = {
  playerUsername: 'usernameAlreadyExists',
  email: 'emailAlreadyExists',
  phone: 'phoneAlreadyExists',
}
const errors = reactive({})
const form = reactive({
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
})

// Computeds
const validator = computed(() =>
  useValidator(form, errors).rules({
    ...(props.signupSetting?.registerWith?.username && {
      playerUsername: Rules()
        .required(t('validation.pleaseEnterUsername'))
        .engAlphabetNumericOrUnderscore(t('validation.mustContainLettersNumericUnderscore'))
        .minLength({
          errMsg: t('validation.pleaseInputAtLeast', { min: 6 }),
          min: 6,
        })
        .maxLength({
          errMsg: t('validation.maximumLength', { max: 18 }),
          max: 18,
        })
        .custom(checkUsername),
    }),
    ...(props.signupSetting?.registerWith?.email && {
      email: Rules()
        .required(t('validation.pleaseEnterUsername'))
        .email(t('validation.emailInValid'))
        .custom(checkEmail),
    }),
    ...(props.signupSetting?.registerWith?.phone && {
      phone: Rules()
        .required('validation.pleaseEnterPhoneNumber')
        .minLength({
          errMsg: t('validation.invalidPhoneNumber'),
          min: 9,
        })
        .maxLength({
          errMsg: t('validation.invalidPhoneNumber'),
          max: 10,
        })
        .custom(checkPhone),
    }),
    ...(props.signupSetting?.requireBank && {
      password: Rules()
        .required(t('validation.pleaseEnterPassword'))
        .password(t('validation.passwordErr')),
    }),
    ...(props.signupSetting?.requireBank && {
      confirmPassword: Rules()
        .required(t('validation.pleaseEnterPassword'))
        .isMatch({ errMsg: t('validation.passwordsNotMatch'), field: 'password' }),
    }),
    ...(useLobbySetting()?.enableReferCode &&
      props.signupSetting?.requireBank && {
        dateOfBirth: Rules()
          .required(t('validation.pleaseEnterDateOfBirth'))
          .date(t('validation.invalidDateFormat')),
      }),
    ...(useLobbySetting()?.enableReferCode &&
      props.signupSetting?.requireBank && {
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

// Fuctions
const checkUsername = useDebounceFn(() => handleCheckData('playerUsername'), 200)
const checkEmail = useDebounceFn(() => handleCheckData('email'), 200)
const checkPhone = useDebounceFn(() => handleCheckData('phone'), 200)

const handleInput = (field) => {
  if (field === 'playerUsername') {
    form.playerUsername = form.playerUsername.toLowerCase()
  }
  if (field === 'phone') {
    form.callingPhone = convertPhoneNumber(form.phone, form.callingCode[0]?.callingCode)
  }
  if (field === 'affCode') {
    form.affCode = form.affCode?.toUpperCase()
  }
  validator.value.validate(field)
}

const setCallingCode = () => {
  form.callingCode = useCountryCallingCodes()
}

const setValueToMainForm = () => {
  Object.keys(form).forEach((o) => {
    props.setForm(o, form[o])
  })
}

const handleCheckData = async (field) => {
  try {
    await profileCheckData({ [field]: form?.[field] || '' })
    return ''
  } catch {
    return t(textErrors[field])
  }
}

const onSubmit = () => {
  if (!validator.value.isFormValid) return
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
}

const onSendOtp = async () => {
  try {
    const { code, remain } = await sendOTP({
      // if verify with phone
      ...(props?.signupSetting?.verifyWith === 'phone' && {
        phone: form.phone,
        callingCode: form.callingCode[0]?.callingCode,
        callingPhone: form.callingPhone,
      }),
      // if verify with email
      ...(props?.signupSetting?.verifyWith === 'email' && {
        email: form.email,
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
      <UForm :state="form" class="space-y-4" @submit="onSubmit">
        <UFormGroup
          v-if="signupSetting?.registerWith?.username"
          :label="t('username')"
          name="playerUsername"
          :error="errors?.playerUsername?.message"
        >
          <BaseInput
            v-model="form.playerUsername"
            :placeholder="t('username')"
            @update:model-value="handleInput('playerUsername')"
          />
        </UFormGroup>
        <UFormGroup
          v-if="signupSetting?.registerWith?.email"
          :label="t('email')"
          name="email"
          :error="errors?.email?.message"
        >
          <BaseInput
            v-model="form.email"
            :placeholder="t('email')"
            @update:model-value="handleInput('email')"
          />
        </UFormGroup>
        <UFormGroup
          v-if="signupSetting?.registerWith?.phone"
          :label="t('phone')"
          name="phone"
          :error="errors?.phone?.message"
        >
          <BaseInput
            v-model="form.phone"
            :placeholder="t('phone')"
            :maxlength="10"
            @update:model-value="handleInput('phone')"
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
            :error="errors?.dateOfBirth?.message"
          >
            <BaseInput
              v-model="form.dateOfBirth"
              placeholder="DD/MM/YYYY"
              data-maska="##/##/####"
              @update:model-value="validator.validate('dateOfBirth')"
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
        <UFormGroup
          v-if="signupSetting.requireBank"
          label="รหัสผ่าน"
          name="password"
          :error="errors?.password?.message"
        >
          <BaseInput
            v-model="form.password"
            type="password"
            placeholder="กรอกรหัสผ่าน"
            @update:model-value="handleInput('password'), handleInput('confirmPassword')"
          />
        </UFormGroup>
        <UFormGroup
          v-if="signupSetting.requireBank"
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
        <BaseValidateList
          v-if="signupSetting.requireBank"
          ref="checkValidate"
          :password="form.password"
        />
        <UButton
          class="!w-full"
          type="submit"
          :ui="{ rounded: 'rounded-full' }"
          size="xl"
          variant="solid"
          :disabled="!validator.isFormValid"
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
