<script setup>
// Import
import { useDebounceFn } from '@vueuse/core'
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

// Stores
const { profileCheckData, sendOTP } = usePlayerStore()

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
        <UButton
          class="!w-full"
          type="submit"
          :ui="{ rounded: 'rounded-full' }"
          size="xl"
          variant="solid"
          :disabled="!validator.isFormValid"
        >
          <p>{{ t('next') }}</p>
          <UIcon name="carbon:arrow-right" class="w-5 h-5" />
        </UButton>
      </UForm>
      <div class="p-6 flex justify-center gap-1">
        <div>{{ t('alreadyHaveAccount') }}</div>
        <div
          class="text-blue-400 cursor-pointer"
          @click="handleLoginModal(true), handleRegisterModal(false)"
        >
          {{ t('login') }}
        </div>
      </div>
    </div>
  </div>
</template>
