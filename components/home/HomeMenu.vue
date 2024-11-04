<script setup>
// Imports
import logo from '~/assets/images/logo.png'
import flag1 from '~/assets/icons/flags/1.png'
import flag2 from '~/assets/icons/flags/2.png'
import flag3 from '~/assets/icons/flags/3.png'
import flag4 from '~/assets/icons/flags/4.png'
import flag5 from '~/assets/icons/flags/5.png'
import flag6 from '~/assets/icons/flags/6.png'
import lotteryResult1 from '~/assets/images/lottery-result/lottery-result1.png'
import lotteryResult2 from '~/assets/images/lottery-result/lottery-result2.jpeg'
import lotteryResult3 from '~/assets/images/lottery-result/lottery-result3.jpeg'
import lotteryResult4 from '~/assets/images/lottery-result/lottery-result4.jpeg'
import lotteryResult5 from '~/assets/images/lottery-result/lottery-result5.jpeg'
import lotteryResult6 from '~/assets/images/lottery-result/lottery-result6.jpeg'

// Composables
const { $i18n } = useNuxtApp()
const { user, balance } = useAuth()
const { handleLoginModal, handleRegisterModal } = useModals()
const { games } = useGame()

const mockup = [
  {
    name: 'lotteryResult1',
    flag: flag1,
    background: lotteryResult1,
  },
  {
    name: 'lotteryResult2',
    flag: flag2,
    background: lotteryResult2,
  },
  {
    name: 'lotteryResult3',
    flag: flag3,
    background: lotteryResult3,
  },
  {
    name: 'lotteryResult4',
    flag: flag4,
    background: lotteryResult4,
  },
  {
    name: 'lotteryResult5',
    flag: flag5,
    background: lotteryResult5,
  },
  {
    name: 'lotteryResult6',
    flag: flag6,
    background: lotteryResult6,
  },
]

const gameLotto = computed(() => games.value?.search?.list.find((o) => o?.type === 'lotto'))

// function
const handleLaunchGame = () => {
  if (!user.value) {
    handleLoginModal(true)
  } else {
    useLaunchGame({
      partner: gameLotto.value.partner,
      gameId: gameLotto.value.gameId,
      locale: $i18n.localeProperties.value?.IETF,
    })
  }
}
</script>

<template>
  <div
    class="home-menu-wrapper w-full card-primary text-[var(--font-primary)] rounded-[20px] px-4 py-[14px] flex flex-col items-center sm:(p-5) 2xl:px-8 mlg:rounded-[60px]"
  >
    <!-- LOGO -->
    <img :src="logo" alt="logo" srcset="" class="h-[69px] mb-4 mx-auto hidden mlg:block" >
    <!-- WALLET AND PROFILE -->
    <div
      v-if="user"
      class="w-full flex-col gap-4 pb-4 mb-4 border-b border-b-solid border-b-[var(--home-menu-divide)] hidden mlg:flex"
    >
      <HomeMenuUser :user="user?.player?.playerNickname || '-'" />
      <HomeMenuWallet :balance="balance" />
    </div>

    <!-- BUTTON => LOGIN / REGISTER -->
    <div
      v-else
      class="w-full flex-col gap-4 pb-4 mb-4 border-b border-b-solid border-b-[var(--home-menu-divide)] hidden mlg:flex"
    >
      <UButton :label="t('login')" variant="outline" size="md" @click="handleLoginModal(true)" />
      <UButton
        :label="t('register')"
        variant="solid"
        size="md"
        @click="handleRegisterModal(true)"
      />
    </div>

    <UButton size="md" variant="play" class="mb-4" @click="handleLaunchGame">
      <!-- <nuxt-icon name="svg/bank" class="" />  -->
      {{ t('betLotto') }}
    </UButton>
    <!-- LAUNCHER -->
    <div class="w-full gap-3 flex flex-col sm:(grid grid-cols-2) mlg:(flex flex-col)">
      <!-- <HomeMenuItem
        v-for="item in providers"
        :key="item?.description"
        :title="item?.lang?.[locale] || item?.description"
        :icon="flag1"
        :background="item?.images?.['dark']?.url"
      /> -->
      <!-- v-for="(item, index) in games?.search?.list"
      :key="index" -->
      <HomeMenuItem
        v-for="(item, index) in mockup"
        :key="index"
        :name="t(item?.name)"
        :icon="item?.flag"
        :background="item?.background"
      />
    </div>

    <!-- LANGUAGE AND THEME -->
    <div class="w-full h-6 my-auto divide-x-1 divide-[var(--home-menu-divide)] hidden mlg:flex">
      <div class="flex-1 flex items-center justify-center gap-4">
        <BaseChangeLanguage />
      </div>
      <div class="flex-1 flex items-center justify-center gap-4">
        <BaseChangeTheme />
      </div>
    </div>
  </div>
</template>
