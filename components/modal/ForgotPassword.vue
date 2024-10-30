<script setup>
// Import
import ForgotPassowrdStepUsername from '~/components/forgotpassword/StepUsername.vue'
import ForgotPassowrdStepOtp from '~/components/forgotpassword/StepOtp.vue'
import ForgotPassowrdStepNewPassword from '~/components/forgotpassword/StepNewPassword.vue'

// Composables
const { forgotPasswordModal } = useModals()
const setting = useSetting()

// Sotres

// State
const form = reactive({
  email: '',
  phone: '',
  callingPhone: '',
  callingCode: '',
  password: '',
  confirmPassword: '',
})
const currentStep = ref('input-phone') // input-phone , verify-otp , submit

// Computeds
const signInSetting = computed(() => useSignInSetting())

const isStep = computed(() => (targetStep) => targetStep === currentStep.value)
const steps = computed(() =>
  [
    'input-phone',
    signInSetting.value?.verifyRegister && 'verify-otp',
    'submit',
  ].filter((v) => v),
)

// Function
const nextStep = (targetStep) => {
  if (targetStep) {
    currentStep.value = targetStep
  } else {
    currentStep.value = steps.value[steps.value.indexOf(currentStep.value) + 1]
  }
}

</script>

<template>
  <baseModal
    id="forgot-password-modal-wrapper"
    v-model="forgotPasswordModal"
    :disable-click-out="false"
    :btn-submit="false"
    :hide-icon-close="true"
  >
    <div class="flex justify-center items-center flex-col w-full">
      <div class="text-center">
        <BaseLogo />
        <div class="font-bold text-primary <sm:(text-sm)">ลืมรหัสผ่าน</div>
      </div>

      <!-- Input Phone -->
      <ForgotPassowrdStepUsername
        v-if="isStep('input-phone')"
        v-model:remain-sec="remainSec"
        :steps="steps"
        :set-form="setForm"
        :next-step="nextStep"
        :signin-setting="signInSetting"
        :setting="setting"
      />

      <!-- Input OTP -->
      <ForgotPassowrdStepOtp
        v-if="isStep('verify-otp')"
        :email="form.email"
        :phone="form.phone"
        :calling-phone="form.callingPhone"
        :calling-code="form.callingCode?.callingCode"
        :steps="steps"
        :next-step="nextStep"
        :signup-setting="signInSetting"
        :remain-sec="remainSec"
        :reset-form="resetForm"
      />

      <!-- Submit Forgot Password -->
      <ForgotPassowrdStepNewPassword
        v-if="isStep('submit')"
        :setting="setting"
        :signup-setting="signInSetting"
        :set-form="setForm"
        :reset-form="resetForm"
        :submit-register="handleSubmit"
        :register-loading="loading"
      />
    </div>
  </baseModal>
</template>
