<script setup>
// Import
import RegisterStepUsername from '~/components/register/StepUsernameRegister.vue'
import RegisterStepOtp from '~/components/register/StepOtpRegister.vue'
import RegisterStepBank from '~/components/register/StepBankRegister.vue'
import RegisterStepDetail from '~/components/register/StepDetailRegister.vue'
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
})
const currentStep = ref('input-phone') // input-phone , verify-otp , bank-account , submit
const remainSec = ref(0)

// Computeds
const signupSetting = computed(() => useSignUpSetting())
const isStep = computed(() => (targetStep) => targetStep === currentStep.value)
const steps = computed(() =>
  [
    'input-phone',
    signupSetting.value?.verifyRegister && 'verify-otp',
    signupSetting.value?.requireBank && 'bank-account',
    'submit',
  ].filter((v) => v),
)

// Functions
const formatDateOfBirth = () => {
  if (form.dateOfBirth) {
    // Convert date to ISO string
    const parts = form.dateOfBirth.split('/')
    const date = new Date(parts[2], parts[1] - 1, parts[0])
    return date.toISOString()
  } else {
    return ''
  }
}
const handleSubmit = async () => {
  const isoString = formatDateOfBirth()
  try {
    const { accessToken, refreshToken } = await register({
      // if enable username
      ...(signupSetting.value?.registerWith?.username && {
        playerUsername: form.playerUsername,
      }),
      // if enable email
      ...(signupSetting.value?.registerWith?.email && { email: form.email }),
      // if enable phone
      ...(signupSetting.value?.registerWith?.phone && {
        phone: form.phone,
        callingCode: form.callingCode[0]?.callingCode,
        callingPhone: convertPhoneNumber(form.phone, form.callingCode[0]?.callingCode),
      }),
      // if enable date of birth
      ...(signupSetting.value?.dateOfBirth && { dateOfBirth: isoString }),
      // if enable require bank
      ...(signupSetting.value?.requireBank && {
        accountNumber: form.accountNumber,
        accountName: form.accountName,
        bankCode: form.bankCode,
      }),
      // if have utm source
      ...((route.query?.utm_source || utm.value) && {
        register_from: route.query?.utm_source || utm.value,
      }),
      // if have ref code
      ...(form.referCode && { referCode: form.referCode }),
      // if have aff_regis_code code
      ...(form.affCode && {
        aff_regis_code: form.affCode,
      }),
      password: form.password,
      currency: useDefaults()?.currencyCode,
      playerCurrency: useDefaults()?.currencyCode,
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
        text: useErrorMsg({ error }),
        autoHide: true,
      })
      return
    }
    useAlert({
      error: true,
      title: t('error'),
      text: useErrorMsg({ error }),
      autoHide: true,
    })
  }
}

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

onMounted(() => {
  resetForm()
  nextStep(steps.value[0])
})
</script>

<template>
  <baseModal
    id="register-modal-wrapper"
    v-model="registerModal"
    :disable-click-out="true"
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
        :signup-setting="signupSetting"
        :setting="setting"
      />

      <!-- Input OTP -->
      <register-step-otp
        v-if="isStep('verify-otp')"
        :email="form.email"
        :phone="form.phone"
        :calling-phone="form.callingPhone"
        :calling-code="form.callingCode?.callingCode"
        :steps="steps"
        :next-step="nextStep"
        :signup-setting="signupSetting"
        :remain-sec="remainSec"
        :reset-form="resetForm"
      />

      <!-- Bank Account -->
      <register-step-bank
        v-if="isStep('bank-account')"
        :set-form="setForm"
        :reset-form="resetForm"
        :steps="steps"
        :next-step="nextStep"
      />

      <!-- Sumit -->
      <register-step-detail
        v-if="isStep('submit')"
        :email="form.email"
        :phone="form.phone"
        :setting="setting"
        :signup-setting="signupSetting"
        :set-form="setForm"
        :steps="steps"
        :reset-form="resetForm"
        :next-step="nextStep"
        :submit-register="handleSubmit"
        :register-loading="loading"
      />
    </div>
  </baseModal>
</template>
