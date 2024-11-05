<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import copy from '~/assets/icons/lottie/copy.json'
import success from '~/assets/icons/lottie/success.json'
import error from '~/assets/icons/lottie/error.json'
import info from '~/assets/icons/lottie/info.json'
import warning from '~/assets/icons/lottie/warning.json'
import wifi from '~/assets/icons/lottie/wifi.json'
import noWifi from '~/assets/icons/lottie/noWifi.json'
import wallet from '~/assets/icons/lottie/wallet.json'
// computed
const isConfirmDialog = computed(
  () => globalAlerts.value.confirmButtonText && globalAlerts.value.cancelButtonText,
)

// function
const handleConfirmSubmit = () => {
  globalAlerts.value.show = false
  if (globalAlerts.value.confirmCallback) {
    globalAlerts.value.confirmCallback()
  }
}
const handleCancelSubmit = () => {
  globalAlerts.value.show = false
  if (globalAlerts.value.cancelCallback) {
    globalAlerts.value.cancelCallback()
  }
}
</script>

<template>
  <UModal
    id="AlertWrapper"
    :model-value="globalAlerts.show"
    :overlay="false"
    :transition="false"
    :fullscreen="false"
    :prevent-close="true"
  >
    <client-only>
      <div class="w-full flex justify-center items-center flex-col gap-2 p-4">
        <BaseLogo v-if="globalAlerts?.logo" />
        <Vue3Lottie
          v-if="globalAlerts?.success"
          :animation-data="success"
          :height="100"
          :width="100"
        />
        <Vue3Lottie v-if="globalAlerts?.copy" :animation-data="copy" :height="100" :width="100" />
        <Vue3Lottie v-if="globalAlerts?.error" :animation-data="error" :height="100" :width="100" />
        <Vue3Lottie
          v-if="globalAlerts?.warning"
          :animation-data="warning"
          :height="100"
          :width="100"
        />
        <Vue3Lottie v-if="globalAlerts?.info" :animation-data="info" :height="100" :width="100" />
        <Vue3Lottie v-if="globalAlerts?.wifi" :animation-data="wifi" :height="100" :width="100" />
        <Vue3Lottie
          v-if="globalAlerts?.wallet"
          :animation-data="wallet"
          :height="100"
          :width="100"
        />
        <Vue3Lottie
          v-if="globalAlerts?.noWifi"
          :animation-data="noWifi"
          :height="100"
          :width="100"
        />
        <div
          v-if="globalAlerts.title"
          class="font-medium text-primary"
          :class="isConfirmDialog ? 'text-xl' : 'text-xl <sm:(text-lg)'"
        >
          {{ globalAlerts.title }}
        </div>
        <p v-if="globalAlerts.text" class="text-lg text-center <sm:(text-base)">
          {{ globalAlerts.text }}
        </p>
        <div
          v-if="globalAlerts.cancelButtonText || globalAlerts.confirmButtonText"
          class="w-full flex justify-center gap-4 mt-4 max-w-[400px]"
        >
          <UButton
            v-if="globalAlerts.cancelButtonText"
            :label="globalAlerts.cancelButtonText || 'Cancel'"
            variant="outline"
            :class="globalAlerts.confirmButtonText ? 'btn-secondary' : 'btn-primary'"
            @click="handleCancelSubmit"
            @touchend="handleCancelSubmit"
          />
          <UButton
            v-if="globalAlerts.confirmButtonText"
            :label="globalAlerts.confirmButtonText || 'OK'"
            variant="solid"
            :class="[isConfirmDialog ? 'min-w-[120px]' : 'min-w-[200px]']"
            @click="handleConfirmSubmit"
            @touchend="handleConfirmSubmit"
          />
        </div>
      </div> </client-only
  ></UModal>
</template>

<style lang="scss">
#AlertWrapper {
  z-index: 9999 !important;
  .body-modal {
    min-width: 300px !important;
    box-shadow: 0px 2px 10px 0px #000000 !important;
  }
}
</style>
