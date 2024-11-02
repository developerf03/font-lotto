import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal'

export const useModals = () => {
  // store state
  const {
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
  } = storeToRefs(useModalStore())
  // store function
  const {
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
    closeAuthModal,
  }
}
