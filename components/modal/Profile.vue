<script setup>
// Imports
import { useDebounceFn } from '@vueuse/core'

// Composables
const { user } = useAuth()
const { profileModal } = useModals()
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
    dateOfBirth: Rules().required(t('validation.pleaseEnterDateOfBirth')),
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
  }),
)

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

const onOpenModal = () => {
  const profile = user.value?.player
  form.phone = profile?.phone || ''
  form.email = profile?.email || ''
  form.dateOfBirth = profile?.dateOfBirth || ''
}

const onSubmit = () => {
  console.log('submit')
}
</script>

<template>
  <BaseModal v-model="profileModal" title="โปรไฟล์" disable-click-out @opened="onOpenModal">
    <div class="w-full flex flex-col gap-4 lg:gap-5">
      <UForm :state="form" class="space-y-4" @submit="onSubmit">
        <!-- PHONE -->
        <UFormGroup label="เบอร์โทร" name="phone" :error="errors?.phone?.message">
          <BaseInput
            v-model="form.phone"
            placeholder="เบอร์โทร"
            input-class="!pr-[140px]"
            trailing
            :readonly="!isEdit"
            @update:model-value="validator.validate('phone')"
          >
            <template #trailing>
              <BaseVerifyTag :verify="signUpSetting?.isVerify" />
            </template>
          </BaseInput>
        </UFormGroup>
        <!-- EMAIL -->
        <UFormGroup label="อีเมล" name="email">
          <BaseInput
            v-model="form.email"
            placeholder="อีเมล"
            input-class="!pr-[140px]"
            trailing
            :readonly="!isEdit"
            @update:model-value="validator.validate('email')"
          >
            <template #trailing>
              <BaseVerifyTag :verify="signUpSetting?.isVerify" />
            </template>
          </BaseInput>
        </UFormGroup>
        <!-- DATE OF BIRTH -->
        <UFormGroup label="วันเกิด" name="dateOfBirth">
          <BaseInput v-model="form.dateOfBirth" placeholder="วันเกิด" :readonly="!isEdit" />
        </UFormGroup>
        <!-- REFERAL CODE -->
        <div class="flex flex-col gap-[2px]">
          <p class="text-sm">รหัสชวนเพื่อน</p>
          <BaseInput :model-value="user?.player?.code" :copy="user?.player?.code" readonly />
        </div>
        <!-- BUTTON -->
        <div v-if="isEdit" class="flex gap-4">
          <UButton label="ไว้ทีหลัง" size="sm" variant="outline" @click="isEdit = false" />
          <UButton label="บันทึก" size="sm" type="submit" />
        </div>
        <UButton v-else label="แก้ไขข้อมูลส่วนตัว" size="sm" @click="isEdit = true" />
      </UForm>
    </div>
  </BaseModal>
</template>
