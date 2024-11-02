<script setup>
// Imports

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
  signinSetting: { type: Object, default: () => {} },
  setting: { type: Object, default: () => {} },
  setForm: { type: Function, required: true },
  steps: { type: Array, required: true },
  nextStep: { type: Function, required: true },
  resetForm: { type: Function, required: true },
  submitForgotpassword: { type: Function, required: true },
  loading: { type: Boolean, required: true },
})

// Composables

// Stores
const checkValidate = ref(null)

// State
const form = reactive({
  password: '',
  confirmPassword: '',
})
const errors = reactive({})
const validateType = props?.signinSetting.verifyWith

// Computeds
const validator = computed(() =>
  useValidator(form, errors).rules({
    password: Rules()
      .required(t('validation.pleaseEnterPassword'))
      .password(t('validation.passwordErr')),
    confirmPassword: Rules()
      .required(t('validation.pleaseEnterPassword'))
      .isMatch({ errMsg: t('validation.passwordsNotMatch'), field: 'password' }),
  }),
)

// Functions
const handleInput = (field) => {
  validator.value.validate(field)
}

const setValueToMainForm = () => {
  Object.keys(form).forEach((o) => {
    props.setForm(o, form[o])
  })
}

const handleSubmit = () => {
  setValueToMainForm()
  setTimeout(() => {
    props.submitForgotpassword()
  }, 100)
}
</script>

<template>
  <div class="flex justify-center items-center flex-col w-full">
    <div class="w-full">
      <UForm :state="form" class="space-y-4" @submit="handleSubmit">
        <UFormGroup v-if="validateType === 'email'" :label="t('emal')" name="email">
          <BaseInput :model-value="email" :placeholder="t('email')" readonly />
        </UFormGroup>
        <UFormGroup v-if="validateType === 'phone'" :label="t('phone')" name="phoneNumber">
          <BaseInput
            :model-value="phoneNumber"
            :placeholder="t('phone')"
            type="tel"
            :maxlength="10"
            readonly
          />
        </UFormGroup>
        <UFormGroup :label="t('password')" name="password" :error="errors?.password?.message">
          <BaseInput
            v-model="form.password"
            type="password"
            :placeholder="t('password')"
            @update:model-value="handleInput('password'), handleInput('confirmPassword')"
          />
        </UFormGroup>
        <UFormGroup
          :label="t('confirmPassword')"
          name="confirmPassword"
          :error="errors?.confirmPassword?.message"
        >
          <BaseInput
            v-model="form.confirmPassword"
            type="password"
            :placeholder="t('confirmPassword')"
            @update:model-value="handleInput('confirmPassword'), handleInput('password')"
          />
        </UFormGroup>
        <BaseValidateList ref="checkValidate" :password="form.password" />
        <UButton
          :label="t('save')"
          class="!w-full"
          type="submit"
          :ui="{ rounded: 'rounded-full' }"
          size="xl"
          variant="solid"
          :disabled="!validator.isFormValid"
        />
      </UForm>
    </div>
  </div>
</template>
