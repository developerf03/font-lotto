<script setup>
import placeholder from '~/constants/placeholder'

defineProps({
  id: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  detail: {
    type: String,
    default: '',
  },
  code: {
    type: String,
    default: '',
  },
  layoutsClass: {
    type: String,
    default: 'flex-col',
  },
  lineClampDetails: {
    type: String,
    default: 'line-clamp-3', // line-clamp-1, line-clamp-2, line-clamp-3 , other
  },
  isRedeem: {
    type: Boolean,
    default: false,
  },
  redeem: {
    type: Object,
    default: () => {},
  },
  startDate: {
    type: String,
    default: '',
  },
  endDate: {
    type: String,
    default: '',
  },
  isExpired: {
    type: Boolean,
    default: false,
  },
  tier: {
    type: Object,
    default: Object,
  },
  showSelectButton: {
    type: Boolean,
    default: true,
  },
  width: {
    type: [String, Number],
    default: '288',
  },
  height: {
    type: [String, Number],
    default: '288',
  },
})

const emit = defineEmits(['onRead', 'selected'])

// function
const onRead = (emitVal) => {
  emit(emitVal)
}
</script>

<template>
  <div
    :id="id"
    class="promotion-card-wrapper card-secondary rounded-[20px] relative flex justify-between gap-2 w-full p-[20px] v-rounded <sm:( p-4)"
    :class="layoutsClass"
  >
    <div class="card-image relative overflow-hidden">
      <img
        :src="image || placeholder?.placeholderPromotion"
        :alt="label"
        class="w-full h-full absolute top-0 left-0 object-cover rounded-[17px]"
      >
    </div>
    <div>
      <div class="flex items-center gap-2">
        <span class="font-normal <sm:text-sm sm:text-sm md:text-base">{{ t('code') }}: </span>
        <span
          class="text-highlight font-normal <sm:text-sm sm:text-sm md:text-base"
          >{{ code }}</span
        >
      </div>
      <span v-if="tier.name" class="text-highlight text-base">({{ tier.name }})</span>
      <div class="flex items-center gap-2">
        <div class="font-medium <sm:text-sm sm:text-sm">{{ t('startDate') }}:</div>
        <div
          class="font-normal <sm:text-sm sm:text-sm"
          :class="isExpired ? 'text-tertiary' : 'text-highlight'"
        >
          {{ startDate }}
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="font-medium <sm:text-sm sm:text-sm">{{ t('endDate') }}:</div>
        <div
          class="font-normal <sm:text-sm sm:text-sm"
          :class="isExpired ? 'text-tertiary' : 'text-highlight'"
        >
          {{ endDate }}
        </div>
      </div>
    </div>
    <div>
      <div class="line-clamp-1 font-semibold <sm:text-sm sm:text-sm md:text-base capitalize">
        {{ label || '-' }}
      </div>
      <div
        class="line-clamp-2 font-normal <sm:text-xs sm:text-xs md:text-base"
        v-html="detail || '-'"
      />
    </div>
    <div v-if="isRedeem" class="font-medium <sm:text-sm sm:text-sm md:text-base">
      <span class="mr-2">{{ t('remainingGuota') }}: </span>
      <span v-if="remainingQuota">{{ remainingQuota }}</span>
      <span v-else class="text-danger">{{ t('overGuota') }}</span>
    </div>

    <div class="flex justify-between gap-2 mt-2">
      <UButton
        :label="t('seeDetails')"
        size="sm"
        variant="outline"
        :disabled="isDisable"
        @click="onRead('onRead')"
      />
      <UButton
        v-if="showSelectButton"
        :label="t('selectPromo')"
        size="sm"
        variant="solid"
        :disabled="isDisable"
        @click="emit('selected', code)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.promotion-card-wrapper {
  box-shadow: 0px 4px 8px 0px #6c6c6c29;
  .card-image {
    padding-top: calc(v-bind(height) / v-bind(width) * 100%);
  }
}
</style>
