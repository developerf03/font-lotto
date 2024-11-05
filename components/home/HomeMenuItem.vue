<script setup>
// Props
defineProps({
  icon: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  background: {
    type: String,
    default: '',
  },
  sectionScroll: {
    type: String,
    default: '',
  },
})

// Composables
const { handleLauncherModal } = useModals()
</script>

<template>
  <div
    class="provider-item-wrapper w-full card-secondary border border-solid border-[var(--provider-item-border)] rounded-[10px] p-3 flex items-center gap-[14px] cursor-pointer relative overflow-hidden mlg:px-4"
    @click="handleLauncherModal(true, sectionScroll)"
  >
    <img :src="background" alt="provider background" class="provider-background" >
    <img :src="icon" :alt="name" srcset="" class="w-6 rounded-full relative" >
    <span class="text-sm text-secondary font-medium relative mlg:text-base">{{ name }}</span>
  </div>
</template>

<style lang="scss" scoped>
.provider-item-wrapper {
  &:hover {
    box-shadow: var(--provider-shadow);

    .provider-background {
      opacity: 1;
    }
    span {
      color: var(--font-white);
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.35);
    }
  }
  span,
  .provider-background {
    transition: all 0.35s;
  }
  .provider-background {
    pointer-events: none;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
