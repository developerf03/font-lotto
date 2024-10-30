export default defineNuxtPlugin(async ({ $pinia }) => {
  const { getHeaderInfo, getSetting } = useSettingStore($pinia)


  await Promise.all([getHeaderInfo(), getSetting()])
})
