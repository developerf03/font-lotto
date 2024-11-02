import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores/setting'

export const useSetting = () => {
  const { setting } = storeToRefs(useSettingStore())

  return setting.value ? setting : {}
}

export const useLobbySetting = () => {
  const { $i18n } = useNuxtApp()
  const { setting, headerInfo } = storeToRefs(useSettingStore())
  const langDefault = $i18n.locales.value.find(
    (v) => v.countryCode === headerInfo?.value?.countryCode,
  )?.code

  return {
    langDefault,
    headerInfo,
    setting,
    enableReferCode:
      setting.value?.pyramidSetting && setting.value?.pyramidSetting[useDefaults()?.currencyCode],
  }
}

export const useSignUpSetting = () => {
  const { setting } = storeToRefs(useSettingStore())
  const { user } = useAuth()

  const verify = computed(() => ({
    phone: user.value?.player?.verifyPhone,
    email: user.value?.player?.verify,
  }))

  const signUpSetting = computed(
    () =>
      setting.value.signUpSetting?.[useDefaults()?.countryCode] ||
      Object.keys(setting.value?.signUpSetting ?? {}).reduce((i, o) => {
        if (setting.value?.signUpSetting?.[o]?.default) {
          return setting.value?.signUpSetting?.[o]
        } else {
          return i
        }
      }, {}),
  )

  /*
    defaultCurrency
    defaultLogin
    dateOfBirth
    requireBank
  */
  return {
    isSignUpWithPhone: signUpSetting.defaultLogin !== 'email',
    registerWith: {
      email: signUpSetting.value.defaultSignup?.includes('email'),
      phone: signUpSetting.value.defaultSignup?.includes('phone'),
      username: signUpSetting.value.defaultSignup?.includes('username'),
    },
    isVerify: verify.value?.[signUpSetting.value?.verifyWith],
    dateOfBirth: false,
    editDateOfBirth: setting.value?.profileSetting?.editDateOfBirth,
    requireBank: false,
    requireUsername: false,
    ...signUpSetting.value,
  }
}

export const useSignInSetting = () => {
  const { setting } = storeToRefs(useSettingStore())
  const { user } = useAuth()
  const signInSetting = computed(
    () =>
      setting.value?.signInSetting?.[useDefaults()?.countryCode] ||
      Object.keys(setting.value?.signInSetting ?? {}).reduce((i, o) => {
        if (setting.value?.signInSetting?.[o]?.default) {
          return setting.value?.signInSetting?.[o]
        } else {
          return i
        }
      }, {}),
  )
  const verify = computed(() => ({
    phone: user.value?.player?.verifyPhone,
    email: user.value?.player?.verify,
  }))
  /*
    defaultCurrency
    defaultLogin
  */

  return {
    loginWith: {
      email: signInSetting.value.defaultLogin?.includes('email'),
      phone: signInSetting.value.defaultLogin?.includes('phone'),
      username: signInSetting.value.defaultLogin?.includes('username'),
    },
    isVerify: verify.value?.[signInSetting.value?.verifyWith],
    requireUsername: false,
    ...signInSetting.value,
  }
}

export const useDefaults = () => {
  const { $i18n } = useNuxtApp()
  const { setting, headerInfo } = storeToRefs(useSettingStore())

  const countryCodeSupported = Object.keys(setting.value?.signInSetting ?? {})
  const countryCallingCodes = setting.value?.countryCallingCodes || []
  const isCountrySupported = countryCodeSupported.includes(headerInfo.value?.countryCode)

  const countryCode = isCountrySupported
    ? headerInfo.value?.countryCode
    : countryCodeSupported?.length === 1
    ? countryCodeSupported?.[0]
    : countryCodeSupported?.find((v) => setting.value?.signInSetting[v].default)

  const countryCallingCodeResult = countryCallingCodes.find((v) =>
    v.countryCode.endsWith(countryCode),
  )

  const langCodeFromHeaderInfo = $i18n.locales.value.find(
    (v) => v.countryCode === headerInfo.value?.countryCode,
  )?.code

  return {
    countryCode,
    ISOLanguageCode: countryCallingCodeResult?.countryCode ?? langCodeFromHeaderInfo,
    currencyCode: countryCallingCodeResult?.currencyCode,
  }
}

export const useMenu = () => {
  const { showPaymentModal, handleLoginModal } = useModals()
  const route = useRoute()
  const { user } = useAuth()

  return computed(() => {
    const menuClick = {
      home: () => $navigateTo('/'),
      deposit: () =>
        user.value ? showPaymentModal(true, 'deposit', null) : handleLoginModal(true),
      withdraw: () =>
        user.value ? showPaymentModal(true, 'withdraw', null) : handleLoginModal(true),
      promotion: () => $navigateTo('/promotions'),
    }

    return [
      {
        label: 'หน้าหลัก',
        icon: 'i-tabler:home',
        click: menuClick['home'],
        active: route.name.includes('index'),
      },
      {
        label: 'เติมเงิน',
        icon: 'i-tabler:wallet',
        click: menuClick['deposit'],
      },
      {
        label: 'ถอนเงิน',
        icon: 'i-tabler:cash',
        click: menuClick['withdraw'],
      },
      {
        label: 'โปรโมชั่น',
        icon: 'i-tabler:confetti',
        click: menuClick['promotion'],
        active: route.name.includes('promotion'),
      },
    ]
  })
}

export const useSubMenu = () => {
  const { logout } = useAuth()
  const { handleProfileModal } = useModals()

  const menuClick = {
    profile: () => handleProfileModal(true),
    bankAccount: () => [],
    logout: () => {
      logout()
      useAlert({ logo: true, text: 'ออกจากระบบ' })
    },
  }

  return [
    {
      label: 'โปรไฟล์',
      icon: 'i-tabler:user',
      click: menuClick['profile'],
    },
    {
      label: 'บัญชีของฉัน',
      icon: 'i-tabler:building-bank',
      click: menuClick['bankAccount'],
    },
    {
      label: 'ออกจากระบบ',
      icon: 'i-tabler:logout-2',
      click: menuClick['logout'],
    },
  ]
}
