// import { useRoute as useRouteFromVue } from 'vue-router'

// export const useRoute = () => useRouteFromVue()

export const useExpires = (sDate, eDate) => {
  const today = new Date()
  const startDate = new Date(sDate)
  const endDate = new Date(eDate)

  return !(today >= startDate && today <= endDate)
}

export const useCategoryFilterMap = (category) => ({
  fishing: 'fishing',
  table: 'table',
  crypto: 'crypto',
  crash: 'crash',
  pvp: 'pvp',
  casino: 'casino',
  slot: 'slot',
  demo: 'demo',
  sport: 'sport',
  arcade: 'arcade',
  get value() {
    return this[category]
  },
})

export const t = (str = '', opt = '') => {
  const { $i18n } = useNuxtApp()

  return $i18n.t(str, opt)
}

export const isUrl = (url) => {
  return /^(http:\/\/|https:\/\/)/.test(url)
}

export const $navigateTo = (opt) => {
  const localePath = useLocalePath()

  return navigateTo(localePath(opt))
}

export const depley = (ms) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve()
    }, ms),
  )

export const useCountryCallingCodes = () => {
  const setting = useSetting()
  const countryActives = computed(() =>
    setting?.value?.signInSetting ? Object?.keys(setting?.value?.signInSetting) : [],
  )
  const result = computed(() =>
    countryActives.value.map((o) => {
      const findCountryCallingCode = setting?.value?.countryCallingCodes?.find((v) =>
        v.countryCode.includes(o),
      )

      return {
        ...findCountryCallingCode,
        // flag: flags?.[findCountryCallingCode?.countryCode],
      }
    }),
  )

  return result.value
}
