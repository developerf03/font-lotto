<script setup>
// props
defineProps({
  overlay: {
    type: Boolean,
    default: true,
  },
  fullscreen: {
    type: Boolean,
    required: false,
  },
  disableClickOut: {
    type: Boolean,
    default: false, // false = Close , true = Open
  },
  transition: {
    type: Boolean,
    default: false, // false = Close , true = Open
  },
  title: {
    type: String,
    default: '',
  },
  titlePosition: {
    type: String,
    default: 'left', // left | center | right
  },
  hideIconClose: {
    type: Boolean,
    default: true,
  },
  logo: {
    type: Boolean,
    default: false,
  },
  contentClass: {
    type: String,
    default: 'false',
  },
})

// State
const modalRef = ref(null)

// emit
const emit = defineEmits(['opened', 'closed'])

const vFocus = {
  mounted: (el) => {
    emit('opened')
    document.activeElement.blur()
    el.focus()
  },
}
</script>

<template>
  <UModal
    ref="modalRef"
    :overlay="overlay"
    :transition="transition"
    :fullscreen="fullscreen"
    :prevent-close="disableClickOut"
    @after-leave="emit('closed')"
  >
    <div
      v-focus
      class="w-full flex items-center flex-col relative p-4 lg:(py-5 px-6)"
      :class="[contentClass, { 'not-fullscreen': !fullscreen }]"
    >
      <div class="flex justify-center items-start flex-col w-full">
        <nuxt-icon
          v-if="hideIconClose"
          name="svg/close"
          class="cursor-pointer svg-cancel text-base ml-auto"
          @click="emit('update:modelValue', false)"
        />
        <BaseLogo v-if="logo" class="mx-auto" />
        <div
          v-if="title"
          class="flex flex-col justify-center w-full text-xl mb-4 <sm:text-lg"
          :class="[
            { 'items-start': titlePosition === 'left' },
            { 'items-center': titlePosition === 'center' },
            { 'items-end': titlePosition === 'right' },
          ]"
        >
          {{ title }}
        </div>
      </div>
      <slot /></div
  ></UModal>
</template>

<style lang="scss">
.body-modal {
  .not-fullscreen {
    width: 100%;
    height: 100%;
    // max-width: 500px !important;
    min-height: 100px !important;
  }
  .svg-cancel {
    transform: rotate(0);
    transition: all 0.3s;

    &:hover {
      transform: rotate(90deg);
    }
  }
}
</style>
