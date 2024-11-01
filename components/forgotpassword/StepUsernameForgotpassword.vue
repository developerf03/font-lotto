<script setup>
// Import

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
const { handVerifyOTPModal } = useModalStore()

// Stores
const { profileCheckData, sendOTP } = usePlayerStore()

// State
const validateType = props?.signinSetting.verifyWith
const form = reactive({
  email: '',
  phone: '',
})

// Functions
const onSendOtp = async () => {
  try {
    const { code, remain } = sendOTP({
      // if verify with phone
      ...(props?.signinSetting?.verifyWith === 'phone' && {
        phone: form.phone,
        callingCode: '+66',
        callingPhone: convertPhoneNumber(form.phone, '+66'),
      }),
      // if verify with email
      ...(props?.signinSetting?.verifyWith === 'email' && {
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
      console.log('error :>> ', error)
    }
  }
}
</script>

<template>
  <div class="flex justify-center items-center flex-col w-full">
    <div class="font-bold text-primary <sm:(text-sm)">
      กรุณากรอกเบอร์โทรศัพท์ที่เคยใช้สมัครใช้งาน
    </div>
    <div class="w-full">
      <UForm :state="form" class="space-y-4" @submit="submitFirstStep">
        <UFormGroup v-if="validateType === 'email'" label="Email" name="email" required>
          <BaseInput v-model="form.email" placeholder="email" />
        </UFormGroup>
        <UFormGroup v-if="validateType === 'phone'" label="เบอร์โทรศัพท์" name="phone" required>
          <BaseInput
            v-model="form.phone"
            placeholder="เช่น 081-234-5678"
            type="tel"
            :maxlength="10"
          />
        </UFormGroup>
        <UButton
          label="ต่อไป"
          class="!w-full"
          type="submit"
          :ui="{ rounded: 'rounded-full' }"
          size="xl"
          variant="solid"
        />
      </UForm>
    </div>
  </div>
</template>
