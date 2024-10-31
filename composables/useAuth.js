import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {
  const { login, logout, fetchUser, jwtRefreshToken, shouldRefresh, setToken, setRefreshToken } =
    useAuthStore()
  const { user, loading, isAuthenticated, accessToken, refreshToken, loadingFetchUser } =
    storeToRefs(useAuthStore())

  const activeWallet = computed(() =>
    user.value?.wallets?.find((v) => v.type === user.value?.player?.defaultCurrency),
  )
  const currency = computed(() => user.value?.player?.defaultCurrency)
  const balance = computed(() => activeWallet?.balance || 0)
  const userPlayer = computed(() => user.value?.player)

  const setCookie = (payload = {}) => {
    if (payload === null) {
      user.value = null

      return
    }

    user.value = {
      accessToken: payload?.accessToken,
      refreshToken: payload?.refreshToken,
    }
  }

  const setTokenAndCookie = (payload = {}) => {
    setToken(payload?.accessToken)
    setRefreshToken(payload.refreshToken)
    setCookie({ accessToken: payload?.accessToken, refreshToken: payload?.refreshToken })
  }

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
    setTokenAndCookie,
  }
}

export const useCheckAuth = () => {
  const { user } = storeToRefs(useAuthStore())

  if (!user.value) {
    return false
  }

  return true
}
