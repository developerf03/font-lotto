<script setup>

</script>

<template>
  <LayoutHeader />
  <main class="flex w-full">
    <LayoutSidebar />
    <div class="w-full flex flex-col p-4 sm:p-10">
      <slot  />
    </div>
  </main>
  <LayoutFooter />
</template>