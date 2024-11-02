<script setup>
// Import
import { convertPhoneNumber } from '~/utils/utils'

// Props
const props = defineProps({
  steps: { type: Array, required: true },
  nextStep: { type: Function, required: true },
  setForm: { type: Function, required: true },
  signinSetting: { type: Object, default: () => {} },
  setting: { type: Object, default: () => {} },
  remainSec: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:remainSec'])

// Composables

// Store
const { sendOTP } = usePlayerStore()

// States
const form = reactive({
  email: '',
  phoneNumber: '',
  callingPhone: '',
  callingCode: '',
})
const errors = reactive({})

// Computeds
const validateType = computed(() => props?.signinSetting.verifyWith)
const validator = computed(() =>
  useValidator(form, errors).rules({
    ...(validateType.value === 'email' && {
      email: Rules().required(t('validation.pleaseEnterEmail')).email(t('validation.emailInValid')),
    }),
    ...(validateType.value === 'phone' && {
      phoneNumber: Rules()
        .required(t('validation.pleaseEnterPhoneNumber'))
        .maxLength({
          errMsg: t('validation.invalidPhoneNumber'),
          max: 10,
        }),
    }),
  }),
)

// Functions
const onSendOtp = async () => {
  try {
    const { code, remain } = await sendOTP({
      ...(validateType.value === 'phone' && {
        // phone: form.phoneNumber,
        callingPhone: form.callingPhone,
        // callingCode: form.callingCode?.callingCode,
      }),
      ...(validateType.value === 'email' && {
        email: form.email,
      }),
      type: 'forgotpassword', // register, forgotpassword, changeprofile, withdraw, firsttimedeposit
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

const setValueToMainForm = () => {
  Object.keys(form).forEach((o) => {
    props.setForm(o, form[o])
  })
}

const setCallingCode = () => {
  form.callingCode = useCountryCallingCodes()
}

const handleInput = (field) => {
  if (field === 'phoneNumber') {
    form.callingPhone = convertPhoneNumber(form.phoneNumber, form.callingCode[0]?.callingCode)
  }
  validator.value.validate(field)
}

onMounted(() => {
  setCallingCode()
})
</script>

<template>
  <div class="flex justify-center items-center flex-col w-full">
    <div class="font-bold text-primary <sm:(text-sm)">
      {{
        validateType === 'phone'
          ? t('pleaseEnterPhoneNumberUseRegister')
          : t('pleaseEnterEmailUseForgotPassword')
      }}
    </div>
    <div class="w-full p-6">
      <UForm :state="form" class="space-y-4" @submit="onSendOtp">
        <UFormGroup
          v-if="validateType === 'email'"
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
          v-if="validateType === 'phone'"
          :label="t('phone')"
          name="phoneNumber"
          :error="errors?.phoneNumber?.message"
        >
          <BaseInput
            v-model="form.phoneNumber"
            :placeholder="t('phone')"
            :maxlength="10"
            @update:model-value="handleInput('phoneNumber')"
          />
        </UFormGroup>
        <UButton
          :label="t('next')"
          class="!w-full"
          type="submit"
          :ui="{ rounded: 'rounded-full' }"
          size="xl"
          variant="solid"
          :disabled="!validator.isFormValid"
        />
      </UForm>
    </div>
  </div>
</template>
