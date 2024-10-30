<script setup>
import modalPayment from '~/components/modal/Payment.vue'
import paymentDepositModal from '~/components/modal/PaymentDeposit.vue'

// State
const modal = reactive({
  default: false,
  fullscreen: false,
  clickOutSide: false,
  title: false,
})
const dataCreateDeposit = ref({
  account: '091-234-5678',
  bankType: 'ธนาคาร ไทยพาณิชย์ จำกัด (มหาชน)',
  bankShortName: 'SCB',
  accountName: 'นาย จารย์เบียร์ คนตื่นธรรม',
  amount: 100.02,
  promptpayCode: '9d9d98ucji8chddi99s9s99s',
})

// INPUT
const input = reactive({
  value: '',
})

// INPUT OTP
const inputOtp = reactive({
  value: '',
})

// FORM
const form = reactive({
  form: {
    email: '',
    password: '',
    country: '',
  },
  onSubmit: () => {
    console.log('submit')
  },
})
const paymentDepositModalState = useState('paymentDepositModal', () => false)
const paymentModal = useState('paymentModal', () => false)
const { handleRegisterModal } = useModals()
// function
const onSubmit = (key) => {
  switch (key) {
    case 'default':
      modal.default = false
      break
    case 'fullscreen':
      modal.fullscreen = false
      break
    case 'clickOutSide':
      modal.clickOutSide = false
      break
    case 'title':
      modal.title = false
      break
    default:
      break
  }
}

const onModal = (key) => {
  switch (key) {
    case 'default':
      modal.default = true
      break
    case 'fullscreen':
      modal.fullscreen = true
      break
    case 'clickOutSide':
      modal.clickOutSide = true
      break
    case 'title':
      modal.title = true
      break
    default:
      break
  }
}

const alertModal = (type, t) => {
  const response = {
    success: { success: true, title: t },
    error: { error: true, title: t },
    warning: { warning: true, title: t },
    info: { info: true, title: t },
    copy: { copy: true, title: t },
    logo: { logo: true, title: 'Login Success!' },
  }
  useAlert({
    ...response[type],
    autoHide: true,
  })
}

const handleOpenAlert = (type) => {
  const response = {
    success: { success: true, title: 'Success!', text: 'Login is successfully' },
    error: { error: true, title: 'Error!', text: 'Username or password is incorrect' },
    warning: { warning: true, title: 'Warning!', text: 'Please enter your email' },
    info: { info: true, title: 'Infomation!', text: 'Please login before process' },
    copy: { copy: true, title: 'copy Success!', text: 'Login is successfully' },
    'internet-on': {
      wifi: true,
      title: '',
      text: 'เชื่อมต่ออินเตอร์เน็ตแล้ว',
      confirmButtonText: '',
    },
    'internet-off': {
      noWifi: true,
      title: '',
      text: 'อินเตอร์เน็ตของคุณไม่เสถียร',
      confirmButtonText: '',
    },
  }
  useAlert({
    confirmButtonText: 'Ok',
    ...response[type],
  })
}

const handleOpenConfirmDialog = () => {
  useAlert({
    confirmButtonText: 'Ok',
    cancelButtonText: 'Cancel',
    title: 'แจ้งเตือน',
    text: 'Are are sure to delete?',
    confirmCallback: () => {
      useAlert({
        success: true,
        title: 'Success!',
        autoHide: true,
      })
    },
    cancelCallback: () => {
      useAlert({
        error: true,
        title: 'Error!',
        autoHide: true,
      })
    },
  })
}
</script>

<template>
  <div class="ui-wrapper bg-[var(--card-primary)] min-h-screen p-6 flex flex-col gap-10">
    <!-- INPUT -->
    <div
      class="flex flex-col border-[1px] overflow-hidden border-solid rounded-lg border-black text-primary"
    >
      <!-- title -->
      <h1
        class="py-2 card-secondary text-center font-bold border-b border-black text-primary card-secondary"
      >
        INPUT
      </h1>
      <!-- content -->
      <div class="p-6">
        <p class="text-center font-bold text-primary">Default</p>
        <BaseInput v-model="input.value" placeholder="placeholder" />
      </div>
      <div class="p-6">
        <p class="text-center font-bold text-primary">Disabled</p>
        <BaseInput v-model="input.value" placeholder="placeholder" disabled />
      </div>
      <div class="p-6">
        <p class="text-center font-bold text-primary">TYPE : currency</p>
        <BaseInput v-model="input.value" placeholder="input currency" type="currency" />
        <p class="text-center font-bold text-primary">TYPE : number</p>
        <BaseInput v-model="input.value" placeholder="input number" type="number" />
        <p class="text-center font-bold text-primary">TYPE : tel</p>
        <BaseInput v-model="input.value" placeholder="input tel" type="tel" />
      </div>
    </div>

    <!-- INPUT -->
    <div
      class="flex flex-col border-[1px] overflow-hidden border-solid rounded-lg border-black text-primary"
    >
      <!-- title -->
      <h1
        class="py-2 card-secondary text-center font-bold border-b border-black text-primary card-secondary"
      >
        SELECT
      </h1>
      <!-- content -->
      <div class="p-6">
        <p class="text-center font-bold text-primary">Default</p>
        <USelectMenu placeholder="placeholder" />
      </div>
      <div class="p-6">
        <p class="text-center font-bold text-primary">Disabled</p>
        <USelectMenu placeholder="placeholder" disabled />
      </div>
    </div>

    <!-- INPUT OTP -->
    <div
      class="flex flex-col border-[1px] overflow-hidden border-solid rounded-lg border-black text-primary"
    >
      <!-- title -->
      <h1
        class="py-2 card-secondary text-center font-bold border-b border-black text-primary card-secondary"
      >
        INPUT OTP
      </h1>
      <!-- content -->
      <div class="p-6">
        <p class="text-center font-bold text-primary">Error</p>
        <BaseInputOtp v-model="inputOtp.value" error="OTP ไม่ถูกต้อง" />
      </div>

      <div class="p-6">
        <p class="text-center font-bold text-primary">Default</p>
        <BaseInputOtp v-model="inputOtp.value" />
      </div>
    </div>

    <!-- FORM -->
    <div
      class="flex flex-col border-[1px] overflow-hidden border-solid rounded-lg border-black text-primary"
    >
      <!-- title -->
      <h1 class="py-2 card-secondary text-center font-bold border-b border-black text-primary">
        FORM
      </h1>
      <!-- content -->
      <div class="p-6">
        <UForm class="space-y-4" @submit="form.onSubmit">
          <UFormGroup label="Email" name="email" required>
            <BaseInput v-model="form.form.email" placeholder="email" />
          </UFormGroup>
          <UFormGroup label="Password" name="password">
            <BaseInput v-model="form.form.password" type="password" placeholder="password" />
          </UFormGroup>
          <UFormGroup label="Country" name="country">
            <USelectMenu v-model="form.form.country" placeholder="country" />
          </UFormGroup>
          <UFormGroup label="Password" name="password">
            <BaseInput
              v-model="form.form.password"
              type="password"
              placeholder="password"
              disabled
            />
          </UFormGroup>
          <UFormGroup label="Country" name="country">
            <USelectMenu v-model="form.form.country" placeholder="country" disabled />
          </UFormGroup>
          <UButton type="submit"> Submit </UButton>
        </UForm>
      </div>
    </div>

    <!-- Button -->
    <div
      class="flex flex-col border-[1px] overflow-hidden border-solid rounded-lg border-black text-primary"
    >
      <!-- title -->
      <h1 class="py-2 card-secondary text-center font-bold border-b border-black text-primary">
        BUTTON
      </h1>
      <!-- content -->
      <div class="p-6">
        <h1 class="py-2 card-secondary text-center text-primary font-bold">BUTTON PRIMARY</h1>
        <div class="flex justify-center">
          <!-- <Button text="สมัครสมาชิก" />
          <Button text="สมัครสมาชิก" disabled /> -->
          <UButton class="w-full" :ui="{ rounded: 'rounded-full' }" size="md" variant="solid">
            <UIcon name="i-carbon-warning" class="w-5 h-5" />
            <p>สมัครสมาชิก</p>
            <UIcon name="i-carbon-warning" class="w-5 h-5" />
          </UButton>
          <UButton
            class="w-full"
            :ui="{ rounded: 'rounded-full' }"
            size="md"
            variant="solid"
            disabled
          >
            <UIcon name="i-carbon-warning" class="w-5 h-5" /> สมัครสมาชิก
            <UIcon name="i-carbon-warning" class="w-5 h-5" />
          </UButton>
        </div>
      </div>
      <div class="p-6">
        <h1 class="py-2 card-secondary text-center text-primary font-bold">BUTTON SECONDARY</h1>
        <div class="flex justify-center">
          <UButton class="w-full" :ui="{ rounded: 'rounded-full' }" size="md" variant="outline">
            <p class="text-secondary flex justify-center">
              <UIcon name="i-carbon-warning" class="w-7 h-5" />สมัครสมาชิก
              <UIcon name="i-carbon-warning" class="w-7 h-5" />
            </p>
          </UButton>
          <UButton
            class="w-full"
            :ui="{ rounded: 'rounded-full' }"
            size="md"
            variant="outline"
            disabled
          >
            <p class="text-secondary-disable flex justify-center">
              <UIcon name="i-carbon-warning" class="w-7 h-5" />สมัครสมาชิก
              <UIcon name="i-carbon-warning" class="w-7 h-5" />
            </p>
          </UButton>
        </div>
      </div>
      <div class="p-6">
        <h1 class="py-2 card-secondary text-center text-primary font-bold">BUTTON TERTIARY</h1>
        <div class="flex justify-center">
          <UButton class="w-full" :ui="{ rounded: 'rounded-full' }" size="md" variant="tertiary">
            <UIcon name="i-carbon-warning" class="w-7 h-5" />สมัครสมาชิก
            <UIcon name="i-carbon-warning" class="w-7 h-5" />
          </UButton>
          <UButton
            class="w-full"
            :ui="{ rounded: 'rounded-full' }"
            size="md"
            variant="tertiary"
            disabled
          >
            <UIcon name="i-carbon-warning" class="w-7 h-5" />สมัครสมาชิก
            <UIcon name="i-carbon-warning" class="w-7 h-5" />
          </UButton>
        </div>
      </div>
      <div class="p-6">
        <h1 class="py-2 card-secondary text-center text-primary font-bold">BUTTON SIZE</h1>
        <div class="flex justify-center">
          <UButton class="w-full" :ui="{ rounded: 'rounded-full' }" size="sm" variant="solid">
            <UIcon name="i-carbon-warning" class="w-7 h-5" />SMALL
            <UIcon name="i-carbon-warning" class="w-7 h-5" />
          </UButton>
          <UButton
            class="w-full"
            :ui="{ rounded: 'rounded-full' }"
            size="sm"
            variant="solid"
            disabled
          >
            <UIcon name="i-carbon-warning" class="w-7 h-5" />SMALL
            <UIcon name="i-carbon-warning" class="w-7 h-5" />
          </UButton>
          <UButton class="w-full" :ui="{ rounded: 'rounded-full' }" size="md" variant="solid">
            <UIcon name="i-carbon-warning" class="w-7 h-5" />MEDIUM
            <UIcon name="i-carbon-warning" class="w-7 h-5" />
          </UButton>
          <UButton
            class="w-full"
            :ui="{ rounded: 'rounded-full' }"
            size="md"
            variant="solid"
            disabled
          >
            <UIcon name="i-carbon-warning" class="w-7 h-5" />MEDIUM
            <UIcon name="i-carbon-warning" class="w-7 h-5" />
          </UButton>
        </div>
        <div class="flex justify-center p-3">
          <UButton class="w-full" :ui="{ rounded: 'rounded-full' }" size="lg" variant="solid">
            <UIcon name="i-carbon-warning" class="w-7 h-5" />LARGE
            <UIcon name="i-carbon-warning" class="w-7 h-5" />
          </UButton>
          <UButton
            class="w-full"
            :ui="{ rounded: 'rounded-full' }"
            size="lg"
            variant="solid"
            disabled
          >
            <UIcon name="i-carbon-warning" class="w-7 h-5" />LARGE
            <UIcon name="i-carbon-warning" class="w-7 h-5" />
          </UButton>
          <UButton class="w-full" :ui="{ rounded: 'rounded-full' }" size="xl" variant="solid">
            <UIcon name="i-carbon-warning" class="w-7 h-5" />EXTRA LARGE
            <UIcon name="i-carbon-warning" class="w-7 h-5" />
          </UButton>
          <UButton
            class="w-full"
            :ui="{ rounded: 'rounded-full' }"
            size="xl"
            variant="solid"
            disabled
          >
            <UIcon name="i-carbon-warning" class="w-7 h-5" />EXTRA LARGE
            <UIcon name="i-carbon-warning" class="w-7 h-5" />
          </UButton>
        </div>
      </div>
    </div>

    <!-- CARD LOTTO -->
    <div class="flex flex-col border-[1px] border-solid rounded-lg border-black text-primary">
      <!-- title -->
      <h1 class="py-2 text-center font-bold border-b border-black text-primary">CARD LOTTO</h1>
      <!-- content -->
      <div class="p-6">
        <BaseCardLotto class="" />
      </div>
    </div>

    <!-- Modal -->
    <div
      class="flex flex-col border-[1px] overflow-hidden border-solid rounded-lg border-black text-primary"
    >
      <!-- title -->
      <h1 class="py-2 card-secondary text-center font-bold border-b border-black text-primary">
        Modal
      </h1>
      <!-- content -->
      <div class="p-6 flex justify-center items-center flex-wrap gap-4">
        <UButton
          class="w-full"
          :ui="{ rounded: 'rounded-full' }"
          variant="solid"
          @click="onModal('default')"
        >
          Modal Default
        </UButton>
        <UButton
          class="w-full"
          :ui="{ rounded: 'rounded-full' }"
          variant="solid"
          @click="onModal('fullscreen')"
        >
          Modal Fullscreen
        </UButton>

        <UButton
          class="w-full"
          :ui="{ rounded: 'rounded-full' }"
          variant="solid"
          @click="onModal('clickOutSide')"
        >
          Modal clickOutSide
        </UButton>

        <UButton
          class="w-full"
          :ui="{ rounded: 'rounded-full' }"
          variant="solid"
          @click="onModal('title')"
        >
          Modal Title
        </UButton>
      </div>
      <!-- Modal -->
      <baseModal
        id="modal-default"
        v-model="modal.default"
        title="Modal Default"
        :disable-click-out="false"
        @submit="onSubmit('default')"
      >
        <div class="body-default text-xl">body default</div>
      </baseModal>
      <!-- clickOutSide -->
      <baseModal
        id="modal-clickOutSide"
        v-model="modal.clickOutSide"
        title="Modal Default"
        :disable-click-out="true"
      >
        <div class="body-clickOutSide text-xl">body clickOutSide</div>
      </baseModal>
      <!-- fullscreen -->
      <baseModal
        id="modal-fullscreen"
        v-model="modal.fullscreen"
        title="Modal Fullscreen"
        :disable-click-out="false"
        :fullscreen="true"
      >
        <div class="body-default text-xl">body fullscreen</div>
      </baseModal>
      <!-- Modal title -->
      <baseModal
        id="modal-title"
        v-model="modal.title"
        :disable-click-out="false"
        @submit="onSubmit('title')"
      >
        <div class="body-default text-xl">body title</div>
      </baseModal>
    </div>

    <!-- CARD Bank Account -->
    <div
      class="flex flex-col border-[1px] overflow-hidden border-solid rounded-lg border-black text-primary"
    >
      <!-- title -->
      <h1 class="py-2 card-secondary text-center font-bold border-b border-black text-primary">
        CARD Bank Account
      </h1>
      <!-- content -->
      <div class="p-6 flex flex-col justify-center items-center w-full gap-4">
        <BaseBankAccount
          :account="dataCreateDeposit?.account"
          :bank-type="dataCreateDeposit?.bankType"
          :account-name="dataCreateDeposit?.accountName"
        />
        <BaseBankAccount
          btn-copy
          :account="dataCreateDeposit?.account"
          :bank-type="dataCreateDeposit?.bankType"
          :account-name="dataCreateDeposit?.accountName"
        />
      </div>
    </div>

    <!-- CARD LOGO -->
    <div
      class="flex flex-col border-[1px] overflow-hidden border-solid rounded-lg border-black text-primary"
    >
      <!-- title -->
      <h1 class="py-2 card-secondary text-center text-primary font-bold border-b border-black">
        CARD LOGO
      </h1>
      <!-- content -->
      <div class="p-6 flex flex-col justify-center items-center w-full gap-4">
        <BaseLogo />
      </div>
    </div>

    <!-- CARD Payment -->
    <div
      class="flex flex-col border-[1px] overflow-hidden border-solid rounded-lg border-black text-primary"
    >
      <!-- title -->
      <h1 class="py-2 card-secondary text-center text-primary font-bold border-b border-black">
        HEAD CARD Payment
      </h1>
      <!-- content -->
      <div class="p-6 flex flex-col justify-center items-center w-full gap-4">
        <BaseButtonTest
          label="Payment Deposit Modal"
          variant="solid"
          rounded="rounded-full"
          @submit="paymentDepositModalState = true"
        />
        <pre>paymentDepositModalState> {{ paymentDepositModalState }}</pre>
        <BaseButtonTest
          label="payment Modal"
          variant="solid"
          rounded="rounded-full"
          @submit="paymentModal = true"
        />
        <pre>paymentModal =>{{ paymentModal }}</pre>
        <modal-payment />
      </div>
    </div>
    <payment-deposit-modal />

    <!-- CARD Register -->
    <div
      class="flex flex-col border-[1px] overflow-hidden border-solid rounded-lg border-black text-primary"
    >
      <!-- title -->
      <h1 class="py-2 card-secondary text-center text-primary font-bold border-b border-black">
        CARD REGISTER
      </h1>
      <!-- content -->
      <div class="p-6 flex flex-col justify-center items-center w-full gap-4">
        <UButton
          label="สมัครสมาชิก"
          variant="solid"
          :ui="{ rounded: 'rounded-full' }"
          @click="handleRegisterModal(true)"
        />
      </div>
    </div>

    <!-- use Alert Modal -->
    <div
      class="flex flex-col border-[1px] overflow-hidden border-solid rounded-lg border-black text-primary"
    >
      <!-- title -->
      <h1 class="py-2 card-secondary text-center text-primary font-bold border-b border-black">
        Alert Modal
      </h1>
      <!-- content -->
      <div class="p-6 flex justify-center items-center flex-wrap gap-4">
        <div class="flex justify-center items-center gap-2">
          <UButton variant="solid" @click="alertModal('logo', 'Login สำเร็จ')">
            Alert Logo
          </UButton>
          <UButton variant="solid" @click="alertModal('copy', t('copySuccess'))">
            Alert Copy
          </UButton>
          <UButton variant="solid" @click="alertModal('success', t('success'))">
            Alert Success
          </UButton>
          <UButton variant="solid" @click="alertModal('error', t('error'))"> Alert Error </UButton>
        </div>
        <div class="flex justify-center items-center gap-2">
          <UButton variant="solid" @click="handleOpenAlert('copy')"> Alert Copy </UButton>
          <UButton variant="solid" @click="handleOpenAlert('success')"> Alert Success </UButton>
          <UButton variant="solid" @click="handleOpenAlert('error')"> Alert Error </UButton>
          <UButton variant="solid" @click="handleOpenAlert('warning')"> Alert Warning </UButton>
          <UButton variant="solid" @click="handleOpenAlert('info')"> Alert Info </UButton>
          <UButton variant="solid" @click="handleOpenAlert('internet-on')">
            Internet Connected Alert
          </UButton>
          <UButton variant="solid" @click="handleOpenAlert('internet-off')">
            Internet Unstable Alert
          </UButton>
          <UButton variant="solid" @click="handleOpenConfirmDialog"> Confirm Dialog </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
