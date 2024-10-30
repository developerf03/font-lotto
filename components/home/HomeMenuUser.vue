<script setup>
import { convertPhoneNumberDash } from '~/utils/utils'

// Props
defineProps({
  phone: {
    type: String,
    default: '',
  },
})

// Composabels
const menu = useSubMenu()
</script>

<template>
  <div class="home-menu-user flex justify-between rounded-[10px] card-secondary w-full p-4">
    <div class="flex flex-col">
      <span class="text-xs text-secondary">ยูสเซอร์</span>
      <span class="text-base text-primary font-medium mlg:text-lg">{{
        convertPhoneNumberDash(phone)
      }}</span>
    </div>

    <slot>
      <UPopover :popper="{ placement: 'bottom-end' }">
        <UButton label="เมนู" class="w-max min-w-[110px]" size="sm" variant="outline">
          <template #trailing>
            <UIcon name="i-tabler:align-right" class="w-6 h-6" />
          </template>
        </UButton>

        <template #panel>
          <div class="py-2 w-[200px]">
            <UVerticalNavigation :links="menu" />
          </div>
        </template>
      </UPopover>
    </slot>
  </div>
</template>
