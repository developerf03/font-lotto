<script setup>
// Import
import { object, string } from 'yup'

// Props

// Composables
const { sendOTP, verifyOTP, updateProfileV2 } = usePlayerStore()
const { fetchUser, userPlayer } = useAuth()
const { verifyOTPModal } = useModals()
const signUpSetting = computed(() => useSignUpSetting())
const CountryCallingCodes = computed(() => useCountryCallingCodes())
const refCodeOTP = useState('refCodeOTP', () => ({
  Code: '',
}))

// Stores

// State
const step = ref(0)
const isVerifyValid = ref(null)
const OTPDigit = ref(5)
const pincode = ref('')
const loading = ref(false)
const remainSec = ref(300)
const loadingOtp = ref(false)
const form = reactive({
  email: '',
  phoneNumber: '',
  callingCode: '',
})
const stepType = {
  phone: {
    edit: 'editPhone',
    verify: 'verifyPhone',
  },
  email: {
    edit: 'editEmail',
    verify: 'verifyEmail',
  },
}

// watch
watch(
  () => verifyOTPModal.value.active,
  (active) => {
    if (active) {
      resetForm()
      // if (
      //   verifyOTPModal.value?.typeSend === 'changeprofile' &&
      //   userPlayer.value?.[signUpSetting.value?.verifyWith]
      // ) {
      //   verifyOTPValidator.value.validate('email')
      //   verifyOTPValidator.value.validate('phoneNumber')
      // }

      if (signUpSetting.value?.isVerify || userPlayer.value?.[signUpSetting.value?.verifyWith]) {
        if (!verifyOTPModal.value.type) {
          verifyOTPModal.value.type = stepType?.[signUpSetting.value?.verifyWith]?.verify
          fetchSendOtp()
        }
      } else {
        verifyOTPModal.value.type = stepType?.[signUpSetting.value?.verifyWith]?.edit
      }
    }
  },
)

// Computeds
const schemaVerify = computed(() => {
  return object({
    ...(signUpSetting.value?.verifyWith === 'email' && {
      email: string().email(t('validation.emailInValid')).required('Required'),
    }),
    ...(signUpSetting.value?.verifyWith === 'phone' && {
      phoneNumber: string()
        .min(9, t('validation.invalidPhoneNumber'))
        .max(11, t('validation.invalidPhoneNumber'))
        .required('Required'),
    }),
  })
})

const callingCode = computed(
  () =>
    verifyOTPModal.value?.callingCode ||
    userPlayer.value?.callingCode ||
    form.callingCode?.callingCode,
)

// Function
const handCancel = () => {
  verifyOTPModal.value.active = false
}

const handleSendCode = () => {
  loading.value = true
  fetchSendOtp()
}

const fetchSendOtp = async () => {
  try {
    const { code, remain, refCode } = await sendOTP({
      ...(['editPhone', 'verifyPhone'].includes(verifyOTPModal.value?.type) && {
        // phone: form.phoneNumber,
        callingPhone: convertPhoneNumber(form.phoneNumber, callingCode.value),
        // callingCode: callingCode.value,
      }),
      ...(['editEmail', 'verifyEmail'].includes(verifyOTPModal.value?.type) && {
        email: form.email,
      }),
      type: verifyOTPModal.value?.typeSend,
    })
    refCodeOTP.value.Code = refCode
    remainSec.value = remain || 300
    if (['editEmail', 'editPhone'].includes(verifyOTPModal.value?.type)) step.value = 1
    // 6040 = ยืนยัน otp แล้ว
    if (code === 6040) {
      verifyOTPModal.value.active = false
      loading.value = false
      onCallBack()
      useAlert({
        success: true,
        text: t('verified'),
      })
    }
  } catch (error) {
    // เคยของ OTP แล้ว
    // 6040 = ยืนยัน otp แล้ว
    if (error.data?.code === 6041) {
      step.value = 1
      remainSec.value = error.data?.remain || 300
    } else if (error.data?.code === 6040) {
      verifyOTPModal.value.active = false
      loading.value = false
      onCallBack()
      useAlert({
        success: true,
        text: t('verified'),
      })
    } else {
      useAlert({
        error: true,
        text: useErrorMsg({ error }),
      })
      console.log('error', error)
      verifyOTPModal.value.active = false
    }
    if (['editEmail', 'editPhone'].includes(verifyOTPModal.value?.type)) loading.value = false
  }
}

const handleVerifyOTP = async () => {
  try {
    loadingOtp.value = true
    await verifyOTP({
      ...(['editPhone', 'verifyPhone'].includes(verifyOTPModal.value?.type) && {
        // phone: form.phoneNumber,
        callingPhone: convertPhoneNumber(form.phoneNumber, callingCode.value),
        // callingCode: callingCode.value,
      }),
      ...(['editEmail', 'verifyEmail'].includes(verifyOTPModal.value?.type) && {
        email: form.email,
      }),
      type: verifyOTPModal.value?.typeSend,
      otp: pincode.value,
      ...(['withdraw'].includes(verifyOTPModal.value?.typeSend) && {
        refCode: refCodeOTP.value?.Code,
      }),
    })

    // กรณีไม่มีข้อมูล เบอร์โทร และอีเมล จะต้องอัพเดพข้อมูลใหม่
    if (
      ['editEmail', 'editPhone'].includes(verifyOTPModal.value?.type) ||
      ['firsttimedeposit', 'changeprofile'].includes(verifyOTPModal.value?.typeSend)
    ) {
      updateDataProfile()
    } else {
      // กรณีมีข้อมูล เบอร์โทร และอีเมล
      useAlert({
        success: true,
        text: t(t('successfulIdentityVerification')),
      })
      setTimeout(() => {
        verifyOTPModal.value.active = false
        resetForm()
        onCallBack()
      }, 1000)
    }
  } catch (error) {
    console.log('error', error)
    isVerifyValid.value = false
  } finally {
    loadingOtp.value = false
  }
}

const updateDataProfile = async () => {
  // updateProfileV2
  try {
    await updateProfileV2({
      ...(signUpSetting.value?.verifyWith === 'phone' && {
        phone: form.phoneNumber,
        callingPhone: convertPhoneNumber(form.phoneNumber, callingCode.value),
        callingCode: callingCode.value,
      }),
      ...(signUpSetting.value?.verifyWith === 'email' && {
        email: form.email,
      }),
      type: verifyOTPModal.value?.typeSend,
    })
    if (signUpSetting.value?.verifyWith === 'email') {
      useAlert({
        success: true,
        text: t('5005'),
      })
    } else if (signUpSetting.value?.verifyWith === 'phone') {
      useAlert({
        success: true,
        text: t('5024'),
      })
    }
    setTimeout(() => {
      verifyOTPModal.value.show = false
      resetForm()
    }, 1000)
    await fetchUser()
    onCallBack()
  } catch (error) {
    useAlert({
      error: true,
      text: error?.data?.message,
    })
  }
}

const onCallBack = () => {
  if (verifyOTPModal.value.cb) {
    verifyOTPModal.value.cb()
  }
}

const handleResendCode = () => {
  fetchSendOtp()
  resetForm()
}

const handleOnChangeOTP = (val) => {
  if (val.length === OTPDigit.value) {
    handleVerifyOTP()
    isVerifyValid.value = false
  }
}

const handleClose = () => {
  if (['editEmail', 'editPhone'].includes(verifyOTPModal.value?.type) && step.value === 1) {
    step.value = 0
    loading.value = false
    resetForm()
  } else {
    verifyOTPModal.value.active = false
  }
}

const resetForm = () => {
  remainSec.value = 300
  pincode.value = ''
  isVerifyValid.value = null
  form.email = verifyOTPModal.value?.email || userPlayer.value?.email || ''
  form.phoneNumber = verifyOTPModal.value?.phoneNumber || userPlayer.value?.phone || ''
  form.callingCode =
    CountryCallingCodes.value?.length === 1
      ? CountryCallingCodes.value?.[0]
      : CountryCallingCodes.value?.find((o) => o?.currencyCode === useCurrencyCode())
}

// onMounted
</script>

<template>
  <BaseModal v-model="verifyOTPModal.active" disable-click-out logo>
    <div class="w-full mt-4">
      <div
        v-if="['editEmail', 'editPhone'].includes(verifyOTPModal?.type) && step === 0"
        class="w-full"
      >
        <pre>{{ form }}</pre>
        <div class="<sm:text-xl sm:text-xl md:text-2xl mb-2">
          {{ verifyOTPModal?.type === 'editPhone' ? t('phone') : t('email') }}
        </div>
        <!-- Phone / Email -->
        <div v-if="verifyOTPModal?.type === 'editPhone'" class="flex gap-3">
          <UForm :schema="schemaVerify" :state="form" class="w-full">
            <UFormGroup :label="t('validation.pleaseEnterPhoneNumber')" name="phoneNumber">
              <BaseInput v-model="form.phoneNumber" :placeholder="t('phone')" type="tel" />
            </UFormGroup>
          </UForm>
        </div>
        <div v-else class="flex gap-3">
          <UForm :schema="schemaVerify" :state="form" class="w-full">
            <UFormGroup :label="t('validation.pleaseEnterEmail')" name="email">
              <BaseInput v-model="form.email" :placeholder="t('email')" />
            </UFormGroup>
          </UForm>
        </div>

        <div class="flex justify-center items-center gap-4 mt-4 <sm:(gap-2)">
          <UButton :label="t('cancel')" variant="cancel" @click="handCancel" />
          <UButton
            :label="t('next')"
            variant="solid"
            :loading="loading"
            :disabled="!form.phoneNumber || !form.email"
            @click="handleSendCode"
          />
        </div>
      </div>
      <!-- Step Verify -->
      <div
        v-if="['verifyEmail', 'verifyPhone'].includes(verifyOTPModal?.type) || step === 1"
        class="w-full"
      >
        <div class="mt-2 mb-2 <sm:text-xl sm:text-xl md:text-2xl">{{ t('verifyOTP') }}</div>
        <div
          class="flex mb-2 <sm:(gap-1 flex-wrap) sm:(gap-1 flex-wrap) md:(gap-1 flex-wrap) lg:(gap-2)"
        >
          <div class="text-tertiary font-normal text-base">
            {{ $t('enterCodeWeSentTo', { digit: OTPDigit }) }}
          </div>
          <div class="font-normal text-base text-highlight">
            {{
              signUpSetting?.verifyWith === 'phone'
                ? convertPhoneNumber(form.phoneNumber, callingCode)
                : form.email
            }}
          </div>
        </div>
        <div class="relative mt-4 text-center flex justify-center items-center flex-col">
          <div style="width: fit-content">
            <BaseInputOtp
              v-model="pincode"
              :error="
                isVerifyValid === null || isVerifyValid === true ? '' : t('invalidCodeTryAgain')
              "
              @on-change="handleOnChangeOTP"
            />
          </div>
          <base-countdown
            v-slot="{ fullSeconds }"
            :time="remainSec * 1000"
            class="w-full"
            @end="remainSec = 0"
          >
            <div v-if="fullSeconds > 0" class="mt-2">
              <span v-if="!fullSeconds && fullSeconds !== null">{{ $t('resendCode') }}</span>
              <span v-else class="leading-none">{{
                $t('resendWithin', { second: fullSeconds || remainSec })
              }}</span>
            </div>
            <div class="flex justify-center items-center gap-4 w-full mt-4 <sm:(gap-2 mt-1)">
              <UButton
                :label="
                  ['editEmail', 'editPhone'].includes(verifyOTPModal?.type) && step === 1
                    ? t('back')
                    : t('cancel')
                "
                variant="cancel"
                @click="handleClose"
              />
              <UButton
                :label="t('resendCode')"
                variant="solid"
                :loading="loadingOtp"
                :disabled="remainSec === 300 ? true : fullSeconds > 0"
                @click="fullSeconds <= 0 && handleResendCode()"
              />
            </div>
          </base-countdown>
        </div>
      </div>
    </div>
    <!-- <pre>{{ verifyOTPModal }}</pre> -->
  </BaseModal>
</template>
