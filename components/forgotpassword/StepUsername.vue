<script setup>
// Import
import { object, string } from 'yup'

// Props
const props = defineProps({
  steps: { type: Array, required: true },
  nextStep: { type: Function, required: true },
  setForm: { type: Function, required: true },
  signinSetting: { type: Object, default: () => {} },
  setting: { type: Object, default: () => {} },
  remainSec: {
    type: [String, Number],
    required: true,
  },
})

const emit = defineEmits(['update:remainSec'])

// Stores
const { profileCheckData, sendOTP } = usePlayerStore()

// State
const validateType = props?.signinSetting.verifyWith
const form = reactive({
  form: {
    playerUsername: '',
    email: '',
    phone: '',
  },
  schema: object({
    ...(props.signinSetting?.registerWith?.username && {
      playerUsername: string().test({
        test(value, ctx) {
          if (value) {
            return ctx.createError({ message: 'Must be at least 10 characters' })
          }
          checkUsername()
          return true
        },
      }),
    }),
    ...(props.signinSetting?.registerWith?.phone && {
      phone: string().test({
        test(value, ctx) {
          if (value.length < 10) {
            return ctx.createError({ message: 'Must be at least 10 characters' })
          }
          checkPhone()
          // if(checkData.value.phone) {
          //   return ctx.createError({ message: 'Duplicated Player Phone Number' })
          // } else {
          //   checkData.value.phone = true
          //   return true
          // }
        },
      }),
    }),
  }),
  submitFirstStep: async () => {
    // useDebounceFn(() => onCheckData('phone'), 200)
    // if require verify
    console.log('checkData.value :>> ', checkData.value)
    // if (props?.signupSetting?.verifyRegister === true) {
    //   onSendOtp()
    //   return
    // }
    // // if not require verify
    // if (props?.signupSetting?.verifyRegister === false) {
    //   setValueToMainForm()
    //   props.nextStep()
    // }
  },
})

// Functions
const onSendOtp = async () => {
  try {
    const { code, remain } = sendOTP({
      // if verify with phone
      ...(props?.signupSetting?.verifyWith === 'phone' && {
        phone: form.form.phone,
        callingCode: '+66',
        callingPhone: convertPhoneNumber(form.form.phone, '+66'),
      }),
      // if verify with email
      ...(props?.signupSetting?.verifyWith === 'email' && {
        email: form.form.email,
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
      <UForm
        :schema="form.schema"
        :state="form.form"
        class="space-y-4"
        @submit="form.submitFirstStep"
      >
        <UFormGroup v-if="validateType === 'email'" label="Email" name="email" required>
          <BaseInput v-model="form.form.email" placeholder="email" />
        </UFormGroup>
        <UFormGroup v-if="validateType === 'phone'" label="เบอร์โทรศัพท์" name="phone" required>
          <BaseInput
            v-model="form.form.phone"
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
