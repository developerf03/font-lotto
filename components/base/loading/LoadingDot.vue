<template>
  <div class="loading-dot-wrapper">
    <div class="dot" />
    <div class="dot" />
    <div class="dot" />
  </div>
</template>

<style lang="scss" scoped>
.loading-dot-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-dot-wrapper {
  .dot {
    border-radius: 50%;
    width: 17px;
    height: 17px;
    animation-fill-mode: both;
    animation: bblFadInOut 1s infinite ease-in-out;
    background: rgba(255, 255, 255, 0.7);
  }
  &.xs {
    .dot {
      width: 18px;
      height: 18px;
    }
  }
  &.sm {
    .dot {
      width: 24px;
      height: 24px;
    }
  }
  &.md {
    .dot {
      width: 28px;
      height: 28px;
    }
  }
  &.lg {
    .dot {
      width: 36px;
      height: 36px;
    }
  }
}
.loading-dot-wrapper > .dot:nth-child(1) {
  animation-delay: -0.6s;
}
.loading-dot-wrapper > .dot:nth-child(2) {
  animation-delay: -0.4s;
}
.loading-dot-wrapper > .dot:nth-child(3) {
  animation-delay: -0.2s;
}
@keyframes bblFadInOut {
  0%,
  80%,
  100% {
    transform: scale(0.35);
  }
  40% {
    transform: scale(0.5);
  }
}
</style>
