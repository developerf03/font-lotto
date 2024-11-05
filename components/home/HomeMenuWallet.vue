<script setup>
// Props
defineProps({
  balance: {
    type: [String, Number],
    default: '',
  },
})

// Composables
const { showPaymentModal } = useModals()
</script>

<template>
  <div
    class="home-menu-wallet flex items-center justify-between rounded-[10px] card-secondary w-full p-3 xl:p-4"
  >
    <div class="flex flex-col">
      <span class="text-xs text-secondary">{{ t('balance') }}</span>
      <span class="text-2xl text-primary font-medium !leading-7 lg:text-xl">{{
        $format.currency(balance)
      }}</span>
    </div>
    <UButton
      :label="t('deposit')"
      class="w-max min-w-[110px]"
      size="md"
      @click="showPaymentModal(true, 'deposit', null)"
    >
      <template #leading>
        <UIcon name="i-tabler:wallet" class="w-6 h-6" />
      </template>
    </UButton>
  </div>
</template>
