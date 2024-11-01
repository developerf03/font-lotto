<script setup>
// Imports
import { useDebounceFn } from '@vueuse/core'
import { dateToISOString } from '~/utils/utils'

// Composables
const { userPlayer, fetchUser } = useAuth()
const { profileModal, handVerifyOTPModal } = useModals()
const { profileCheckData, updateProfileV2 } = usePlayerStore()
const signUpSetting = computed(() => useSignUpSetting())

// States
const form = reactive({
  phone: '',
  email: '',
  dateOfBirth: '',
})
const errors = reactive({})
const isEdit = ref(false)

// Computeds
const validator = computed(() =>
  useValidator(form, errors).rules({
    phone: Rules()
      .required('validation.pleaseEnterPhoneNumber')
      .minLength({
        errMsg: t('validation.invalidPhoneNumber'),
        min: 9,
      })
      .maxLength({
        errMsg: t('validation.invalidPhoneNumber'),
        max: 10,
      })
      .custom(checkPhone),
    email: Rules()
      .required(t('validation.pleaseEnterUsername'))
      .email(t('validation.emailInValid'))
      .custom(checkEmail),
    dateOfBirth: Rules()
      .required(t('validation.pleaseEnterDateOfBirth'))
      .date(t('validation.invalidDateFormat')),
  }),
)

// Watchs
watch(profileModal, (o) => {
  if (o) {
    reset()
  }
})

// Functions
const handleCheckData = async (field) => {
  const textErrors = {
    email: 'emailAlreadyExists',
    phone: 'phoneAlreadyExists',
  }

  try {
    await profileCheckData({ [field]: form?.[field] || '' })
    return ''
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return t(textErrors[field])
  } finally {
    setTimeout(() => {}, 500)
  }
}

const checkPhone = useDebounceFn(() => handleCheckData('phone'), 200)
const checkEmail = useDebounceFn(() => handleCheckData('email'), 200)

const reset = () => {
  isEdit.value = false
  form.phone = userPlayer.value?.phone || ''
  form.email = userPlayer.value?.email || ''
  form.dateOfBirth = $format.dateOnly(userPlayer.value?.dateOfBirth) || ''
}

const onChangeProfile = async (isChanged) => {
  const payload = {
    ...(isChanged.phone && { phone: form.phone }),
    ...(isChanged.email && { email: form.email }),
    ...(isChanged.dateOfBirth && { dateOfBirth: dateToISOString(form.dateOfBirth) }),
  }
  try {
    await updateProfileV2(payload)
    await fetchUser()
    reset()
  } catch (error) {
    useAlert({ error: true, text: useErrorMsg(error) })
  }
}

const onVerify = () => {
  handVerifyOTPModal({
    active: true,
    typeSend: 'changeprofile',
  })
}

const onSubmit = () => {
  // status valule changed
  const isChanged = {
    phone: userPlayer.value?.phone !== form.phone,
    email: userPlayer.value?.email !== form.email,
    dateOfBirth: $format.dateOnly(userPlayer.value?.dateOfBirth) !== form.dateOfBirth,
  }
  // status can not change value
  const isCanNotBeChange = {
    phone: isChanged.phone && userPlayer.value?.verifyPhone,
    email: isChanged.email && userPlayer.value?.verify,
  }

  // cannot be changed email or phone
  if (isCanNotBeChange.phone || isCanNotBeChange.email) {
    const type = isCanNotBeChange.phone ? 'phone' : 'email'
    useAlert({ error: true, text: `ไม่สามารถแก้ไข${t(type)}ได้` })
    reset()
    return
  }

  onChangeProfile(isChanged)
}
</script>

<template>
  <BaseModal v-model="profileModal" :title="t('profile')" disable-click-out>
    <UForm :state="form" class="w-full space-y-4" @submit="onSubmit">
      <!-- PHONE -->
      <UFormGroup
        v-if="userPlayer?.phone"
        :label="t('phone')"
        name="phone"
        :error="errors?.phone?.message"
      >
        <BaseInput
          v-model="form.phone"
          :placeholder="t('phone')"
          input-class="!pr-[100px]"
          trailing
          :readonly="!isEdit || userPlayer?.verifyPhone || signUpSetting?.verifyWith === 'phone'"
          @update:model-value="validator.validate('phone')"
        >
          <template
            v-if="signUpSetting?.verifyWith === 'phone' && !userPlayer?.verifyPhone"
            #trailing
          >
            <p
              class="text-highlight underline text-sm cursor-pointer pointer-events-auto"
              @click="onVerify"
            >
              {{ t('verifyNow') }}
            </p>
          </template>
        </BaseInput>
        <template v-if="signUpSetting?.verifyWith === 'phone' || userPlayer?.verifyPhone" #hint>
          <BaseVerifyTag :verify="userPlayer?.verifyPhone" />
        </template>
      </UFormGroup>

      <!-- EMAIL -->
      <UFormGroup
        v-if="userPlayer?.email"
        :label="t('email')"
        name="email"
        :error="errors?.email?.message"
      >
        <BaseInput
          v-model="form.email"
          :placeholder="t('email')"
          input-class="!pr-[100px]"
          trailing
          :readonly="!isEdit || userPlayer?.verify || signUpSetting?.verifyWith === 'email'"
          @update:model-value="validator.validate('email')"
        >
          <template v-if="signUpSetting?.verifyWith === 'email' && !userPlayer?.verify" #trailing>
            <p
              class="text-highlight underline text-sm cursor-pointer pointer-events-auto"
              @click="onVerify"
            >
              {{ t('verifyNow') }}
            </p>
          </template>
        </BaseInput>
        <template v-if="signUpSetting?.verifyWith === 'email' || userPlayer?.verify" #hint>
          <BaseVerifyTag :verify="userPlayer?.verify" />
        </template>
      </UFormGroup>

      <!-- DATE OF BIRTH -->
      <UFormGroup
        v-if="userPlayer?.dateOfBirth"
        :label="t('dateOfBirth')"
        name="dateOfBirth"
        :error="errors?.dateOfBirth?.message"
      >
        <BaseInput
          v-model="form.dateOfBirth"
          placeholder="DD/MM/YYYY"
          data-maska="##/##/####"
          :readonly="!isEdit"
          @update:model-value="validator.validate('dateOfBirth')"
        />
      </UFormGroup>

      <!-- REFERAL CODE -->
      <UFormGroup v-if="useLobbySetting().enableReferCode" :label="t('referralCode')" name="code">
        <BaseInput :model-value="userPlayer?.code" :copy="userPlayer?.code" readonly />
      </UFormGroup>

      <!-- BUTTON -->
      <div v-if="isEdit" class="flex gap-4">
        <UButton :label="t('cancel')" size="sm" variant="outline" @click="isEdit = false" />
        <UButton :label="t('save')" size="sm" type="submit" />
      </div>
      <UButton v-else :label="t('editPersonalInformation')" size="sm" @click="isEdit = true" />
    </UForm>
  </BaseModal>
</template>
