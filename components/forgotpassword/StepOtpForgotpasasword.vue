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
const pincode = ref('')
const otp = reactive({
  isVerifyValid: null,
  remainSec: props?.remainSec,
  remainSecDefault: 300,
})
const loadingOtp = ref(false)

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
    loadingOtp.value = true
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
      otp: pincode.value,
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
  } finally {
    loadingOtp.value = false
  }
}

const handleCancelOtp = () => {
  props.nextStep(props.steps[0])
}

const resetPincode = () => {
  pincode.value = ''
  otp.isVerifyValid = null
}

const handleResendCode = () => {
  handleRequestOtp()
  resetPincode()
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

watch(pincode, (val) => {
  if (val.length === 5) {
    handleVerifyOTP()
  }
})
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
    <div class="px-8 pt-8 pb-2 relative text-center flex justify-center items-center flex-col">
      <BaseInputOtp
        v-model="pincode"
        autofocus
        :error-fill="[
          isBoolean(otp.isVerifyValid) ? (otp.isVerifyValid === true ? 'success' : 'error') : '',
        ]"
      >
        <template #error>
          <span v-show="otp.isVerifyValid === false" class="text-danger text-sm">{{
            $t('invalidCodeTryAgain')
          }}</span>
        </template>
      </BaseInputOtp>
    </div>
    <div class="w-full flex justify-center items-center gap-2">
      <base-countdown
        v-slot="{ fullSeconds }"
        :time="otp.remainSec * 1000"
        class="w-full"
        @end="otp.remainSec = 0"
      >
        <div v-if="fullSeconds > 0" class="flex justify-center items-center">
          <span v-if="!fullSeconds && fullSeconds !== null">{{ $t('resendCode') }}</span>
          <span v-else class="leading-none">{{
            $t('resendWithin', { second: fullSeconds || otp.remainSec })
          }}</span>
        </div>
        <div class="flex justify-center items-center gap-4 w-full mt-4 <sm:(gap-2 mt-1)">
          <UButton :label="t('back')" variant="outline" @click="handleCancelOtp" />
          <UButton
            :label="t('resendCode')"
            variant="solid"
            :loading="loadingOtp"
            :disabled="otp.remainSec === 300 ? true : fullSeconds > 0"
            @click="fullSeconds <= 0 && handleResendCode()"
          />
        </div>
      </base-countdown>
    </div>
  </div>
</template>
