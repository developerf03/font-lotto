<script setup>
// Import
import RegisterStepUsername from '~/components/register/StepUsername.vue'
import RegisterStepOtp from '~/components/register/StepOtp.vue'
import RegisterStepBank from '~/components/register/StepBank.vue'
import RegisterStepDetail from '~/components/register/StepDetail.vue'
import { convertPhoneNumber } from '~/utils/utils'
import { useStorage } from '@vueuse/core'

// Composables
const { registerModal, handleRegisterModal } = useModals()
const setting = useSetting()
const { register } = usePlayerStore()
const { fetchUser, setTokenAndCookie } = useAuth()
// const { useShowSplashScreen } = useLoading()
const utm = useStorage('utm_source', '')
const referCodeLocal = useStorage('ref', '')
const affCodeLocal = useStorage('aff_regis_code', '')
const route = useRoute()

// Sotres

// State
const form = reactive({
  form: {
    playerUsername: '',
    email: '',
    phone: '',
    callingPhone: '',
    callingCode: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    referCode: '',
    affCode: '',
    accountName: '',
    bankCode: '',
    accountNumber: '',
    currency: '',
  },
})
const currentStep = ref('input-phone') // input-phone , verify-otp , bank-account , submit

// Computeds
const signUpSetting = computed(() => useSignUpSetting())

const isStep = computed(() => (targetStep) => targetStep === currentStep.value)
const steps = computed(() =>
  [
    'input-phone',
    signUpSetting.value?.verifyRegister && 'verify-otp',
    signUpSetting.value?.requireBank && 'bank-account',
    !signUpSetting.value?.requireBank && 'submit',
  ].filter((v) => v),
)

// Functions
const handleSubmit = async () => {
  const date = new Date(form.form.dateOfBirth)
  const isoString = date.toISOString()
  try {
    const { accessToken, refreshToken } = await register({
      // if enable username
      ...(signUpSetting.value?.registerWith?.username && {
        playerUsername: form.form.playerUsername,
      }),
      // if enable email
      ...(signUpSetting.value?.registerWith?.email && { email: form.form.email }),
      // if enable phone
      ...(signUpSetting.value?.registerWith?.phone && {
        phone: form.form.phone,
        callingCode: form.form.callingCode[0]?.callingCode,
        callingPhone: convertPhoneNumber(form.form.phone, form.form.callingCode[0]?.callingCode),
      }),
      // if enable date of birth
      ...(signUpSetting.value?.dateOfBirth && { dateOfBirth: isoString }),
      // if enable require bank
      ...(signUpSetting.value?.requireBank && {
        accountNumber: form.form.accountNumber,
        accountName: form.form.accountName,
        bankCode: form.form.bankCode?.bankCode,
      }),
      // if have utm source
      ...((route.query?.utm_source || utm.value) && {
        register_from: route.query?.utm_source || utm.value,
      }),
      // if have ref code
      ...(form.form.referCode && { referCode: form.form.referCode }),
      // if have aff_regis_code code
      ...(form.form.affCode && {
        aff_regis_code: form.form.affCode,
      }),
      password: form.form.password,
      currency: useCurrencyCode(),
    })
    utm.value = ''
    affCodeLocal.value = ''
    referCodeLocal.value = ''
    setTokenAndCookie({ accessToken, refreshToken })
    fetchUser().then(() => {
      nextStep('input-phone')
      resetForm()
      handleRegisterModal(false)
      useAlert({
        logo: true,
        text: t('welcome'),
        autoHide: true,
      })
    })
  } catch (error) {
    if (error.data?.code === 6049) {
      nextStep('input-phone')
      resetForm()
      useAlert({
        error: true,
        title: t('error'),
        text: error.data?.message,
        autoHide: true,
      })
      return
    }
    useAlert({
      error: true,
      text: error.data?.message,
      autoHide: true,
    })
  }
}

const nextStep = (targetStep) => {
  if (targetStep) {
    console.log('targetStep :>> ', targetStep);
    currentStep.value = targetStep
  } else {
    currentStep.value = steps.value[steps.value.indexOf(currentStep.value) + 1]
  }
}

const resetForm = () => {
  Object.assign(form.form, clearObj(form.form))
}

const setForm = (field, value) => {
  form.form[field] = value
}

onMounted(() => {
  resetForm()
  nextStep(steps.value[0])
})
</script>

<template>
  <baseModal
    id="register-modal-wrapper"
    v-model="registerModal"
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
          {{ t('register') }}
        </div>
      </div>

      <!-- Input Phone -->
      <register-step-username
        v-if="isStep('input-phone')"
        v-model:remain-sec="remainSec"
        :steps="steps"
        :set-form="setForm"
        :next-step="nextStep"
        :signup-setting="signUpSetting"
        :setting="setting"
      />

      <!-- Input OTP -->
      <register-step-otp
        v-if="isStep('verify-otp')"
        :email="form.form.email"
        :phone="form.form.phone"
        :calling-phone="form.form.callingPhone"
        :calling-code="form.form.callingCode[0]?.callingCode"
        :steps="steps"
        :next-step="nextStep"
        :signup-setting="signUpSetting"
        :submit-register="handleSubmit"
        :remain-sec="remainSec"
        :reset-form="resetForm"
      />

      <!-- Bank Account -->
      <register-step-bank
        v-if="isStep('bank-account')"
        :set-form="setForm"
        :reset-form="resetForm"
        :submit-register="handleSubmit"
        :steps="steps"
        :next-step="nextStep"
      />

      <!-- Sumit -->
      <register-step-detail
        v-if="isStep('submit')"
        :email="form.form.email"
        :phone="form.form.phone"
        :signup-setting="signUpSetting"
        :setting="setting"
        :set-form="setForm"
        :reset-form="resetForm"
        :submit-register="handleSubmit"
        :steps="steps"
        :next-step="nextStep"
      />
    </div>
  </baseModal>
</template>
