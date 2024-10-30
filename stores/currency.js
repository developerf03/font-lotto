import { defineStore, storeToRefs } from 'pinia'
import { useAuthStore } from './auth'

export const useCurrencyStore = defineStore(
  'currency',
  () => {
    // State
    const { user } = storeToRefs(useAuthStore())
    const currency = reactive({
      all: [],
      agent: [],
    })

    // Computed
    const fiatCurrencyList = computed(() => currency.agent.filter((v) => v.currencyType === 'fiat'))
    const cryptoCurrencyList = computed(() =>
      currency.agent.filter((v) => v.currencyType === 'crypto'),
    )
    const fiatCurrencyBalance = computed(() =>
      fiatCurrencyList.value.map((v) => ({
        ...v,
        balance: user.value?.wallets?.find((i) => i.currency === v.currencyCode)?.creditPlayer || 0,
      })),
    )
    const cryptoCurrencyBalance = computed(() =>
      cryptoCurrencyList.value.map((v) => ({
        ...v,
        balance: user.value?.wallets?.find((i) => i.currency === v.currencyCode)?.creditPlayer || 0,
      })),
    )
    const getCurrencyByCode = computed(
      () => (code) => currency?.all?.find((v) => v.currencyCode === code),
    )
    const getCurrencyByCodeAgent = computed(
      () => (code) => currency?.agent?.find((v) => v.currencyCode === code),
    )
    const getCurrencyBalanceByCode = computed(() => (code) => ({
      ...currency?.agent?.find((v) => v.currencyCode === code),
      balance: user.value?.wallets?.find((i) => i.currency === code)?.creditPlayer || 0,
    }))
    const isCryptoByCode = computed(
      () => (code) => !!cryptoCurrencyList.value?.find((v) => v.currencyCode === code),
    )
    const isMultiCurrency = computed(() => currency?.agent?.length > 1)
    const haveCryptoCurrency = computed(() =>
      currency?.agent?.some((v) => v?.currencyType === 'crypto'),
    )

    // Functions
    const fetchCurrencyList = async ({ agent = false } = {}) => {
      const res = await useAPI().$post('/api/currency/currencyList', {
        by_agent: agent,
      })
      const type = agent ? 'agent' : 'all'

      currency[type] = res.currenciesList?.map((v) => ({
        ...v,
        image: v?.image?.find((v) => v?.type === 'default')?.url || '',
        chainUrl: v?.image?.find((v) => v?.type === 'chain')?.url || '',
      }))
    }

    return {
      currency,
      fiatCurrencyList,
      cryptoCurrencyList,
      fiatCurrencyBalance,
      cryptoCurrencyBalance,
      isCryptoByCode,
      getCurrencyBalanceByCode,
      getCurrencyByCode,
      getCurrencyByCodeAgent,
      isMultiCurrency,
      haveCryptoCurrency,

      fetchCurrencyList,
    }
  },
  // {
  //   persist: {
  //     storage: persistedState.localStorage,
  //   },
  // },
)
