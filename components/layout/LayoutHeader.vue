<script setup>
const { user, isAuthenticated, logout } = useAuth()
const { localeProperties, setLocale } = useI18n()
const colorMode = useColorMode()

// Functions
const handleLangChange = (locale) => {
  setLocale(locale)
}
const handleThemeChange = (mode) => {
  colorMode.preference = mode
}
const handleLogout = () => {
  logout()
}
</script>

<template>
  <header
    class="flex justify-between items-center h-12 bg-dark-900 px-3 sticky top-0 left-0 w-full"
  >
    <div class="text-xl text-light-200">Logo</div>
    <div class="flex gap-2">
      <button
        class="p-2 border-none bg-gray-400 cursor-pointer capitalize hover:(shadow-dark-50)"
        @click="handleThemeChange(colorMode.preference === 'dark' ? 'light' : 'dark')"
      >
        {{ colorMode.preference }}
      </button>
      <button
        class="p-2 border-none bg-gray-400 cursor-pointer hover:(shadow-dark-50)"
        @click="handleLangChange(localeProperties.code === 'th-TH' ? 'en-GB' : 'th-TH')"
      >
        {{ localeProperties.countryCode === 'TH' ? 'EN' : 'TH' }}
      </button>
      <div v-if="isAuthenticated" class="flex justify-center items-center gap-2">
        <img :src="user.player.avatar" alt="" srcset="" class="w-8 h-8">
        <span>{{ user.player.playerNickname }}</span>
      </div>
      <button
        v-if="isAuthenticated"
        class="p-2 border-none bg-gray-400 cursor-pointer hover:(shadow-dark-50)"
        @click="handleLogout"
      >
        Logout
      </button>
    </div>
  </header>
</template>
