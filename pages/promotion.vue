<script setup>
import { useWindowSize } from '@vueuse/core'

// Composables
const { showPromotionDetailsModal, showPaymentModal } = useModals()
const { fetchPromotions, getPromotionDetail, promotions, loading } = usePromotion()
const { locale } = useI18n()
const { width } = useWindowSize()
const { user } = useAuth()

// State

// Computed
const promotionList = computed(() => {
  return promotions.value?.list?.filter((v) => ['promote', 'deposit'].includes(v.promotion?.type))
})

// Functions
const fetchPromotionList = () => {
  fetchPromotions({
    currency: useCurrencyCode(),
    page: 1,
    pageSize: 100,
  })
}

const dateFormat = (date) => {
  return $format.date(new Date(date), {
    locale: locale.value,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  })
}

// const checkPromotionAvailable = (startDate, endDate) => {
//   const today = Date.now()
//   const sDate = Date.parse(startDate)
//   const eDate = Date.parse(endDate)

//   return today >= sDate && today <= eDate
// }

const handlePromotionSelected = (code) => {
  showPaymentModal(true, 'deposit', code)
}

const onRead = async (item) => {
  const res = await getPromotionDetail({ promotionCode: item?.code })
  showPromotionDetailsModal(true, res?.promotion)
}

// onMounted
onMounted(() => {
  fetchPromotionList()
})
</script>

<template>
  <!-- h-[calc(100dvh - 146px - 146px)] h-[calc(70dvh)] -->
  <div
    class="promotion-wrapper w-full card-primary rounded-[30px] p-8 pb-14 h-full <sm:(p-4 pb-12) mlg:(px-[47px] pt-6 pb-[20])"
  >
    <div class="mb-2">{{ t('promotions') }}</div>
    <div class="w-full h-full overflow-hidden overflow-y-auto">
      <div
        v-if="loading && !promotions?.total"
        class="grid w-full <sm:(grid-cols-1 gap-3) sm:(grid-cols-2 gap-4) md:(grid-cols-2 gap-4) lg:(grid-cols-3) xl:(grid-cols-3) 2xl:(grid-cols-5) items-stretch"
      >
        <div
          v-for="item in 8"
          :key="item._id"
          class="card-secondary rounded-[20px] relative flex justify-between flex-col gap-2 w-full p-[20px] v-rounded <sm:( p-4)"
        >
          <USkeleton class="!rounded-lg h-[288px] w-full" />
          <div class="flex items-center gap-2 w-full">
            <USkeleton class="!rounded-lg w-1/3 h-[13px]" />
            <USkeleton class="!rounded-lg w-[20px] h-[20px]" />
          </div>
          <USkeleton class="!rounded-lg w-2/3 h-[13px]" />
          <USkeleton class="!rounded-lg w-4/5 h-[13px]" />

          <USkeleton class="!rounded-lg w-1/2 h-[13px] mt-4" />
          <USkeleton class="!rounded-lg w-full h-[13px]" />
          <USkeleton class="!rounded-lg w-full h-[13px]" />

          <div class="flex gap-4 w-full h-[40px] mt-4">
            <USkeleton class="!rounded-lg w-full h-[40px]" />
            <USkeleton class="!rounded-lg w-full h-[40px]" />
          </div>
        </div>
      </div>
      <div
        v-else
        class="grid w-full <sm:(grid-cols-1 gap-3) sm:(grid-cols-2 gap-4) md:(grid-cols-2 gap-4) lg:(grid-cols-3) xl:(grid-cols-3) 2xl:(grid-cols-5) items-stretch"
      >
        <CardItem
          v-for="(item, index) in promotionList"
          :key="index"
          :image="usePromotionData(item)?.image[width <= 640 ? 'mobile' : 'desktop']"
          :label="usePromotionData(item)?.['title']"
          :code="usePromotionData(item)?.['code']"
          :detail="usePromotionData(item)?.['detail']"
          :start-date="dateFormat(item.start_date)"
          :end-date="dateFormat(item.end_date)"
          :is-redeem="usePromotionData(item)?.['type'] === 'redeem'"
          :redeem="usePromotionData(item)?.['redeem']"
          :is-expired="usePromotionData(item)?.['isExpires']"
          :tier="item.tierDetail"
          :show-select-button="!!user && !['promote'].includes(item?.promotion?.sub_type)"
          width="280"
          height="280"
          @on-read="onRead(item)"
          @selected="handlePromotionSelected"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.promotion-wrapper {
  .animate-pulse {
    background-color: rgb(231, 226, 226);
  }
}
</style>
