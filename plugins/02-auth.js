export default defineNuxtPlugin(async ({ $pinia }) => {
  const { fetchUser, shouldRefresh, jwtRefreshToken } = useAuthStore($pinia)
  const { accessToken } = storeToRefs(useAuthStore($pinia))

  if (accessToken.value) {
    if (shouldRefresh()) {
      await jwtRefreshToken()
    }
    await fetchUser()
  }
})
