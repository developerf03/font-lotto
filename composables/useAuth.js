import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {
  const { login, logout, fetchUser, jwtRefreshToken, shouldRefresh } = useAuthStore()
  const { user, loading, isAuthenticated, accessToken, refreshToken, loadingFetchUser } =
    storeToRefs(useAuthStore())

  const activeWallet = computed(() =>
    user.value?.wallets?.find((v) => v.type === user.value?.player?.defaultCurrency),
  )
  const currency = computed(() => user.value?.player?.defaultCurrency)
  const balance = computed(() => activeWallet?.balance || 0)
  const userPlayer = computed(() => user.value?.player)

  return {
    user,
    userPlayer,
    loading,
    isAuthenticated,
    accessToken,
    refreshToken,
    loadingFetchUser,
    activeWallet,
    currency,
    balance,

    login,
    logout,
    fetchUser,
    jwtRefreshToken,
    shouldRefresh,
  }
}

export const useCheckAuth = () => {
  const { user } = storeToRefs(useAuthStore())

  if (!user.value) {
    return false
  }

  return true
}
