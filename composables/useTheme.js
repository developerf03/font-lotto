import placeholder from '~/constants/placeholder'
import categorySetting from '~/constants/categorySetting'

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

export const usePlaceholder = (type = 'game') => {
  const { setting } = useLobbySetting()

  return setting.value?.placeholders?.find((v) => v.key === type)?.value
}

export const usePlaceholderDefault = () => {
  return placeholder
}

export const useLogo = () => {
  const { setting } = useLobbySetting()
  const { $width } = useNuxtApp()

  return $width.value <= 640 ? setting?.value?.logoUrlLightMobile : setting?.value?.logoUrlLightPC
}

export const useLoadingUrl = () => {
  const { setting } = useLobbySetting()

  return setting.value?.loadingUrl
}

export const useHero = () => {
  const { setting, langDefault } = useLobbySetting()
  const { $i18n } = useNuxtApp()
  let hero = setting.value?.hero && setting.value?.hero[$i18n.locale.value]

  // Check empty for set dfault
  const videoType =
    hero?.length &&
    hero.data[0].bgType === 'video' &&
    !hero.data[0].videoUrlMobile &&
    !hero.data[0].videoUrlPC
  const imageType =
    hero?.length &&
    hero.data[0].bgType === 'image' &&
    !hero.data[0].imageUrlMobile &&
    !hero.data[0].imageUrlPC

  if (videoType || imageType) {
    hero = setting.value?.hero[langDefault]
  }

  return hero?.data || []
}

export const useHeroAutoplay = () => {
  const { setting } = useLobbySetting()
  const { $i18n } = useNuxtApp()
  let hero = setting.value?.hero && setting.value?.hero[$i18n.locale.value]

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

export const validateDate = (date) => {
  let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\\/](0?[1-9]|1[0-2])/

  // Matching the date through regular expression
  if (date.match(dateformat)) {
    let operator = date.split('/')

    // Extract the string into month, date and year
    let datepart = []

    if (operator.length > 1) {
      datepart = date.split('/')
    }

    let day = +datepart[0]
    let month = +datepart[1]
    let year = +datepart[2]

    // Create a list of days of a month
    let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month == 1 || month > 2) {
      if (day > ListofDays[month - 1]) {
        //to check if the date is out of range
        console.log('Invalid date')

        return false
      }
    } else if (month === 2) {
      let leapYear = false

      if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true

      if (leapYear == false && day >= 29) {
        console.log('Invalid date')

        return false
      } else if (leapYear == true && day > 29) {
        console.log('Invalid date format!')

        return false
      }
    }
  } else {
    return false
  }

  return true
}

export const urlPath = (path) => {
  let url = path

  url = url.replace(/\/$/, '')

  return url
}

export const useInitThemeColor = () => {
  const themePreview = useCookie('themePreview', '')
  const colorMode = useColorMode()
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
        colorMode.preference = themePreview.value

        return
      }
    }

    // Check main theme
    if (setting.value?.theme === 'main') {
      if (['categories-arcades'].includes(route.name)) {
        colorMode.preference = 'red'

        return
      }

      // Check theme by category
      if (category.value?.theme) {
        colorMode.preference = category.value?.theme

        return
      }

      colorMode.preference = 'black'

      return
    }

    // Check theme color from API
    if (setting.value?.theme) {
      colorMode.preference = `season-${setting.value?.theme}`
    }
  })
}
