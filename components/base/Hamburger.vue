<script setup>
// Props
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Boolean,
    default: false,
  },
  useValue: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div
    class="box"
    :class="{ '!pointer-events-none': useValue }"
    @click="!useValue && emit('update:modelValue', !modelValue)"
  >
    <div
      class="btn"
      :class="[
        { active: useValue ? value : modelValue },
        { 'not-active': useValue ? !value : !modelValue },
      ]"
    >
      <span />
      <span />
      <span />
    </div>
  </div>
</template>

<style lang="css" scoped>
.btn {
  width: 24px;
  cursor: pointer;
}

span {
  display: block;
  width: 100%;
  box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  height: 2px;
  background: var(--icon-default);
  transition: all 0.3s;
  position: relative;
}

span:nth-child(2) {
  display: block;
  width: 70%;
  margin-left: auto;
  box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  height: 2px;
  background: var(--icon-default);
  transition: all 0.3s;
  position: relative;
}

span + span {
  margin-top: 4px;
}

.active span:nth-child(1) {
  animation: ease 0.6s top forwards;
}

.not-active span:nth-child(1) {
  animation: ease 0.6s top-2 forwards;
}

.active span:nth-child(2) {
  animation: ease 0.6s scaled forwards;
}

.not-active span:nth-child(2) {
  animation: ease 0.6s scaled-2 forwards;
}

.active span:nth-child(3) {
  animation: ease 0.6s bottom forwards;
}

.not-active span:nth-child(3) {
  animation: ease 0.6s bottom-2 forwards;
}

@keyframes top {
  0% {
    top: 0;
    transform: rotate(0);
  }
  50% {
    top: 6px;
    transform: rotate(0);
  }
  100% {
    top: 6px;
    transform: rotate(45deg);
  }
}

@keyframes top-2 {
  0% {
    top: 6px;
    transform: rotate(45deg);
  }
  50% {
    top: 6px;
    transform: rotate(0deg);
  }
  100% {
    top: 0;
    transform: rotate(0deg);
  }
}

@keyframes bottom {
  0% {
    bottom: 0;
    transform: rotate(0);
  }
  50% {
    bottom: 6px;
    transform: rotate(0);
  }
  100% {
    bottom: 6px;
    transform: rotate(135deg);
  }
}

@keyframes bottom-2 {
  0% {
    bottom: 6px;
    transform: rotate(135deg);
  }
  50% {
    bottom: 6px;
    transform: rotate(0);
  }
  100% {
    bottom: 0;
    transform: rotate(0);
  }
}

@keyframes scaled {
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes scaled-2 {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
