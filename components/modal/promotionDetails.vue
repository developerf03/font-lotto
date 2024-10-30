<script setup>
import placeholder from '~/constants/placeholder'

// Composables
const { promotionDetailsModal, showPaymentModal, showPromotionDetailsModal } = useModals()
const { locale } = useI18n()
const { width } = useWindowSize()
const { user } = useAuth()

// computed
const promotionSelectedDetail = computed(() => usePromotionData(promotionDetailsModal.value.item))
const remainingQuota = computed(
  () =>
    promotionSelectedDetail?.value?.redeem?.redeemLimit -
      promotionSelectedDetail?.value?.redeem?.redeemCount || 0,
)

// function
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

const handlePromotionSelected = (code) => {
  showPromotionDetailsModal(false, null)
  showPaymentModal(true, 'deposit', code)
}
</script>

<template>
  <BaseModal
    id="promotion-details-wrapper"
    v-model="promotionDetailsModal.active"
    :title="promotionSelectedDetail?.title"
  >
    <div class="w-full pt-4">
      <div class="w-[288px] h-[288px] mx-auto">
        <div class="card-image relative overflow-hidden">
          <img
            :src="
              promotionSelectedDetail?.image[width <= 640 ? 'mobile' : 'desktop'] ||
              placeholder?.placeholderPromotion
            "
            :alt="label"
            class="w-full h-full absolute top-0 left-0 object-cover rounded-[17px]"
          />
        </div>
      </div>
      <div class="flex items-center gap-2 mt-4">
        <div class="<sm:text-sm sm:text-sm md:text-base">
          {{ t('code') }}:
          <span class="text-highlight"> {{ promotionSelectedDetail?.code }}</span>
        </div>
        <UIcon
          name="i-tabler:copy"
          class="w-5 h-5 cursor-pointer pointer-events-auto text-[var(--icon-default)]"
          @click="useCopyClipboard(promotionSelectedDetail?.code)"
        />
      </div>
      <div class="flex items-center gap-2 mt-4">
        <div class="font-medium <sm:text-sm sm:text-sm md:text-base">{{ t('startDate') }}:</div>
        <div
          class="font-normal <sm:text-sm sm:text-sm md:text-base"
          :class="promotionSelectedDetail?.isExpires ? 'text-tertiary' : 'text-highlight'"
        >
          {{ dateFormat(promotionSelectedDetail?.startDate) }}
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="font-medium <sm:text-sm sm:text-sm md:text-base">{{ t('endDate') }}:</div>
        <div
          class="font-normal <sm:text-sm sm:text-sm md:text-base"
          :class="promotionSelectedDetail?.isExpires ? 'text-tertiary' : 'text-highlight'"
        >
          {{ dateFormat(promotionSelectedDetail?.endDate) }}
        </div>
      </div>
      <div v-if="promotionSelectedDetail?.type" class="flex items-center gap-2 mt-4">
        <div class="font-medium <sm:text-sm sm:text-sm md:text-base">
          {{ t('remainingGuota') }}:
        </div>
        <span
          class="font-normal <sm:text-sm sm:text-sm md:text-base"
          :class="remainingQuota ? 'text-highlight' : 'text-danger'"
        >
          {{ remainingQuota || t('overGuota') }}
        </span>
      </div>
      <div class="mt-4 <sm:text-sm sm:text-sm md:text-base font-semibold">
        {{ t('details') }}
      </div>
      <div
        class="mt-1 font-normal <sm:text-sm sm:text-sm md:text-base indent-md"
        v-html="promotionSelectedDetail?.detail || '-'"
      />
      <!-- deposit conditions -->
      <div
        v-if="
          promotionSelectedDetail.condition.deposit?.length &&
          !['promote'].includes(promotionSelectedDetail?.subType)
        "
      >
        <div class="mt-4 <sm:text-sm sm:text-sm md:text-base font-semibold">
          {{ t('depositConditions') }}
        </div>
        <div class="mt-2 font-normal <sm:text-sm sm:text-sm md:text-base">
          <ul class="list-disc pl-8">
            <li v-for="(condition, i) in promotionSelectedDetail.condition.deposit" :key="i">
              {{ condition }}
            </li>
          </ul>
        </div>
      </div>
      <!-- withdraw conditions -->
      <div
        v-if="
          promotionSelectedDetail.condition.withdraw?.length === 1 &&
          !['promote'].includes(promotionSelectedDetail?.subType)
        "
      >
        <div class="mt-4 <sm:text-sm sm:text-sm md:text-base font-semibold">
          {{ t('withdrawalConditions') }}
        </div>
        <div class="mt-2 font-normal <sm:text-sm sm:text-sm md:text-base">
          <ul class="list-disc pl-8">
            <li
              v-for="(condition, index) in promotionSelectedDetail.condition.withdraw[0]"
              :key="index"
            >
              {{ condition }}
            </li>
          </ul>
        </div>
      </div>
      <!-- withdraw group conditions -->
      <div
        v-if="
          promotionSelectedDetail.condition.withdraw?.length > 1 &&
          !['promote'].includes(promotionSelectedDetail?.subType)
        "
      >
        <div class="mt-4 <sm:text-sm sm:text-sm md:text-base font-semibold">
          {{ t('withdrawalConditions') }}
        </div>
        <div
          v-for="(conditionGroup, index) in promotionSelectedDetail.condition.withdraw"
          :key="index"
          class="mt-2 font-normal <sm:text-sm sm:text-sm md:text-base"
        >
          <p class="text-highlight indent-sm">
            {{ t('conditionsGroup', { n: index + 1 }) }}
          </p>
          <ul class="list-disc pl-8">
            <li v-for="(condition, i) in conditionGroup" :key="i">
              {{ condition }}
            </li>
          </ul>
        </div>
      </div>
      <!-- Benefits -->
      <div v-if="!['promote'].includes(promotionSelectedDetail?.subType)" class="mt-4">
        <p class="<sm:text-sm sm:text-sm md:text-base font-semibold mb-2">
          {{ t('benefits') }}
        </p>
        <ul class="list-disc pl-8 text-sm sm:text-base">
          <li v-for="(benefit, index) in promotionSelectedDetail.benefits" :key="index">
            {{ benefit }}
          </li>
        </ul>
      </div>
      <!-- Note -->
      <p
        v-if="
          promotionSelectedDetail.condition.withdraw?.length > 1 &&
          !['promote'].includes(promotionSelectedDetail?.subType)
        "
        class="mt-6 text-danger"
      >
        {{ t('note') }}: {{ t('withdrawalCondition1') }}
      </p>
      <UButton
        v-if="!!user && !['promote'].includes(promotionSelectedDetail?.subType)"
        :label="t('selectPromo')"
        size="sm"
        variant="solid"
        class="mt-4"
        :disabled="promotionSelectedDetail?.isExpires"
        @click="handlePromotionSelected(promotionSelectedDetail?.code)"
      />
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
#promotion-details-wrapper {
  .card-image {
    padding-top: calc(288 / 288 * 100%);
  }
}
</style>
