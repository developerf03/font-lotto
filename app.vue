<script setup>
// Imports
import paymentModal from '~/components/modal/Payment.vue'
import paymentDepositModal from '~/components/modal/PaymentDeposit.vue'
import transactionsAllModal from '~/components/modal/Transactions.vue'
import VerifyOtpModal from '~/components/modal/VerifyOtp.vue'
import LanguageModal from '~/components/modal/Language.vue'
import LoginModal from '~/components/modal/Login.vue'
import RegisterModal from '~/components/modal/Register.vue'
import LauncherModal from '~/components/modal/Launcher.vue'
import ForgotPasswordModal from '~/components/modal/ForgotPassword.vue'
import ProfileModal from '~/components/modal/Profile.vue'
import PromotionDetailsModal from '~/components/modal/PromotionDetails.vue'
import BankAccountSubMenu from '~/components/modal/BankAccountSubMenu.vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/bundle'
import 'vue3-toastify/dist/index.css'

// Composables
const theme = useCookie('themeMode')
const themeColor = useCookie('themeColor')
const { locale } = useI18n()

useInitAppSSR()

onMounted(() => {
  useInitApp()
})
</script>

<template>
  <Html :class="[theme || 'dark-theme', themeColor || 'blue']" :lang="locale">
    <Body>
      <NuxtLayout>
        <NuxtPage />

        <!-- MODAL -->
        <paymentModal />
        <paymentDepositModal />
        <transactionsAllModal />
        <LoginModal />
        <RegisterModal />
        <ForgotPasswordModal />
        <BaseAlert />
        <LauncherModal />
        <VerifyOtpModal />
        <ProfileModal />
        <BankAccountSubMenu />
        <LanguageModal />
        <PromotionDetailsModal />
        <BaseLoadingPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
