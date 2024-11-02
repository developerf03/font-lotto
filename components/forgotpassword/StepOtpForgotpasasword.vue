<script setup>
// Props
const props = defineProps({
  phoneNumber: {
    type: [String, Number],
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  callingCode: {
    type: Object,
    default: () => {},
  },
  callingPhone: {
    type: [String, Number],
    default: '',
  },
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

// Composables
const { forgotPasswordModal } = useModals()

// Stores
const { sendOTP, verifyOTP } = usePlayerStore()

// States
const otp = reactive({
  pincode: '',
  isVerifyValid: null,
  remainSec: props?.remainSec,
  remainSecDefault: 300,
})

// Computeds
const validateType = computed(() => props?.signinSetting.verifyWith)

// Functions
const handleRequestOtp = async () => {
  try {
    const { code, remain } = await sendOTP({
      // if verify with phone
      ...(validateType.value === 'phone' && {
        phone: props.phone,
        callingCode: props.callingCode,
        callingPhone: props.callingPhone,
      }),
      // if verify with email
      ...(validateType.value === 'email' && {
        email: props.email,
      }),
      currency: useDefaults()?.currencyCode,
      type: 'forgotpassword', // register, forgotpassword, changeprofile, withdraw, firsttimedeposit
    })
    otp.remainSec = remain || otp.remainSecDefault
    if (code === 6040) {
      // OTP confirmed already.
      props.nextStep()
    }
  } catch (error) {
    if (error.data?.code === 6041) {
      // OTP has been sent.
      otp.remainSec = error.data?.remain || otp.remainSecDefault
    } else if (error.data?.code === 6040) {
      // OTP confirmed already.
      props.nextStep()
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

const handleVerifyOTP = async () => {
  try {
    await verifyOTP({
      // if verify with phone
      ...(validateType.value === 'phone' && {
        phone: props.phone,
        callingPhone: props.callingPhone,
      }),
      // if verify with email
      ...(validateType.value === 'email' && {
        email: props.email,
      }),
      otp: otp.pincode,
      type: 'forgotpassword', // register, forgotpassword, changeprofile, withdraw, firsttimedeposit
    })
    otp.isVerifyValid = true
    setTimeout(() => {
      props.nextStep()
    }, 300)
  } catch (error) {
    if (error.data?.code === 6040) {
      // Already Verify(OTP)
      otp.isVerifyValid = true
      setTimeout(() => {
        props.nextStep()
      }, 300)
    } else {
      otp.isVerifyValid = false
    }
  }
}

const handleCancelOtp = () => {
  props.nextStep(props.steps[0])
}

const resetPincode = () => {
  otp.pincode = ''
  otp.isVerifyValid = null
}

const handleResendCode = () => {
  handleRequestOtp()
  resetPincode()
}

const onInput = (value) => {
  if (value?.length === 5) {
    otp.pincode = value
    handleVerifyOTP()
  }
}

// Watch
watch(
  () => forgotPasswordModal.value,
  (val) => {
    if (!val) {
      props.nextStep(props.steps[0])
    }
  },
)
</script>

<template>
  <div class="w-full contents">
    <span>
      {{ validateType === 'phone' ? t('verifyPhone') : t('verifyEmail') }}
    </span>
    <span class="color-[var(--font-tertiary)]"
      >{{
        t('enterCodeWeSentToEmail', { email: validateType === 'phone' ? t('phone') : t('email') })
      }}
      <span class="color-[var(--font-highlight)]">{{
        validateType === 'phone' ? phoneNumber : email
      }}</span></span
    >
    <div class="p-8">
      <BaseInputOtp
        v-modal="otp.pincode"
        :error="otp.isVerifyValid === false ? t('invalidCodeTryAgain') : ''"
        @on-change="onInput"
      />
    </div>
    <div class="w-full flex justify-center items-center gap-2">
      <div class="w-50">
        <UButton size="sm" variant="outline" @click="handleCancelOtp">
          <p class="text-secondary flex justify-center">{{ t('back') }}</p>
        </UButton>
      </div>
      <div class="w-50">
        <base-countdown
          v-slot="{ fullSeconds }"
          :time="otp.remainSec * 1000"
          class="w-full"
          @end="otp.remainSec = 0"
        >
          <UButton
            size="sm"
            variant="solid"
            :disabled="true"
            @click="fullSeconds <= 0 && handleResendCode()"
          >
            <span v-if="!fullSeconds && fullSeconds !== null">{{ $t('resendCode') }}</span>
            <span v-else class="leading-none">{{
              `Resend within ${fullSeconds || otp.remainSec} seconds`
            }}</span>
          </UButton>
        </base-countdown>
      </div>
    </div>
  </div>
</template>
