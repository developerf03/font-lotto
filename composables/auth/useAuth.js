import { jwtDecode } from 'jwt-decode'
import { timeDiff } from '@/utils/date'
import { useAuthUser } from './useAuthUser'

export const useAuth = () => {
  const user = useAuthUser()
  const loading = ref(false)
  const loadingFetchUser = ref(false)
  const accessToken = useCookie('accessToken')
  const refreshToken = useCookie('refreshToken')
  const isTokenRefreshing = ref(false)

  // Computed
  const isAuthenticated = computed(() => !!user.value)

  // Watch
  // watch(user, (newUser) => {
  // Handle after logout
  // if (!newUser) {
  //   $navigateTo('/login')
  // }
  // })

  // Functions
  const login = async (payload = {}) => {
    const apiUrl = 'phone' in payload ? '/api/auth/mobile/signin' : '/api/auth/signin'

    loading.value = true
    const { data, error } = await useAPI().post(apiUrl, payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)
    accessToken.value = data.value.accessToken
    refreshToken.value = data.value.refreshToken

    // After authen
    setTimeout(async () => {
      return await fetchUser()
      // useFetchAfterAuthen()
    }, 300)
  }

  const logout = () => {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    // disconnectSocket()
  }

  const fetchUser = async () => {
    loadingFetchUser.value = true

    const { data } = await useAPI().get('/api/auth/profile')

    user.value = data.value
    loadingFetchUser.value = false

    return data.value
  }

  const jwtRefreshToken = async () => {
    if (isTokenRefreshing.value) return
    isTokenRefreshing.value = true
    const { data, error } = await useAPI().post('/api/auth/refreshtoken', {
      refreshToken: refreshToken.value,
    })

    setTimeout(() => (isTokenRefreshing.value = false), 1000)

    if (!error.value) {
      accessToken.value = data.value?.accessToken
      refreshToken.value = data.value?.refreshToken

      return data.value?.accessToken
    } else {
      user.value = null

      return null
    }
  }

  const shouldRefresh = () => {
    if (accessToken.value) {
      const decoded = jwtDecode(accessToken.value)
      const nowTime = Date.now()
      const expTime = decoded.exp * 1000
      const diff = timeDiff(expTime, nowTime)

      return diff.secondTotal < 0
    }

    return false
  }

  return {
    user,
    loading,
    isAuthenticated,
    accessToken,
    refreshToken,
    loadingFetchUser,

    login,
    logout,
    fetchUser,
    jwtRefreshToken,
    shouldRefresh,
  }
}
