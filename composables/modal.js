import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal'

export const useModals = () => {
  // store state
  const {
    loginModal,
    registerModal,
    forgotPasswordModal,
    bankAccountModal,
    paymentModal,
    paymentDepositQaModal,
    transactionsModal,
    launcherModal,
    verifyOTPModal,
    profileModal,
    languageModal,
    promotionDetailsModal,
    promotionsModal,
  } = storeToRefs(useModalStore())
  // store function
  const {
    handleLoginModal,
    handleRegisterModal,
    handleForgotPasswordModal,
    handleBankAccountModal,
    showPaymentModal,
    showPaymentDepositQaModal,
    showTransactionsModal,
    handleLauncherModal,
    handVerifyOTPModal,
    handleProfileModal,
    handleLanguageModal,
    showPromotionDetailsModal,
  } = useModalStore()

  const closeAuthModal = () => {
    showPaymentModal(false)
    showPaymentDepositQaModal(false)
    showTransactionsModal(false)
    handleLauncherModal(false)
    handVerifyOTPModal({ active: false })
    handleProfileModal(false)
    showPromotionDetailsModal(false)
  }

  return {
    // state
    loginModal,
    registerModal,
    forgotPasswordModal,
    bankAccountModal,
    paymentModal,
    paymentDepositQaModal,
    transactionsModal,
    launcherModal,
    verifyOTPModal,
    profileModal,
    languageModal,
    promotionDetailsModal,
    promotionsModal,

    // function
    handleLoginModal,
    handleRegisterModal,
    handleForgotPasswordModal,
    handleBankAccountModal,
    showPaymentModal,
    showPaymentDepositQaModal,
    showTransactionsModal,
    handleLauncherModal,
    handVerifyOTPModal,
    handleProfileModal,
    handleLanguageModal,
    showPromotionDetailsModal,
    closeAuthModal,
  }
}
