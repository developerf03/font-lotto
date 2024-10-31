/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { timeDiff } from '@/utils/date'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // const { disconnectSocket } = useSocket()

    // State
    const accessToken = useCookie('accessToken')
    const refreshToken = useCookie('refreshToken')
    const user = ref(null)
    const loading = ref(false)
    const loadingFetchUser = ref(false)
    const isTokenRefreshing = ref(false)

    // Computed
    const isAuthenticated = computed(() => !!user.value)

    // Watch
    // watch(user, (newUser) => {
    // Handle after logout
    //   if (!newUser) {
    //     $navigateTo('/login')
    //   }
    // })

    // Functions
    const login = async (payload = {}) => {
      const apiUrl = 'phone' in payload ? '/api/auth/mobile/signin' : '/api/auth/signin'

      try {
        loading.value = true
        const res = await useAPI().$post(apiUrl, payload)

        accessToken.value = res.accessToken
        refreshToken.value = res.refreshToken

        // After authen
        await fetchUser()
        // useFetchAfterAuthen()
      } catch (error) {
        return Promise.reject(error.value)
      } finally {
        loading.value = false
      }
    }

    const logout = () => {
      user.value = null
      accessToken.value = null
      refreshToken.value = null
      // disconnectSocket()
    }

    const fetchUser = async () => {
      try {
        loadingFetchUser.value = true
        const res = await useAPI().$get('/api/auth/profile')

        user.value = res
      } catch (error) {
        user.value = null
      } finally {
        loadingFetchUser.value = false
      }
    }

    const jwtRefreshToken = async () => {
      if (isTokenRefreshing.value) return
      isTokenRefreshing.value = true

      try {
        const res = await useAPI().$post('/api/auth/refreshtoken', {
          refreshToken: refreshToken.value,
        })

        setTimeout(() => (isTokenRefreshing.value = false), 1000)
        accessToken.value = res.accessToken
        refreshToken.value = res.refreshToken

        return res.accessToken
      } catch (error) {
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

    const setToken = (data) => {
      accessToken.value = data
    }

    const setRefreshToken = (data) => {
      refreshToken.value = data
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
      setToken,
      setRefreshToken,
    }
  },
  // {
  //   persist: {
  //     storage: persistedState.localStorage,
  //   },
  // },
)
