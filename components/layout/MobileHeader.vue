<script setup>
// Imports
import { onClickOutside } from '@vueuse/core'

// Composables
const menu = useSubMenu()
const { user, balance } = useAuth()
const { handleLoginModal, handleRegisterModal } = useModals()

// States
const isExpan = ref(false)
const target = ref(null)

onClickOutside(target, () => (isExpan.value = false))
</script>

<template>
  <div
    ref="target"
    class="mobile-header-wrapper w-full p-4 pt-2 flex flex-col fixed top-0 left-0 card-primary z-10 rounded-b-[20px]"
  >
    <!-- HEAD -->
    <div class="flex items-center">
      <div class="flex-1" />
      <div class="flex-1 flex min-w-max">
        <BaseLogo class="!h-[50px] flex-shrink-0 mx-auto lg:!h-[69px]" />
      </div>
      <div class="flex-1 flex items-center justify-end">
        <UButton variant="outline" class="!w-11 !h-11" @click="isExpan = !isExpan">
          <BaseHamburger :value="isExpan" use-value />
        </UButton>
      </div>
    </div>
    <!-- CONTENT -->
    <!-- WALLET -->
    <div v-if="user">
      <HomeMenuWallet :balance="balance" class="mt-3" />
    </div>
    <!-- BUTTON => LOGIN / REGISTER -->
    <div v-else class="w-full flex gap-4 mt-3">
      <UButton :label="t('login')" variant="outline" size="sm" @click="handleLoginModal(true)" />
      <UButton
        :label="t('register')"
        variant="solid"
        size="sm"
        @click="handleRegisterModal(true)"
      />
    </div>
    <div
      class="max-h-[0] overflow-hidden transition-all duration-300"
      :class="[{ 'max-h-[1000px]': isExpan }]"
    >
      <div class="pt-4 flex flex-col gap-4">
        <UVerticalNavigation v-if="user" :links="menu" class="navigation-secondary text-primary" />
        <div class="w-full divide-x-1 flex items-center">
          <div class="flex-1 flex items-center justify-center gap-4">
            <BaseChangeLanguage />
          </div>
          <div class="flex-1 flex items-center justify-center gap-4">
            <BaseChangeTheme />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mobile-header-wrapper {
  box-shadow: 0px 4px 8px 0px #6c6c6c29;
}
</style>
