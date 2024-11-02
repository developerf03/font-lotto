import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {
  // State
  const error = ref(null)
  const loading = ref(false)

  // Functions
  const register = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/auth/v2/signup', payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data.value
  }

  const profileCheckData = async (payload = {}) => {
    const { data, error } = await useAPI().get('/api/profile/checkData', payload)

    if (error.value) return Promise.reject(error.value)

    return data
  }

  const updateProfilePlayer = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/auth/changeProfile', payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data
  }

  const sendOTP = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/auth/v2/sendOtp', payload) // register,forgotpassword,changeprofile,withdraw,firsttimedeposit

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data.value
  }

  const verifyOTP = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/auth/v2/verifyOtp', payload) // register,forgotpassword,changeprofile,withdraw,firsttimedeposit

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data.value
  }

  const editPhoneSendOTP = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/auth/mobile/otp/send/one', payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data.value
  }

  const editPhoneVerifyOTP = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/auth/mobile/otp/verify/one', payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data.value
  }

  const changePhoneNumber = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/auth/mobile/phone/update', payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data
  }

  const changeNewPassword = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/auth/v2/forgotPassword/changePassword', payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data
  }

  const forgetPasswordSendOTP = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/auth/mobile/otp/password/send', payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data.value
  }

  const forgetPasswordVerifyOTP = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/auth/mobile/otp/password/verify', payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data.value
  }

  const forgetPasswordChangePasswordOTP = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/auth/mobile/password/change', payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data.value
  }

  const updateProfileV2 = async (payload = {}) => {
    loading.value = true
    const { data, error } = await useAPI().post('/api/auth/v2/changeProfile', payload)

    loading.value = false
    if (error.value) return Promise.reject(error.value)

    return data
  }

  // getters

  return {
    loading,
    error,
    sendOTP,
    register,
    verifyOTP,
    editPhoneSendOTP,
    editPhoneVerifyOTP,
    changePhoneNumber,
    profileCheckData,
    changeNewPassword,
    updateProfilePlayer,
    forgetPasswordSendOTP,
    forgetPasswordVerifyOTP,
    forgetPasswordChangePasswordOTP,
    updateProfileV2,
  }
})
