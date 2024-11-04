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
import PromotionsModal from '~/components/modal/Promotions.vue'
import PromotionDetailsModal from '~/components/modal/PromotionDetails.vue'
import BankAccountSubMenu from '~/components/modal/BankAccountSubMenu.vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/bundle'

// Composables
const theme = useCookie('theme')
const { locale } = useI18n()

useInitAppSSR()

onMounted(() => {
  useInitApp()
})
</script>

<template>
  <Html :class="theme || 'dark-theme'" :lang="locale">
    <Head>
      <Title>{{ $t('welcome') }}</Title>
    </Head>
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
        <PromotionsModal />
      </NuxtLayout>
    </Body>
  </Html>
</template>
