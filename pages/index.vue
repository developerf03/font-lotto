<script setup>
definePageMeta({
  middleware: ['auth'],
})

const { user } = useAuth()
</script>

<template>
  <h1 class="text-primary">{{ $t('welcome') }}</h1>
  <pre class="text-primary">{{ user }}</pre>
  <span @click="$navigateTo('/gallery')" class="text-primary text-2xl mt-4 cursor-pointer mx-auto">To gallery page</span>
</template>