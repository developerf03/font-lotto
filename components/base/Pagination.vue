<script setup>
// import

const emit = defineEmits(['next', 'prev', 'update:currPage'])

// props

const props = defineProps({
  currPage: {
    type: Number,
    require: true,
    default: 0,
  },
  totalPage: {
    type: Number,
    require: true,
    default: 0,
  },
  actionUpdate: {
    type: Boolean,
    default: false,
  },
})

// function
const pageCalculator = (emitName, value) => {
  if (props.actionUpdate) {
    if (emitName === 'next' && props.currPage < props.totalPage) {
      emit(emitName, value)
    }
    if (emitName === 'prev' && props.currPage > 1) {
      emit(emitName, value)
    }
  } else {
    if (emitName === 'next' && props.currPage < props.totalPage) {
      emit('update:currPage', props.currPage + value)
    }
    if (emitName === 'prev' && props.currPage > 1) {
      emit('update:currPage', props.currPage + value)
    }
  }
}
</script>

<template>
  <div class="pagination-wrapper flex flex-row items-center justify-center gap-6 w-full">
    <div
      class="btn-wrapper btn-tertiary rounded-[5px] !h-9 !w-9"
      @click="pageCalculator('prev', -1)"
    >
      <nuxt-icon
        name="svg/arrow-left"
        class=""
        :class="
          currPage === 1
            ? 'text-[var(--icon-inactive)]'
            : 'text-[var(--icon-default)] cursor-pointer'
        "
      />
    </div>
    <div class="flex flex-row gap-1 text-base font-normal">
      <span>{{ currPage }}</span>
      <span>/</span>
      <span>{{ totalPage }}</span>
    </div>
    <base-button
      class="btn-wrapper btn-tertiary rounded-[5px] !h-9 !w-9"
      @click="pageCalculator('next', 1)"
    >
      <nuxt-icon
        name="svg/arrow-right"
        class=""
        :class="
          currPage === totalPage
            ? 'text-[var(--icon-inactive)]'
            : 'text-[var(--icon-default)] cursor-pointer'
        "
      />
    </base-button>
  </div>
</template>
