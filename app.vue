<script setup>
// Imports
import paymentModal from '~/components/modal/Payment.vue'
import paymentDepositModal from '~/components/modal/PaymentDeposit.vue'
import transactionsAllModal from '~/components/modal/Transactions.vue'
import VerifyOtpModal from '~/components/modal/VerifyOtp.vue'
import LanguageModal from '~/components/modal/Language.vue'
import Login from '~/components/modal/Login.vue'
import Register from '~/components/modal/Register.vue'
import Launcher from '~/components/modal/Launcher.vue'
import ForgotPassword from '~/components/modal/ForgotPassword.vue'
import Profile from '~/components/modal/Profile.vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/bundle'
const { locale } = useI18n()
useInitApp()
const theme = useCookie('theme')
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
        <Login />
        <Register />
        <ForgotPassword />
        <BaseAlert />
        <Launcher />
        <VerifyOtpModal />
        <Profile />
        <LanguageModal />
        <PromotionDetails />
      </NuxtLayout>
    </Body>
  </Html>
</template>
