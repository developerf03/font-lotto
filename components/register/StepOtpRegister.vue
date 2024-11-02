<script setup>
// Import

// Props
const props = defineProps({
  phone: {
    type: [String, Number],
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
  email: {
    type: String,
    default: '',
  },
  remainSec: {
    type: [String, Number],
    default: '',
  },
  steps: { type: Array, required: true },
  nextStep: { type: Function, required: true },
  signupSetting: { type: Object, required: true },
})

// Composables
const { registerModal } = useModals()

// Store
const { sendOTP, verifyOTP } = usePlayerStore()

// States
const otp = reactive({
  pincode: '',
  isVerifyValid: null,
  remainSec: props?.remainSec,
  remainSecDefault: 300,
})

// Function
const handleRequestOtp = async () => {
  try {
    const { code, remain } = await sendOTP({
      // if verify with phone
      ...(props?.signupSetting?.verifyWith === 'phone' && {
        phone: props.phone,
        callingCode: props.callingCode,
        callingPhone: props.callingPhone,
      }),
      // if verify with email
      ...(props?.signupSetting?.verifyWith === 'email' && {
        email: props.email,
      }),
      currency: useDefaults()?.currencyCode,
      type: 'register', // register, forgotpassword, changeprofile, withdraw, firsttimedeposit
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
      ...(props?.signupSetting?.verifyWith === 'phone' && {
        phone: props.phone,
        callingPhone: props.callingPhone,
      }),
      // if verify with email
      ...(props?.signupSetting?.verifyWith === 'email' && {
        email: props.email,
      }),
      otp: otp.pincode,
      type: 'register',
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

const resetPincode = () => {
  otp.pincode = ''
  otp.isVerifyValid = null
}

const handleCancelOtp = () => {
  props.nextStep(props.steps[0])
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
  () => registerModal.value,
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
      {{ signupSetting?.verifyWith === 'phone' ? 'ยืนยันเบอร์โทรศัพท์' : 'ยืนยันอีเมล' }}
    </span>
    <span class="color-[var(--font-tertiary)]"
      >ใส่รหัส ที่เราพึ่งส่งไปยัง{{ signupSetting?.verifyWith === 'phone' ? 'เบอร์' : 'อีเมล' }}
      <span class="color-[var(--font-highlight)]">{{
        signupSetting?.verifyWith === 'phone' ? phone : email
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
