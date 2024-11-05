import { storeToRefs } from 'pinia'
import { useSettingStore } from '~/stores/setting'
import { useAuthStore } from '~/stores/auth'
import { useCurrencyStore } from '~/stores/currency'

export const useInitAppSSR = async () => {
  const { setting } = storeToRefs(useSettingStore())
  const { $i18n } = useNuxtApp()
  const locale = $i18n.localeProperties.value.IETF
  

  try {
    // Init langauge
    useInitLang(setting)

    // Init meta tag SEO
    useMetaTagSEO({
      title: setting.value.title[locale],
      description: setting.value.description[locale],
      faviconUrl: setting.value.faviconUrl
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useInitApp = async () => {
  const { getInformations, getPromotes } = useInformation()
  const { getAssets } = useSettingStore()
  const { getProviders } = useProvider()
  const { fetchCurrencyList } = useCurrencyStore()

  const { isAuthenticated } = storeToRefs(useAuthStore())

  try {
    // Check authen
    if (isAuthenticated.value) {
      useFetchAfterAuthen()
    }

    // Depends on settings
    Promise.all([
      getAssets(),
      getInformations(),
      getPromotes(),
      getProviders(),
      fetchCurrencyList({ agent: true }),
    ])
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useFetchAfterAuthen = () => {
  const { connectSocket } = useSocket()

  try {
    // Connect socket
    connectSocket()
  } catch (error) {
    toastError(useErrorMsg({ error }))
  }
}

export const useInitLang = (setting) => {
  const { $i18n } = useNuxtApp()
  const i18n = useCookie('i18n_redirected')
  const lang = useCookie('lang')
  const theme = useCookie('themeMode')
  const themeColor = useCookie('themeColor')
  const agentLang = useDefaults()?.ISOLanguageCode?.split('-')
  const themeList = ['blue', 'orange']

  if (agentLang?.length && !lang.value) {
    $i18n.setLocale(agentLang[0])
    lang.value = agentLang[0]
    i18n.value = agentLang[0]
  }

  // theme mode
  if (!theme.value || theme.value === 'undefined' || theme.value === 'null') {
    theme.value = 'light-theme'
  }

  // theme color
  themeColor.value = themeList.includes(setting?.value?.theme) ? setting?.value?.theme : 'blue'
}
