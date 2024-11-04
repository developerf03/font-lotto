<script setup>
// Composables
const { launcherModal } = useModals()
</script>

<!-- https://huaydragon.com/login -->
<template>
  <BaseModal
    v-model="launcherModal.open"
    disable-click-out
    content-class="!w-[100vw] !max-w-full 2xl:!max-w-[1446px]"
  >
    <div class="w-full h-[85vh] pt-4">
      <iframe
        id="iframeRef"
        :src="`https://huaydragon.com/results${launcherModal.sectionScroll}`"
        frameborder="0"
        class="w-full h-full"
        @load="aaa"
      />
    </div>
  </BaseModal>
</template>
