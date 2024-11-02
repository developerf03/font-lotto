import { storeToRefs } from 'pinia'
import { usePromotionStore } from '@/stores/promotion'

export const usePromotion = () => {
  // State
  const { promotionOptions, promotions, loading } = storeToRefs(usePromotionStore())

  // Methods
  const { promotionDepositCheck, fetchPromotions, promotionWithdrawCheck, getPromotionDetail } =
    usePromotionStore()

  return {
    // State
    loading,
    promotions,
    promotionOptions,
    // Actions
    promotionDepositCheck,
    fetchPromotions,
    promotionWithdrawCheck,
    getPromotionDetail,
  }
}

const formatHHMM = (dateInInt) => {
  const arr = String(dateInInt).split('.')

  if (arr[1] && arr[1].length === 1) arr[1] += '0'

  return arr.length > 1
    ? `${arr[0].padStart(2, '0')}:${arr[1].padStart(2, '0')}`
    : `${arr[0].padStart(2, '0')}:00`
}

export const usePromotionData = (item = {}) => {
  // const locale = useDefaultLangauge()
  const { $i18n } = useNuxtApp()

  const detail =
    item?.detail?.find((v) => v.lang === $i18n.localeProperties.value?.IETF) ||
    item?.detail?.find((v) => v.lang === useDefaultLangauge()) ||
    {}
  const images =
    item?.image?.filter((v) => v.lang === $i18n.localeProperties.value?.IETF) ||
    item?.image?.filter((v) => v.lang === useDefaultLangauge()) ||
    []
  const image = {
    desktop: images?.find((v) => v.type === 'desktop')?.url,
    mobile: images?.find((v) => v.type === 'mobile')?.url,
  }

  return {
    id: item?.promotion_id,
    title: detail.title,
    detail: detail.detail,
    type: item?.promotion?.type,
    subType: item?.promotion?.sub_type,
    amount: item?.amount,
    code: item?.code,
    image,
    condition: {
      deposit: getDepositGroupConditions(
        item?.agent_promotion_group_conditions,
        item?.currency,
      ).flat(),
      withdraw: getWithdrawGroupConditions(item?.agent_withdraw_group_conditions, item?.currency),
    },
    benefits: getBenefits(item?.agent_benefits, item?.currency),
    // redeem: {
    // redeemCount: item?.redeem_count,
    // redeemLimit: getRedeemCondition(item?.agent_promotion_group_conditions)?.amount,
    // },
    // tags: item?.tags,
    // tier: item?.tier,
    // tierDetail: item?.tierDetail,
    currency: item?.currency,
    startDate: item?.start_date,
    endDate: item?.end_date,
    isExpires: useExpires(item?.start_date, item?.end_date),
    note: item?.note,
  }
}

export const getDepositGroupConditions = (list = [], currency = '') => {
  // Check empty list
  if (!list || !list.length) return []
  const result = []
  const natationMap = {
    BETWEEN: 'between',
    '=': 'eq',
    '>=': 'gte',
    '>': 'gt',
  }

  // Check condition
  for (let i = 0; i < list.length; i++) {
    const resultGroup = []
    const group = list[i]?.group_condition

    for (let j = 0; j < group?.length; j++) {
      const item = group[j]

      try {
        let text = ''
        const type = item?.condition?.type?.sub_type

        if (['common', 'once_a_day', 'first'].includes(type)) {
          text = t(`promotionConditions.deposit.${type}.${natationMap[item.notation]}`, {
            min: numeralCommas(item.min),
            max: numeralCommas(item.max),
            currency,
            amount: numeralCommas(item.amount),
          })
        }

        if (['happytime'].includes(type)) {
          text = t('promotionConditions.deposit.happytime', {
            start: formatHHMM(item.min),
            end: formatHHMM(item.max),
          })
        }

        if (['times_a_day'].includes(type)) {
          text = t('promotionConditions.deposit.times_a_day', {
            amount: item.amount,
          })
        }

        if (text) resultGroup.push(text)
      } catch (error) {
        console.log('getDepositGroupConditions', error)
      }
    }

    result.push(resultGroup)
  }

  return result.filter((v) => v && v.length)
}

export const getWithdrawGroupConditions = (list = []) => {
  // Check empty list
  if (!list || !list.length) return []

  // Check condition
  const result = []
  const listSize = list.length

  for (let i = 0; i < listSize; i++) {
    const resultGroup = []
    const group = list[i]?.group_condition

    for (let j = 0; j < group?.length; j++) {
      const item = group[j]

      try {
        let text = ''
        const type = item?.condition?.type?.sub_type

        if (type === 'credit') {
          text = t('promotionConditions.withdraw.turnover.credit', {
            x: item.amount,
          })
        } else if (type === 'all') {
          text = t('promotionConditions.withdraw.turnover.all', {
            x: item.amount,
          })
        } else if (type === 'lotto') {
          text = t('promotionConditions.withdraw.turnover.lotto', {
            category: capitalizeFirstLetter(type),
            x: item.amount,
          })
        } else {
          text = t('promotionConditions.withdraw.turnover.category', {
            category: capitalizeFirstLetter(type),
            x: item.amount,
          })
        }

        if (text) resultGroup.push(text)
      } catch (error) {
        console.log('getWithdrawGroupConditions', error)
      }
    }

    result.push(resultGroup)
  }

  return result.filter((v) => v && v.length)
}

export const getBenefits = (list = [], currency = '') => {
  const { getProviderByPartner } = useProvider()

  // Check empty list
  if (!list || !list.length) return []

  /**
   * benefit.credit.credit  amount
   * benefit.credit.multiply amount, currency
   * benefit.credit.percent amount, currency
   * benefit.freespin amount, provider
   */
  // Check condition
  const result = []
  const listSize = list.length

  for (let i = 0; i < listSize; i++) {
    const item = list[i]

    try {
      let text = ''
      const type = item?.benefit?.type.type
      const subType = item?.benefit?.type.sub_type
      const game = item?.game?.description
      const provider = getProviderByPartner.value(subType)

      if (type === 'freespin') {
        text = t('promotionConditions.benefit.freespin', {
          // amount: item.amount,
          category: provider?.description,
          game,
        })
      } else {
        switch (subType) {
          case 'credit':
            text = t('promotionConditions.benefit.credit', {
              amount: numeralCommas(item.amount),
              currency,
            })
            break

          case 'percent':
            text = t('promotionConditions.benefit.percent', {
              percent: item.amount,
              amount: numeralCommas(item.limit_amount),
              currency,
            })
            break

          case 'multiply':
            text = t('promotionConditions.benefit.multiply', {
              x: item.amount,
              amount: numeralCommas(item.limit_amount),
              currency,
            })
            break
          case 'luckywheel':
            text = t('promotionConditions.benefit.luckyWheel', {
              amount: $format.number(item.amount),
            })
            break
          case 'coupon':
            text = t('promotionConditions.benefit.luckyWheel', {
              amount: $format.number(item.amount),
            })
            break
          case 'redeem':
            text = t('promotionConditions.benefit.luckyWheel', {
              amount: $format.number(item.amount),
            })
            break

          default:
            break
        }
      }

      if (text) result.push(text)
    } catch (error) {
      console.log('getBenefits', error)
    }
  }

  return result.filter((v) => v && v.length)
}

export const getConditionsByEvidence = (list = [], isStacking = false) => {
  // Check empty list
  if (!list || !list.length) return []

  // Check condition
  const result = []
  const listSize = list.length
  const turnoverLabel = isStacking ? 'turnoverLabel' : 'turnover'

  for (let i = 0; i < listSize; i++) {
    const resultGroup = []
    const group = list[i]

    for (let j = 0; j < group?.length; j++) {
      const condition = group[j]

      condition.conditionAmount = parseFloat(condition.condition_amount)

      try {
        let text = ''

        if (['slot', 'casino', 'sport', 'lotto', 'all'].includes(condition.game_type)) {
          text = t(`promotionConditions.withdraw.${turnoverLabel}.category`, {
            category: capitalizeFirstLetter(condition.game_type),
            x: condition.multiply,
          })
          condition.remaining = parseFloat(condition.player_turnover_amount)
        } else {
          text = t(`promotionConditions.withdraw.${turnoverLabel}.credit`, {
            x: condition.multiply,
          })
          condition.remaining = parseFloat(condition.player_credit_amount)
        }

        if (text) {
          resultGroup.push({
            text,
            ...condition,
          })
        }
      } catch (error) {
        console.log('getConditionsByEvidence', error)
      }
    }

    result.push(resultGroup)
  }

  return result.filter((v) => v && v.length)
}
