<script setup>
// Imports
import { useDebounceFn } from '@vueuse/core'
import { dateToISOString, getReferalLink } from '~/utils/utils'

// Composables
const { userPlayer, fetchUser } = useAuth()
const { profileModal, handVerifyOTPModal } = useModals()
const { profileCheckData, updateProfileV2 } = usePlayerStore()
const signUpSetting = computed(() => useSignUpSetting())
const lobbySetting = computed(() => useLobbySetting())

// States
const form = reactive({
  playerNickname: '',
  phone: '',
  email: '',
  dateOfBirth: '',
})
const loading = reactive({
  playerNickname: false,
  phone: false,
  email: false,
  dateOfBirth: false,
  typing: false,
  changeProfile: false,
})
const errors = reactive({})
const isEdit = ref(false)

// Computeds
const referralLink = computed(() => getReferalLink(userPlayer.value?.code))
const isLoading = computed(() => !Object.values(loading).every((o) => o === false))
const validator = computed(() =>
  useValidator(form, errors).rules({
    playerNickname: Rules().required(t('pleaseEnterNickname')).custom(checkPlayerNickname),
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
  loading[field] = true
  try {
    await profileCheckData({ [field]: form?.[field] || '' })
    return ''
  } catch (error) {
    if (field === 'playerNickname') {
      return t('duplicatedNickname')
    } else {
      return useErrorMsg({ error })
    }
  } finally {
    setTimeout(() => {
      loading[field] = false
    }, 200)
  }
}

const debounceTyped = useDebounceFn(() => (loading.typing = false), 300)
const checkPhone = useDebounceFn(() => handleCheckData('phone'), 200)
const checkEmail = useDebounceFn(() => handleCheckData('email'), 200)
const checkPlayerNickname = useDebounceFn(() => handleCheckData('playerNickname'), 200)

const onInput = async (field) => {
  loading.typing = true
  await validator.value.validate(field)
  debounceTyped()
}

const reset = () => {
  isEdit.value = false
  form.playerNickname = userPlayer.value?.playerNickname || ''
  form.phone = userPlayer.value?.phone || ''
  form.email = userPlayer.value?.email || ''
  form.dateOfBirth = $format.dateOnly(userPlayer.value?.dateOfBirth) || ''
  validator.value.clear()
}

const onChangeProfile = async (isChanged) => {
  if (validator.value.checkHaveErrors()) return
  loading.changeProfile = true
  const payload = {
    ...(isChanged.playerNickname && { nickname: form.playerNickname }),
    ...(isChanged.phone && { phone: form.phone }),
    ...(isChanged.email && { email: form.email }),
    ...(isChanged.dateOfBirth && { dateOfBirth: dateToISOString(form.dateOfBirth) }),
  }
  try {
    useAlert({ success: true, title: t('profileUpdateSuccessful') })
    await updateProfileV2(payload)
    await fetchUser()
    reset()
  } catch (error) {
    useAlert({ error: true, text: useErrorMsg(error) })
  } finally {
    loading.changeProfile = false
  }
}

const onCancelEdit = () => {
  isEdit.value = false
  reset()
}

const onVerify = (type) => {
  handVerifyOTPModal({
    active: true,
    typeSend: 'changeprofile',
    type,
    cb: reset,
  })
}

const onSubmit = async () => {
  if (isLoading.value) return

  // status valule changed
  const isChanged = {
    playerNickname: userPlayer.value?.playerNickname !== form.playerNickname,
    phone: userPlayer.value?.phone !== form.phone,
    email: userPlayer.value?.email !== form.email,
    dateOfBirth: $format.dateOnly(userPlayer.value?.dateOfBirth) !== form.dateOfBirth,
  }
  // status can not change value
  const isCanNotBeChange = {
    phone: isChanged.phone && userPlayer.value?.verifyPhone,
    email: isChanged.email && userPlayer.value?.verify,
  }

  if (isChanged.playerNickname) await validator.value.validate('playerNickname')
  if (isChanged.phone) await validator.value.validate('phone')
  if (isChanged.email) await validator.value.validate('email')
  if (isChanged.dateOfBirth) await validator.value.validate('dateOfBirth')

  // cannot be changed email or phone
  if (isCanNotBeChange.phone || isCanNotBeChange.email) {
    const type = isCanNotBeChange.phone ? 'phone' : 'email'
    useAlert({ error: true, text: t('cannotEdit', { type }) })
    reset()
    return
  }

  onChangeProfile(isChanged)
}
</script>

<template>
  <BaseModal v-model="profileModal" :title="t('profile')" disable-click-out>
    <UForm :state="form" class="w-full space-y-4" @submit="onSubmit">
      <!-- PLAYER USER NICKNAME -->
      <UFormGroup
        :label="t('nickname')"
        name="playerNickname"
        :error="errors?.playerNickname?.message"
      >
        <BaseInput
          v-model="form.playerNickname"
          :placeholder="t('nickname')"
          input-class="!pr-[100px]"
          trailing
          :readonly="!isEdit"
          @update:model-value="onInput('playerNickname')"
        />
      </UFormGroup>

      <!-- PLAYER USER NAME -->
      <UFormGroup :label="t('username')" name="playerUsername">
        <BaseInput
          :model-value="userPlayer?.playerUsername"
          :copy="userPlayer?.playerUsername"
          readonly
        />
      </UFormGroup>

      <!-- PHONE -->
      <UFormGroup
        v-if="userPlayer?.phone || signUpSetting?.verifyWith === 'phone'"
        :label="t('phone')"
        name="phone"
        :error="errors?.phone?.message"
      >
        <BaseInput
          v-model="form.phone"
          :placeholder="userPlayer?.phone ? t('phone') : '-'"
          :input-class="
            signUpSetting?.verifyWith === 'phone' && !userPlayer?.verifyPhone ? '!pr-[100px]' : ''
          "
          trailing
          :readonly="!isEdit || userPlayer?.verifyPhone || signUpSetting?.verifyWith === 'phone'"
          @update:model-value="onInput('phone')"
        >
          <template
            v-if="signUpSetting?.verifyWith === 'phone' && !userPlayer?.verifyPhone"
            #trailing
          >
            <p
              class="text-highlight underline text-sm cursor-pointer pointer-events-auto"
              @click="onVerify('editPhone')"
            >
              {{ userPlayer?.phone ? t('verifyNow') : t('addAPhoneNumber') }}
            </p>
          </template>
        </BaseInput>
        <template v-if="signUpSetting?.verifyWith === 'phone' || userPlayer?.verifyPhone" #hint>
          <BaseVerifyTag :verify="userPlayer?.verifyPhone" />
        </template>
      </UFormGroup>

      <!-- EMAIL -->
      <UFormGroup
        v-if="userPlayer?.email || signUpSetting?.verifyWith === 'email'"
        :label="t('email')"
        name="email"
        :error="errors?.email?.message"
      >
        <BaseInput
          v-model="form.email"
          :placeholder="userPlayer?.email ? t('email') : '-'"
          :input-class="
            signUpSetting?.verifyWith === 'email' && !userPlayer?.verify ? '!pr-[100px]' : ''
          "
          trailing
          :readonly="!isEdit || userPlayer?.verify || signUpSetting?.verifyWith === 'email'"
          @update:model-value="onInput('email')"
        >
          <template v-if="signUpSetting?.verifyWith === 'email' && !userPlayer?.verify" #trailing>
            <p
              class="text-highlight underline text-sm cursor-pointer pointer-events-auto"
              @click="onVerify('editEmail')"
            >
              {{ userPlayer?.email ? t('verifyNow') : t('addAnEmail') }}
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
          :readonly="!isEdit || !lobbySetting?.setting?.value?.profileSetting?.editDateOfBirth"
          @update:model-value="onInput('dateOfBirth')"
        />
      </UFormGroup>

      <!-- REFERAL CODE -->
      <UFormGroup v-if="lobbySetting?.enableReferCode" :label="t('referralCode')" name="code">
        <BaseInput :model-value="userPlayer?.code" :copy="referralLink" readonly />
      </UFormGroup>
      <!-- BUTTON -->
      <div v-if="isEdit" class="flex gap-4">
        <UButton :label="t('cancel')" size="sm" variant="outline" @click="onCancelEdit" />
        <UButton :label="t('save')" size="sm" type="submit" :loading="isLoading" />
      </div>
      <UButton v-else :label="t('editPersonalInformation')" size="sm" @click="isEdit = true" />
    </UForm>
  </BaseModal>
</template>
