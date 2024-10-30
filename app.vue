<script setup>
const theme = useCookie('theme', { default: () => 'dark-theme' })
const { locale } = useI18n()
</script>

<template>
  <Html :class="theme" :lang="locale">
    <Head>
      <Title>{{ $t('welcome') }}</Title>
    </Head>
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <NuxtNotifications position="top right" :speed="1000" />
    </Body>
  </Html>
</template>

<style>
</style>