<script setup>
import thFlag from '~/assets/images/flags/th-TH.webp'
import gbFlag from '~/assets/images/flags/en-GB.webp'
import cnFlag from '~/assets/images/flags/zh-CN.webp'
import twFlag from '~/assets/images/flags/zh-TW.webp'
import vnFlag from '~/assets/images/flags/vi-VN.webp'
import phFlag from '~/assets/images/flags/tl-PH.webp'
import idFlag from '~/assets/images/flags/id-ID.webp'
import ptFlag from '~/assets/images/flags/pt-PT.webp'
import esFlag from '~/assets/images/flags/es-ES.webp'
import krFlag from '~/assets/images/flags/ko-KR.webp'
import jpFlag from '~/assets/images/flags/ja-JP.webp'

// Composables
// const { $i18n } = useNuxtApp()
const { setLocale, locale, locales } = useI18n()
const { languageModal } = useModals()

// State
const flagUrl = ref({
  TH: thFlag,
  GB: gbFlag,
  CN: cnFlag,
  TW: twFlag,
  VN: vnFlag,
  PH: phFlag,
  ID: idFlag,
  PT: ptFlag,
  ES: esFlag,
  KR: krFlag,
  JP: jpFlag,
})

// Computed
const flag = computed(() => (code) => flagUrl.value[code])

// Funtions
const handleChangeLang = (val) => {
  const langCookie = useCookie('lang')
  setLocale(val)
  langCookie.value = val
}
</script>

<template>
  <BaseModal
    id="changeLanguage-modal"
    v-model="languageModal"
    :disable-click-out="false"
    :title="t('changeLanguage')"
    title-position="center"
  >
    <div class="w-full flex justify-center items-center flex-col gap-4">
      <UButton
        v-for="(item, index) in locales"
        :key="index"
        size="md"
        :variant="locale === item.code ? 'outline' : 'tertiary'"
        @click="handleChangeLang(item.code)"
      >
        <div class="flex justify-center items-center h-full w-full">
          <div class="flex-1" />
          <div class="flex-1 flex gap-2 h-full">
            <img
              :src="flag(item?.countryCode)"
              :alt="item?.IETF"
              class="cursor-pointer rounded-full"
            >
            <div class="flex justify-center items-center text-base <sm:text-sm">
              {{ item?.name }}
            </div>
          </div>
          <div class="flex-1" />
        </div>
      </UButton></div
  ></BaseModal>
</template>
