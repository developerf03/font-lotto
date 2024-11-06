import placeholder from '~/constants/placeholder'
import categorySetting from '~/constants/categorySetting'
import { useWindowSize } from '@vueuse/core'

export const useTheme = () => {
  const isDarkMode = useState('isDarkMode', () =>
    ['true', null].includes(localStorage.getItem('isDarkMode')),
  )

  watch(isDarkMode, (isDarkMode) => {
    localStorage.setItem('isDarkMode', isDarkMode)
  })

  return {
    isDarkMode,
  }
}

// export const useThemeMode = () => {
//   const appConfig = useAppConfig()

//   return !appConfig.lightThemes.includes(useSetting().value?.theme) ? 'dark' : 'light'
// }

export const usePlaceholder = (type = 'game') => {
  const { setting } = useLobbySetting()

  return setting.value?.placeholders?.find((v) => v.key === type)?.value
}

export const usePlaceholderDefault = () => {
  return placeholder
}

export const useLogo = () => {
  const { width } = useWindowSize()
  const theme = useCookie('themeMode')
  const setting = useSetting()

  let logo = null

  if (theme.value === 'light-theme') {
    logo = width.value <= 640 ? setting?.value?.logoUrlLightMobile : setting?.value?.logoUrlLightPC
  } else {
    logo = width.value <= 640 ? setting?.value?.logoUrlDarkMobile : setting?.value?.logoUrlDarkPC
  }

  return logo
}

export const useLoadingUrl = () => {
  const { setting } = useLobbySetting()

  return setting.value?.loadingUrl
}

export const useHero = () => {
  const { $i18n } = useNuxtApp()
  const setting = useSetting()
  const heroData =
    setting.value?.hero?.[$i18n.localeProperties.value?.IETF] ||
    setting.value?.hero?.[useDefaultLangauge()]

  // Helper function to determine if hero data has an empty image or video
  const isEmptyMedia = (data) => {
    const type = data?.bgType

    return (
      (type === 'image' && !data?.imageUrlMobile && !data?.imageUrlPC) ||
      (type === 'video' && !data?.videoUrlMobile && !data?.videoUrlPC)
    )
  }

  // Use default language if media is empty
  const hero =
    heroData && isEmptyMedia(heroData.data?.[0])
      ? setting.value?.hero?.[useDefaultLangauge()]
      : heroData

  return hero?.data || []
}

export const useHeroAutoplay = () => {
  const { setting } = useLobbySetting()
  const { $i18n } = useNuxtApp()
  let hero = setting.value?.hero && setting.value?.hero[$i18n.localeProperties.value?.IETF]

  return hero?.auto || 0
}

export const useGameUrl = (images = []) => {
  return (
    images?.find((v) => v.type === 'agent')?.url ||
    images?.find((v) => v.type === 'default')?.url ||
    usePlaceholder('game')
  )
}

export const useProviderUrl = (images = [], type = '') => {
  // const { setting } = useLobbySetting()
  const { $theme } = useNuxtApp()

  return type
    ? images?.find((v) => v.type === type)?.url || useLogo()
    : images?.find((v) => v.type === 'agent')?.url ||
        // images?.find((v) => v.type === setting.value?.theme)?.url ||
        images?.find((v) => v.type === $theme)?.url ||
        images?.find((v) => v.type === 'default')?.url ||
        usePlaceholder('provider')
}

export const urlPath = (path) => {
  let url = path

  url = url.replace(/\/$/, '')

  return url
}

export const useInitThemeColor = () => {
  const themePreview = useCookie('themePreview', '')
  const theme = useCookie('themeMode')
  const { setting } = useLobbySetting()
  const { _route: route } = useNuxtApp()

  const categorySettingComp = computed(() =>
    Object.keys(categorySetting).reduce(
      (p, n) => ({ ...p, [n]: { ...categorySetting[n], title: t(categorySetting[n].i18n) } }),
      {},
    ),
  )

  const category = computed(() => {
    if (route.name === 'index') return categorySettingComp.value.home
    if (['categories-demo'].includes(route.name)) return categorySettingComp.value.demo
    if (['categories-arcades'].includes(route.name)) return categorySettingComp.value.arcade

    return categorySettingComp.value[route.params?.type]
  })

  watchEffect(() => {
    // Check preview theme from query string
    if (route.query.themePreview || themePreview.value) {
      if (route.query.themePreview) themePreview.value = route.query.themePreview

      if (themePreview.value) {
        theme.value = themePreview.value

        return
      }
    }

    // Check main theme
    if (setting.value?.theme === 'main') {
      if (['categories-arcades'].includes(route.name)) {
        theme.value = 'red'

        return
      }

      // Check theme by category
      if (category.value?.theme) {
        theme.value = category.value?.theme

        return
      }

      return
    }

    // Check theme color from API
    if (setting.value?.theme) {
      theme.value = `season-${setting.value?.theme}`
    }
  })
}
