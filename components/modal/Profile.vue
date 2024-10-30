<script setup>
// Imports
import { useDebounceFn } from '@vueuse/core'
import { dateToISOString } from '~/utils/utils'

// Composables
const { userPlayer } = useAuth()
const { profileModal, handVerifyOTPModal } = useModals()
const { profileCheckData } = usePlayerStore()
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

const onChangeProfile = (isChanged) => {
  // const payload = {
  //   ...(isChanged.phone && { phone: form.phone }),
  //   ...(isChanged.email && { email: form.email }),
  //   ...(isChanged.dateOfBirth && { dateOfBirth: form.dateOfBirth }),
  // }
  console.log('change profile')
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

  // status can not change value
  const isCanbeChange = {
    phone:
      signUpSetting.value?.verifyWith === 'email' && isChanged.email && !userPlayer.value?.verify,
    email:
      signUpSetting.value?.verifyWith === 'phone' &&
      isChanged.phone &&
      !userPlayer.value?.verifyPhone,
  }

  // cannot be changed email or phone
  if (isCanNotBeChange.phone || isCanNotBeChange.email) {
    const type = isCanNotBeChange.phone ? 'phone' : 'email'
    useAlert({ error: true, text: `ไม่สามารถแก้ไข${t(type)}ได้` })
    reset()
    return
  }

  // can be changed email or phone
  if (isCanbeChange.phone || isCanbeChange.email) {
    const type = isCanNotBeChange.phone ? 'phone' : 'email'
    handVerifyOTPModal({
      active: true,
      typeSend: 'changeProfile',
      ...(type === 'phone'
        ? { phoneNumber: form.phone, callingCode: '+66' }
        : { email: form.email }),
      cb: () => onChangeProfile(isChanged),
    })
    return
  }

  onChangeProfile(isChanged)
}
</script>

<template>
  <BaseModal v-model="profileModal" title="โปรไฟล์" disable-click-out>
    <UForm :state="form" class="w-full space-y-4" @submit="onSubmit">
      <!-- PHONE -->
      <UFormGroup
        v-if="userPlayer?.phone"
        label="เบอร์โทร"
        name="phone"
        :error="errors?.phone?.message"
      >
        <BaseInput
          v-model="form.phone"
          placeholder="เบอร์โทร"
          input-class="!pr-[140px]"
          trailing
          :readonly="!isEdit || userPlayer?.verifyPhone"
          @update:model-value="validator.validate('phone')"
        >
          <template
            v-if="signUpSetting?.verifyWith === 'phone' || userPlayer?.verifyPhone"
            #trailing
          >
            <BaseVerifyTag :verify="userPlayer?.verifyPhone" />
          </template>
        </BaseInput>
      </UFormGroup>

      <!-- EMAIL -->
      <UFormGroup
        v-if="userPlayer?.email"
        label="อีเมล"
        name="email"
        :error="errors?.email?.message"
      >
        <BaseInput
          v-model="form.email"
          placeholder="อีเมล"
          input-class="!pr-[140px]"
          trailing
          :readonly="!isEdit || userPlayer?.verify"
          @update:model-value="validator.validate('email')"
        >
          <template v-if="signUpSetting?.verifyWith === 'email' || userPlayer?.verify" #trailing>
            <BaseVerifyTag :verify="userPlayer?.verify" />
          </template>
        </BaseInput>
      </UFormGroup>

      <!-- DATE OF BIRTH -->
      <UFormGroup
        v-if="userPlayer?.dateOfBirth"
        label="วันเกิด"
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
      <UFormGroup v-if="useLobbySetting().enableReferCode" label="รหัสชวนเพื่อน" name="code">
        <BaseInput :model-value="userPlayer?.code" :copy="userPlayer?.code" readonly />
      </UFormGroup>

      <!-- BUTTON -->
      <div v-if="isEdit" class="flex gap-4">
        <UButton label="ไว้ทีหลัง" size="sm" variant="outline" @click="isEdit = false" />
        <UButton label="บันทึก" size="sm" type="submit" />
      </div>
      <UButton v-else label="แก้ไขข้อมูลส่วนตัว" size="sm" @click="isEdit = true" />
    </UForm>
  </BaseModal>
</template>
