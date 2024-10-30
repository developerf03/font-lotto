<script setup>
// Imports
import { checkValueType, textInterrupt } from '~/utils/utils'

// Composables
const { login } = useAuth()
const { loginModal, handleLoginModal, handleForgotPasswordModal, handleRegisterModal } = useModals()
const signInSetting = useSignInSetting()

// States
const form = reactive({ username: '', password: '' })
const errors = reactive({})
const loading = ref(false)

// Computeds
const placeholder = computed(() =>
  textInterrupt(
    Object.keys(signInSetting?.loginWith)
      .filter((o) => signInSetting?.loginWith?.[o])
      .map((o) => t(o)),
    t('or'),
  ),
)
const validator = computed(() =>
  useValidator(form, errors).rules({
    username: Rules().required(`${t('pleaseEnter')} ${placeholder.value}`),
    password: Rules().required(t('validation.pleaseEnterPassword')),
  }),
)

// Functions
const handleSubmit = async () => {
  validator.value.validate()
  if (!validator.value.isFormValid) return

  loading.value = true
  try {
    const username = form.username.trim()
    await login({
      [checkValueType(username)]: username,
      password: form.password.trim(),
    })
    handleLoginModal(false)
    Object.assign(form, clearObj(form))
    useAlert({
      logo: true,
      text: t('welcome'),
      autoHide: true,
    })
  } catch (error) {
    console.log(error)

    useAlert({
      error: true,
      text: useErrorMsg({ error }),
      autoHide: true,
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <BaseModal v-model="loginModal" disable-click-out logo>
    <p class="text-center mb-5">{{ t('login') }}</p>
    <!-- FORM -->
    <UForm :state="form" class="w-full" @submit="handleSubmit">
      <!-- USERNAME -->
      <UFormGroup
        :label="placeholder"
        name="username"
        class="mb-4"
        :error="errors?.username?.message"
      >
        <BaseInput
          v-model="form.username"
          :placeholder="placeholder"
          @update:model-value="validator.validate('username')"
        />
      </UFormGroup>
      <!-- PASSWORD -->
      <UFormGroup :label="t('password')" name="password" :error="errors?.password?.message">
        <BaseInput
          v-model="form.password"
          type="password"
          :placeholder="'password'"
          @update:model-value="validator.validate('password')"
        />
      </UFormGroup>
      <!-- LINK FORGOT PASSWORD -->
      <p
        class="text-highlight text-xs underline cursor-pointer mb-4 mt-3 ml-auto w-max"
        @click="handleForgotPasswordModal(true), handleLoginModal(false)"
      >
        {{ t('forgotPassword') }}
      </p>
      <!-- BUTTON SUBMIT -->
      <UButton :label="t('login')" :loading="loading" type="submit" class="mb-4" />
    </UForm>
    <!-- LINK REGISTER -->
    <p class="text-sm">
      {{ t('dontHaveAccount') }}
      <span
        class="text-highlight text-xs underline cursor-pointer"
        @click="handleRegisterModal(true), handleLoginModal(false)"
        >{{ t('register') }}</span
      >
    </p>
  </BaseModal>
</template>
