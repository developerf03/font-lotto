<script setup>
definePageMeta({
  // middleware: ['auth'],
  layout: 'home',
})
useHead({
  title: t('home'),
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: t('home'),
    },
  ],
})
</script>

<template>
  <HomeContainer />
</template>
