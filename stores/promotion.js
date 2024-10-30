import { defineStore } from 'pinia'

export const usePromotionStore = defineStore('promotion', () => {
  const { locale, t } = useI18n()
  const defaultLocale = 'th-TH'

  // Initial
  const initialPromotionData = {
    list: [],
    total: 0,
  }

  // State
  const loading = ref(false)
  const loadingPromotionDetail = ref(false)
  const loadingHistory = ref(false)
  const error = ref(null)
  const promotions = ref(initialPromotionData)
  const playerPromotion = ref(null)
  const isPlayerPromotionStack = ref(false)
  const playerPromotionStacking = ref([])
  const redeemHistory = reactive({
    list: [],
    pageTotal: 1,
  })
  const promotionDetailById = ref({})

  // Functions
  const fetchPromotions = async (payload = {}) => {
    try {
      loading.value = true
      const res = await useAPI().$get('/api/promotion', payload)

      promotions.value = res
    } finally {
      loading.value = false
    }
  }

  const checkRedeem = async (payload = {}) => {
    try {
      return await useAPI().$post('/api/promotion/redeem/check', payload)
    } catch (error) {
      return new Promise.reject(error)
    }
  }

  const receiveRedeem = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().$post('/api/promotion/redeem', payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data.value
  }

  const promotionWithdrawCheck = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/promotion/withdraw/check', payload)

    playerPromotionStacking.value = data.value?.detail?.stack_detail_promotion || []
    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data.value
  }

  const promotionDepositCheck = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/promotion/deposit/check', payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data.value
  }

  const promotionPlayer = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/promotion/player/check', payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)
    playerPromotion.value = data.value?.promotion
    isPlayerPromotionStack.value = data.value?.stacking_exist
    playerPromotionStacking.value = data.value?.stacking_detail?.stack_detail_promotion || []

    return data.value
  }

  const getPromotionDetail = async (payload = {}) => {
    loadingPromotionDetail.value = true

    try {
      const { data } = await useAPI().post('/api/promotion/detail', payload)

      promotionDetailById.value = data.value
      loadingPromotionDetail.value = false

      return data.value
    } catch (error) {
      return Promise.reject(error)
    } finally {
      loadingPromotionDetail.value = false
    }
  }

  const fetchRedeemHistory = async (
    payload = {
      page: 1,
      pageSize: 5,
      type: 'redeem', // required redeem or coupon
      currencyCode: '', // required
    },
  ) => {
    try {
      loadingHistory.value = true
      const { data } = await useAPI().post('/api/redeem/history', payload)

      redeemHistory.list = data.value?.list ?? []
      redeemHistory.pageTotal = data.value?.pageTotal ?? 1

      return data.value
    } catch (error) {
      return Promise.reject(error)
    } finally {
      loadingHistory.value = false
    }
  }

  // Computed
  const promotionOptions = computed(() => [
    { name: t('notAcceptingPromotions'), id: 'null' },
    ...promotions.value.list
      .filter((v) => v.promotion.type === 'deposit')
      .map((v) => ({
        id: v.code,
        name:
          v.detail.find((v) => v.lang === locale.value)?.title ||
          v.detail.find((v) => v.lang === defaultLocale)?.title ||
          '-',
      })),
  ])

  const redeemHistoryTable = computed(() =>
    redeemHistory.list?.map((o) => ({
      createdAt: $format.date(o?.created_at),
      code: o?.promotion_code,
      status: 'success',
      benefits: o?.credit_benefit
        ? t('promotionConditions.benefit.credit', {
            amount: $format.currency(o?.credit_amount),
            currency: o?.currency,
          })
        : o?.freespin_benefit
        ? t('freespin')
        : '-',
    })),
  )

  const playerPromotionStackingTable = computed(() => {
    if (playerPromotionStacking.value?.length) {
      return (
        playerPromotionStacking.value?.map((o) => ({
          transactionType: o?.promotion,
          type: o?.type,
          currency: o?.currency_code || '-',
          amount: $format.currency(o?.amount),
          promotionalBonus: $format.currency(o?.promotion_amount),
          tierBonus: $format.currency(o?.tier_amount),
          action: { view: !!o?.promotion_id },
          id: o?.promotion_id,
          code: o?.promotion_code,
        })) || []
      )
    } else {
      return []
    }
  })

  return {
    loading,
    loadingPromotionDetail,
    loadingHistory,
    error,
    promotions,
    redeemHistory,
    playerPromotion,
    isPlayerPromotionStack,
    promotionOptions,
    redeemHistoryTable,
    playerPromotionStackingTable,
    fetchPromotions,
    checkRedeem,
    receiveRedeem,
    getPromotionDetail,
    promotionWithdrawCheck,
    promotionDepositCheck,
    promotionPlayer,
    fetchRedeemHistory,
    promotionDetailById,
  }
})
