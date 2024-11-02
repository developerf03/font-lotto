export default defineNuxtPlugin(async ({ $pinia }) => {
  const settingCookie = useCookie('setting')
  const { getHeaderInfo, getSetting } = useSettingStore($pinia)
  const { setting } = storeToRefs(useSettingStore($pinia))

  try {
    if (settingCookie.value) {
      setting.value = settingCookie.value
      Promise.all([getHeaderInfo(), getSetting()])
    } else {
      const [setting] = await Promise.all([getSetting(), getHeaderInfo()])

      settingCookie.value = setting
    }
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    // 
  }
})
