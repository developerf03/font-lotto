<script setup>
// Import
import ForgotPassowrdStepUsername from '~/components/forgotpassword/StepUsernameForgotpassword.vue'
import ForgotPassowrdStepOtp from '~/components/forgotpassword/StepOtpForgotpasasword.vue'
import ForgotPassowrdStepNewPassword from '~/components/forgotpassword/StepNewPassword.vue'

// Composables
const { forgotPasswordModal, handleForgotPasswordModal } = useModals()
const setting = useSetting()

// Sotres
const { changeNewPassword } = usePlayerStore()

// State
const form = reactive({
  email: '',
  phoneNumber: '',
  callingPhone: '',
  callingCode: '',
  password: '',
  confirmPassword: '',
})
const currentStep = ref('input-phone') // input-phone , verify-otp , submit
const remainSec = ref(0)

// Computeds
const signInSetting = computed(() => useSignInSetting())
const validateType = computed(() => signInSetting?.value.verifyWith)

const isStep = computed(() => (targetStep) => targetStep === currentStep.value)
const steps = computed(() => ['input-phone', 'verify-otp', 'submit'].filter((v) => v))

// Function
const nextStep = (targetStep) => {
  if (targetStep) {
    currentStep.value = targetStep
  } else {
    currentStep.value = steps.value[steps.value.indexOf(currentStep.value) + 1]
  }
}

const resetForm = () => {
  Object.assign(form, clearObj(form))
}

const setForm = (field, value) => {
  form[field] = value
}

const submitForgotpassword = async () => {
  try {
    await changeNewPassword({
      ...(validateType.value === 'phone' && {
        phone: form.phoneNumber,
        callingPhone: form.callingPhone,
      }),
      ...(validateType.value === 'email' && {
        email: form.email,
      }),
      newPassword: form.password,
    })
    nextStep('input-phone')
    resetForm()
    handleForgotPasswordModal(false)
    useAlert({
      logo: true,
      text: t('passwordChangedSuccessfully'),
      autoHide: true,
    })
  } catch (error) {
    if (error.data?.code === 6049) {
      nextStep('input-phone')
      resetForm()
    }
    useAlert({
      error: true,
      text: error.data?.message,
      autoHide: true,
    })
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
        <div
          v-if="isStep('input-phone') || isStep('submit')"
          class="font-bold text-primary <sm:(text-sm)"
        >
          {{ isStep('input-phone') ? t('forgotPassword') : t('changeYourPassword') }}
        </div>
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
        :phone-number="form.phoneNumber"
        :calling-phone="form.callingPhone"
        :calling-code="form.callingCode?.callingCode"
        :steps="steps"
        :next-step="nextStep"
        :signin-setting="signInSetting"
        :remain-sec="remainSec"
        :reset-form="resetForm"
      />

      <!-- Submit Forgot Password -->
      <ForgotPassowrdStepNewPassword
        v-if="isStep('submit')"
        :email="form.email"
        :phone-number="form.phoneNumber"
        :setting="setting"
        :signin-setting="signInSetting"
        :set-form="setForm"
        :reset-form="resetForm"
        :submit-forgotpassword="submitForgotpassword"
      />
    </div>
  </baseModal>
</template>
