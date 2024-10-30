<script setup>
const theme = useCookie('theme')
const { setLocale } = useI18n()
const { isAuthenticated, logout } = useAuth()

const handleThemeChange = (themeVal) => {
  theme.value = themeVal + '-theme'
}

const handleLangChange = (locale) => {
  setLocale(locale)
}
</script>

<template>
  <header class="flex justify-between bg-blue-gray-900 p-4 sticky left-0 top-0">
    <div class="text-white" @click="$navigateTo('/')">Logo</div>
    <div class="flex gap-2">

      <div class="text-white cursor-pointer" @click="handleLangChange('th')">TH</div>
      <div class="text-white cursor-pointer" @click="handleLangChange('en')">EN</div>
      <div class="text-white cursor-pointer" @click="handleLangChange('vi')">VI</div>
      <div class="text-white cursor-pointer" @click="handleThemeChange('dark')">Dark</div>
      <div class="text-white cursor-pointer" @click="handleThemeChange('light')">Light</div>
      <div v-if="isAuthenticated" class="text-white cursor-pointer" @click="$navigateTo('/profile')">Profile</div>
      <div v-if="!isAuthenticated" class="text-white">{{ $t('login') }}</div>
      <div v-else class="text-white" @click="logout">{{ $t('logout') }}</div>
    </div>
  </header>
</template>