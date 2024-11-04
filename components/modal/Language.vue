<script setup>
// Imports
import flags from '~/constants/flags'

// Composables
const { setLocale, locale, locales } = useI18n()
const { languageModal } = useModals()
const setting = useSetting()

// Computed
const flag = computed(() => (code) => flags?.[code])
const languageList = computed(() =>
  locales.value.filter((v) => setting.value.languages.includes(v.IETF)),
)

// Funtions
const handleChangeLang = (val) => {
  const langCookie = useCookie('i18n_redirected')
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
        v-for="(item, index) in languageList"
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
