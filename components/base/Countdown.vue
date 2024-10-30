<script setup>
// Props
const props = defineProps({
  time: {
    type: Number, // millisec
    required: true,
  },
  padStart: {
    type: Boolean,
    required: false,
  },
})
const emit = defineEmits(['end', 'start'])

// State
const timer = reactive({
  interval: null,
  countdownTime: props.time,
  currTime: props.time,
  finished: false,
  result: {
    hours: 0,
    minutes: 0,
    seconds: 0,
    fullSeconds: null,
  },
})

// Watch
watch(() => props.time, (val) => {
  clearInterval(timer.interval)
  timer.interval = null
  timer.currTime = val
  timer.countdownTime = val
  start()
})

// Hooks
onBeforeMount(() => {
  clearInterval(timer.interval)
})

onMounted(() => {
  props.time && start()
  timer.result = props.padStart
    ? Object.keys(timer.result)
        .map((v) => ({ [v]: ('0' + timer.result[v]).slice(-2) }))
        .reduce((c, n) => ({ ...c, ...n }), {})
    : timer.result
})

// Functions
const calTime = (milliseconds) => {
  const time = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    fullSeconds: 0,
  }
  time.fullSeconds = Math.floor(milliseconds / 1000)
  time.hours = Math.floor(milliseconds / 1000 / 60 / 60)
  milliseconds -= time.hours * 1000 * 60 * 60
  time.minutes = Math.floor(milliseconds / 1000 / 60)
  milliseconds -= time.minutes * 1000 * 60
  time.seconds = Math.floor(milliseconds / 1000)
  milliseconds -= time.seconds * 1000
  return props.padStart
    ? Object.keys(time)
        .map((v) => ({ [v]: ['fullSeconds'].includes(v) ? time[v] : ('0' + time[v]).slice(-2) }))
        .reduce((c, n) => ({ ...c, ...n }), {})
    : time
}

const start = () => {
  if (timer.countdownTime > 0 && timer.interval === null) {
    timer.finished = false
    emit('start')
    timer.interval = setInterval(() => {
      timer.result = calTime(timer.countdownTime)
      timer.countdownTime -= 1000
      if (timer.countdownTime <= -1) {
        clearInterval(timer.interval)
        timer.interval = null
        timer.finished = true
        timer.countdownTime = 0
        emit('end')
      }
    }, 1000)
  }
}

</script>

<template>
  <div>
    <slot v-bind="timer.result"/>
  </div>
</template>
