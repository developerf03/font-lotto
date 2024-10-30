<script setup>
const { login } = useAuth()
const form = reactive({
  username: 'nottlotto',
  password: 'Aa123456',
})
const handleLogin = async () => {
  try {
    await login({
      playerUsername: form.username,
      password: form.password
    })
    console.log('login success!');
    $navigateTo('/')
  } catch (error) {
    console.log('login fialed!', error);
  }
}
</script>

<template>
  <div class="flex flex-col gap-2 w-[-webkit-fill-available] sm:w-[400px] bg-blue-gray-700 p-10 rounded-lg mx-auto">
    <h2 class="text-white text-xl">{{ $t('login') }}</h2>
    <input v-model="form.username" type="text" class="p-3" :placeholder="$t('username')">
    <input v-model="form.password"  type="text" class="p-3" :placeholder="$t('password')">
    <button class="p-3 bg-blue-400 cursor-pointer font-semibold" @click="handleLogin">{{ $t('login') }}</button>
  </div>
</template>