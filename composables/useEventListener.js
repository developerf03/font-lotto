export const useVisibilitychange = () => {
  const { user, fetchUser } = useAuth()
  const route = useRoute()

  document.addEventListener('visibilitychange', () => {
    useCloseLoading()

    if (document.visibilityState === 'visible' && user.value) {
      fetchUser()
    }

    if (route.name === 'events-lucky-wheel') {
      if (document.visibilityState === 'visible') {
        // onMusic()
      } else {
        // offSpinSound()
        // offMusic()
      }
    }
  })
}
