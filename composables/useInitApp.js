import { storeToRefs } from 'pinia'
import { useSettingStore } from '~/stores/setting'
import { useInformationStore } from '~/stores/information'
import { useProviderStore } from '~/stores/provider'
import { useAuthStore } from '~/stores/auth'
import { useCurrencyStore } from '~/stores/currency'

export const useInitAppSSR = async () => {
  const { setting } = storeToRefs(useSettingStore())

  try {
    // Init langauge
    useInitLang()

    // Init functions
    useInitHead(setting.value)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useInitApp = async () => {
  const { getInformations, getPromotes } = useInformationStore()
  const { getAssets } = useSettingStore()
  const { getProviders } = useProviderStore()
  const { fetchCurrencyList } = useCurrencyStore()

  const { isAuthenticated } = storeToRefs(useAuthStore())

  try {
    // Check authen
    if (isAuthenticated.value) {
      useFetchAfterAuthen()
    }

    // Independent of settings
    Promise.all([getAssets(), getPromotes(), getInformations()])

    // Depends on settings
    Promise.all([getProviders(), fetchCurrencyList({ agent: true })])
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

export const useInitLang = () => {
  const { $i18n } = useNuxtApp()
  const lang = useCookie('i18n_redirected')
  const theme = useCookie('theme')
  const agentLang = useDefaults()?.ISOLanguageCode?.split('-')

  if (!lang.value || lang.value === 'undefined' || (lang.value === 'null' && !!agentLang.length)) {
    $i18n.setLocale(agentLang[0])
    lang.value = agentLang[0]
  }

  if (!theme.value || theme.value === 'undefined' || theme.value === 'null') {
    theme.value = 'light-theme'
  }
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
