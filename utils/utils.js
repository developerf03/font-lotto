export const isBoolean = (obj) => {
  return obj === true || obj === false || toString.call(obj) === '[object Boolean]'
}

export const isObject = (obj) => typeof obj === 'object' && !Array.isArray(obj) && obj !== null

export const isObjEmpty = (obj) =>
  typeof obj === 'object' && !Array.isArray(obj) && obj !== null && !Object.keys(obj).length

export const isEmptyArray = (arr) => Array.isArray(arr) && arr.length === 0

export const isNullOrUndefined = (val) => val === null || val === undefined

export const numeralCommas = (o, type) => {
  const value = String(o)
    .replace(/(?:\.+\d*),.*/gm, '')
    .replace(/[,]/gm, '')
  const integer = value.replace(/\..*/gm, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const decimal = value.replace(/^\d*/gm, '').replace(/(?:[.\d*|.])[.|,].*/gm, '')

  return type === 'integer'
    ? integer
    : type === 'decimal'
    ? decimal
    : !String(o).match(/[.]/gm)
    ? integer
    : integer + decimal
}

export const removeCommas = (o) => {
  return Number.parseFloat(String(o).replace(/[,]/gm, '')) || ''
}

export const plusNumberCommas = (o, plusNumber) => {
  const number = removeCommas(o)

  return numeralCommas(number + plusNumber)
}

export const isPhoneNumber = ({ value, prefix = '06|08|09', quantifiers = 8 } = {}) => {
  const rangeNumber = Number.isInteger(quantifiers)
    ? quantifiers
    : Array.isArray
    ? quantifiers.join(',')
    : 8
  const phoneNumberPattern = new RegExp('^' + prefix + '\\d{' + rangeNumber + '}$')

  return phoneNumberPattern.test(value)
}

export const isNumeric = (value) => {
  return /^[0-9]+$/.test(value)
}

export const capitalizeFirstLetter = (str) => {
  if (!str || typeof str !== 'string') return

  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const clearObj = (obj = {}, initialVal = '') =>
  Object.keys(obj).reduce((p, n) => ({ ...p, [n]: initialVal }), {})

export const getReferalLink = (referralCode) => {
  let referralLink = ''

  if (useSignUpSetting().isSignUpWithPhoneNumber) {
    referralLink = `${window.origin}/register?ref=${referralCode}`
  } else {
    referralLink = `${window.origin}/?ref=${referralCode}`
  }

  return referralLink
}

export const copyReferalLink = (referralCode) => {
  let referralLink = ''

  if (useSignUpSetting().isSignUpWithPhoneNumber) {
    referralLink = `${window.origin}/register?ref=${referralCode}`
  } else {
    referralLink = `${window.origin}/?ref=${referralCode}`
  }

  useCopyClipboard(referralLink)
}

export const useCopyClipboard = (text) => {
  const { $i18n } = useNuxtApp()

  useAlert({
    copy: true,
    title: $i18n.t('copySuccess'),
    autoHide: true,
    duration: 400,
  })
  navigator.clipboard.writeText(text)
}

export const useLauncherRouter = (launcher) => {
  const width = window.innerWidth
  const newWin = window.open(
    width > 640 ? launcher?.desktop : launcher?.mobile,
    '',
    `width=${width} , height=${width}`,
  )

  if ((!newWin || newWin.closed || typeof newWin.closed === 'undefined') && width <= 1024) {
    // POPUP BLOCKED
    location.href = launcher?.mobile
  }
}

export const useNewWindowUrl = (url) => {
  const width = window.innerWidth
  const newWin = window.open(url, '', `width=${width} , height=${width}`)

  if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
    // POPUP BLOCKED
    location.href = url
  }
}

export const generateUniqueId = () => {
  return Date.now() + '-' + Math.random().toString(36).substr(2, 9)
}

export const checkValueType = (value) => {
  const phoneRegex = /^0[0-9]{9,13}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (phoneRegex.test(value)) {
    return 'phone'
  } else if (emailRegex.test(value)) {
    return 'email'
  } else {
    return 'playerUsername'
  }
}

export const calcMaintenanceDetail = (maintenance, isMaintenanceSite) => {
  if (
    !(maintenance?.endTime && maintenance?.startTime && maintenance?.timezone && maintenance?.type)
  ) {
    return {
      isMaintenance: isMaintenanceSite ?? false,
      isMaintenanceSite,
      isMaintenanceTime: false,
      type: '',
      today: '',
      startDate: '',
      endDate: '',
      maintenanceTimeToSecond: 0,
      second: 0,
      hour: 0,
      minute: 0,
    }
  }

  const checkMaintenance = (today, startDate, endDate, day) => {
    if (maintenance?.type === 'daily') {
      return today >= startDate && today <= endDate
    }

    if (maintenance?.type === 'weekly') {
      return (
        today >= startDate &&
        today <= endDate &&
        day.toLowerCase().includes(maintenance?.day?.toLowerCase())
      )
    }

    if (maintenance?.type === 'monthly') {
      const date = today?.getDate()

      return today >= startDate && today <= endDate && date === maintenance?.date
    }
  }

  const date = new Date()
  const dateTimezone = date.toLocaleString('en-GB', {
    timeZone: maintenance?.timezone,
  })
  const dayTimezone = date
    .toLocaleString('en-GB', {
      timeZone: maintenance?.timezone,
      dateStyle: 'full',
      timeStyle: 'medium',
    })
    .split(' ')[0]
  const [fullDate, fullTime] = dateTimezone.split(', ')
  const [d, m, y] = fullDate.split('/')
  const [hh, mm, ss] = fullTime.split(':')
  const today = new Date(y, m, d, hh, mm, ss)
  const [sHh, sMm, sSs] = maintenance.startTime.split(':')
  const [eHh, eMm, eSs] = maintenance.endTime.split(':')
  const startDate = new Date(y, m, d, sHh, sMm, sSs)
  const endDate = new Date(y, m, d, eHh, eMm, eSs)
  const isMaintenanceTime = checkMaintenance(today, startDate, endDate, dayTimezone)
  const maintenanceTimeToSecond = (endDate - today) / 1000

  const totalSeconds = Math.max(maintenanceTimeToSecond, 0)
  const hour = Math.floor(totalSeconds / 3600)
  const minute = Math.floor((totalSeconds % 3600) / 60)
  const second = Math.floor(totalSeconds % 60)
  const isMaintenance = isMaintenanceSite || isMaintenanceTime

  return {
    isMaintenance,
    isMaintenanceSite,
    isMaintenanceTime,
    today,
    startDate,
    endDate,
    maintenanceTimeToSecond,
    hour,
    minute,
    second,
    type: maintenance?.type,
    day: maintenance?.day ?? '',
    date: maintenance?.date ?? '',
  }
}

export const convertPhoneNumber = (localNumber, callingCode) => {
  // Remove the leading 0
  if (localNumber.startsWith('0')) {
    localNumber = localNumber.substring(1)
  }

  // Add the country code
  const internationalNumber = callingCode + localNumber

  return internationalNumber
}

export const convertPhoneNumberDash = (phoneNumber) => {
  // Check if the phone number has the correct length and contains only digits
  if (phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
    // Format the phone number as '099-123-4567'
    const formattedNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      6,
    )}-${phoneNumber.slice(6)}`

    return formattedNumber
  } else {
    return phoneNumber
  }
}

export const textInterrupt = (textList, interuptValue) => {
  return textList?.toString()?.replaceAll(',', ` ${interuptValue} `)
}
