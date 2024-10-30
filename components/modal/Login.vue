<script setup>
// Imports
import { checkValueType, textInterrupt } from '~/utils/utils'
import { object, string } from 'yup'

// Composables
const { login } = useAuth()
const { loginModal, handleLoginModal, handleForgotPasswordModal, handleRegisterModal } = useModals()
const signInSetting = useSignInSetting()

// States
const form = reactive({ username: '', password: '' })
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

// Validate
const validate = object({
  username: string().required(`${t('pleaseEnter')} ${placeholder.value}`),
  password: string().required(t('validation.pleaseEnterPassword')),
})

// Functions
const handleSubmit = async () => {
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
    <UForm
      :schema="validate"
      :state="form"
      validate-on="submit"
      class="w-full"
      @submit="handleSubmit"
    >
      <!-- USERNAME -->
      <UFormGroup :label="t(placeholder)" name="username" class="mb-4">
        <BaseInput v-model="form.username" :placeholder="placeholder" />
      </UFormGroup>
      <!-- PASSWORD -->
      <UFormGroup :label="t('password')" name="password">
        <BaseInput v-model="form.password" type="password" :placeholder="'password'" />
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
