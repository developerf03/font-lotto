import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const loginModal = ref(false)
  const registerModal = ref(false)
  const forgotPasswordModal = ref(false)
  const profileModal = ref(false)
  const languageModal = ref(false)
  const promotionDetailsModal = reactive({
    active: false,
    item: null,
  })
  const paymentModal = reactive({
    active: false,
    tab: '',
    code: null,
  })
  const paymentDepositQaModal = reactive({
    active: false,
    qa: false,
    item: null,
  })
  const transactionsModal = reactive({
    active: false,
    tab: '',
  })
  const launcherModal = reactive({
    open: false,
    url: '',
  })

  const verifyOTPModal = reactive({
    active: false,
    type: '', // editPhone, editEmail, verifyPhone, verifyEmail
    typeSend: '', // register, forgotpassword, changeprofile, withdraw, firsttimedeposit
    callingCode: '',
    phoneNumber: '',
    email: '',
    cb: null,
  })

  // function
  const showPaymentModal = (isOpen, tab, code) => {
    paymentModal.active = isOpen
    paymentModal.tab = tab
    paymentModal.code = code
  }

  const showPaymentDepositQaModal = (isOpen, qa, item) => {
    paymentDepositQaModal.active = isOpen
    paymentDepositQaModal.qa = qa
    paymentDepositQaModal.item = item
  }

  const showTransactionsModal = (isOpen, tab) => {
    transactionsModal.active = isOpen
    transactionsModal.tab = tab
  }

  const showPromotionDetailsModal = (isOpen, item) => {
    promotionDetailsModal.active = isOpen
    promotionDetailsModal.item = item
  }

  const handleLoginModal = (isOpen) => {
    loginModal.value = isOpen
  }

  const handleRegisterModal = (isOpen) => {
    registerModal.value = isOpen
  }

  const handleLauncherModal = (isOpen, url) => {
    launcherModal.open = !!isOpen && !!url
    launcherModal.url = url || ''
  }

  const handleForgotPasswordModal = (val) => {
    forgotPasswordModal.value = val
  }

  const handleProfileModal = (val) => {
    profileModal.value = val
  }

  const handleLanguageModal = (val) => {
    languageModal.value = val
  }

  const handVerifyOTPModal = ({
    active,
    type,
    typeSend,
    callingCode,
    phoneNumber,
    email,
    cb,
  } = {}) => {
    verifyOTPModal.active = active
    verifyOTPModal.type = type
    verifyOTPModal.typeSend = typeSend
    verifyOTPModal.callingCode = callingCode
    verifyOTPModal.phoneNumber = phoneNumber
    verifyOTPModal.email = email
    verifyOTPModal.cb = cb
  }

  return {
    // state
    loginModal,
    registerModal,
    forgotPasswordModal,
    paymentModal,
    paymentDepositQaModal,
    transactionsModal,
    launcherModal,
    verifyOTPModal,
    profileModal,
    languageModal,
    promotionDetailsModal,
    // function
    handleLoginModal,
    handleRegisterModal,
    handleForgotPasswordModal,
    showPaymentModal,
    showPaymentDepositQaModal,
    showTransactionsModal,
    handleLauncherModal,
    handVerifyOTPModal,
    handleProfileModal,
    handleLanguageModal,
    showPromotionDetailsModal,
  }
})
