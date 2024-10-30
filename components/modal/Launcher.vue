<script setup>
// Composables
const { launcherModal } = useModals()
</script>

<template>
  <BaseModal
    v-model="launcherModal.open"
    disable-click-out
    content-class="!w-[100vw] !max-w-full 2xl:!max-w-[1446px]"
  >
    <div class="w-full h-[85vh] pt-4">
      <iframe src="https://huaydragon.com/results" frameborder="0" class="w-full h-full" />
    </div>
  </BaseModal>
</template>
