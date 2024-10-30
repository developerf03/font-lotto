import { storeToRefs } from 'pinia'
import { useProviderStore } from '@/stores/provider'

export const useProvider = () => {
  // State
  const {
    providers,
    providerDemos,
    getProviderByCategory,
    getProviderByPartner,
    getProviderByCategoryAll,
  } = storeToRefs(useProviderStore())

  // Methods
  const { getProviders } = useProviderStore()

  return {
    // State
    providers,
    providerDemos,
    getProviderByCategory,
    getProviderByPartner,
    getProviderByCategoryAll,
    // Actions
    getProviders,
  }
}
