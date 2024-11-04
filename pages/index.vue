<script setup>
import { nextTick } from 'vue'

const { fetchGames } = useGame()

definePageMeta({
  // middleware: ['auth'],
  layout: 'home',
})

onMounted(() => {
  nextTick(() => {
    fetchGames({
      page: 1,
      pageSize: 30,
      currency: useDefaults()?.currencyCode,
    })
  })
})
</script>

<template>
  <HomeContainer />
</template>
