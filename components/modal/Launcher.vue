<script setup>
// Composables
const { launcherModal } = useModals()

// States

watch(launcherModal.value, () => {})
const aaa = (e) => {
  const iframe = document.getElementById('iframeRef')
  console.log(iframe)
  const iframeContent = iframe?.contentWindow || iframe?.contentDocument

  // Scroll the iframe's content to a specific position, e.g., 0px horizontally, 500px vertically.
  iframeContent.scrollTo(0, 500)
}
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
        src="https://huaydragon.com/results"
        frameborder="0"
        class="w-full h-full"
        @load="aaa"
      />
    </div>
  </BaseModal>
</template>
