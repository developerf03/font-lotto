// import { useIndexStore } from '@/stores/index'
// import { storeToRefs } from 'pinia'

export const useDefaultLangauge = () => {
  // const { $i18n } = useNuxtApp()

  // const { headerInfo } = storeToRefs(useIndexStore())

  // return $i18n.locales.value?.find((v) => v.countryCode === headerInfo.value?.countryCode)?.code
  return 'th-TH'
}

export const useCurrencyCode = () => {
  return 'THB'
}

export const clearObj = (obj = {}, initialVal = '') =>
  Object.keys(obj).reduce((p, n) => ({ ...p, [n]: initialVal }), {})
