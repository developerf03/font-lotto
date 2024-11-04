import { storeToRefs } from 'pinia'
import { useSettingStore } from '~/stores/setting'
import { useAuthStore } from '~/stores/auth'
import { useCurrencyStore } from '~/stores/currency'

export const useInitAppSSR = async () => {
  const { setting } = storeToRefs(useSettingStore())

  try {
    // Init langauge
    useInitLang(setting)

    // Init functions
    useInitHead(setting.value)
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

  if (agentLang.length && !lang.value) {
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

export const useInitHead = (setting) => {
  useHead({
    title: setting.title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: setting?.description,
      },
      {
        property: 'og:title',
        hid: 'og:title',
        name: 'og:title',
        content: setting?.title,
      },
      {
        property: 'og:description',
        hid: 'og:description',
        name: 'og:description',
        content: setting?.description,
      },
      {
        property: 'og:type',
        hid: 'og:type',
        name: 'og:type',
        content: 'website',
      },
      {
        property: 'og:image',
        hid: 'og:image',
        name: 'og:image',
        content: setting?.faviconUrl,
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: setting?.faviconUrl,
      },
    ],
  })
}
