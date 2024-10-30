import { defineStore } from 'pinia'

export const useSettingStore = defineStore(
  'setting',
  () => {
    // Composables
    const route = useRoute()

    // State
    const setting = ref({})
    const assets = ref([])
    const headerInfo = ref({
      ip: '',
      countryCode: '',
      currencyCode: '',
    })

    // Computed

    // Functions
    const getSetting = async () => {
      try {
        const res = await useAPI().$post('/api/setting/v2/lobby?platformType=website')

        setting.value = res.data
      } catch ({ response }) {
        if (response._data?.code === 2004) {
          setting.value = response._data
          const maintenanceDetail = calcMaintenanceDetail(
            response._data?.maintenanceDetail,
            response._data?.isMaintenanceSite,
          )

          if (maintenanceDetail?.isMaintenance) {
            $navigateTo('/maintenance')
          }

          if (route.path.includes('/maintenance') && !maintenanceDetail?.isMaintenance) {
            $navigateTo('/')
          }
        }
      }
    }

    const getAssets = async () => {
      const res = await useAPI().$get('/api/v2/assets?platformType=website')

      assets.value = res
    }

    const getHeaderInfo = async () => {
      const res = await useAPI().$get('/api/getHeaderInfo')

      headerInfo.value = res
    }

    return {
      headerInfo,
      setting,

      getAssets,
      getHeaderInfo,
      getSetting,
    }
  },
  // {
  //   persist: {
  //     storage: persistedState.localStorage,
  //   },
  // },
)
