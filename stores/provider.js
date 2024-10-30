import { defineStore } from 'pinia'

export const useProviderStore = defineStore(
  'provider',
  () => {
    // Composables
    const { $theme } = useNuxtApp()

    // State
    const loading = ref(false)
    const providers = ref([])

    // Computed
    const getProviderByPartner = computed(
      () => (partner) => providers.value.find((v) => v.partner === partner),
    )
    const getProviderByCategory = computed(
      () => (category) => providers.value.filter((v) => v.types.includes(category)),
    )
    const providerDemos = computed(() => providers.value.filter((v) => v.demo))

    const getProviderByCategoryAll = computed(
      () => (category) => providers.value.filter((v) => category.some((o) => v?.types.includes(o))),
    )

    // Functions
    const getProviders = async (payload = {}) => {
      loading.value = true

      try {
        const res = await useAPI().$post('/api/v2/provider/providerSearch', {
          page: 1,
          pageSize: 100,
          currency: useDefaults()?.currencyCode,
          // themes: ['dark', setting.value?.theme].filter((v) => v),
          themes: ['dark', $theme].filter((v) => v),
          ...payload,
        })

        providers.value = res?.providerList?.map((o) => ({
          ...o,
          images: o?.images?.reduce(
            (result, item) => ({ ...result, [item?.type]: { ...item } }),
            {},
          ),
        }))
      } finally {
        loading.value = false
      }
    }

    return {
      providers,
      providerDemos,

      getProviderByCategory,
      getProviderByPartner,
      getProviderByCategoryAll,

      getProviders,
    }
  },
  // {
  //   persist: {
  //     storage: persistedState.localStorage,
  //   },
  // },
)
