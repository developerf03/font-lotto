import { useStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware((to, from) => {
  // const { isAuthenticated } = useAuth()

  // if (!isAuthenticated.value) {
  //   return $navigateTo('/login')
  // }
  
  // check set query utm_source to local storage
  if (from.query?.utm_source) {
    const utm = useStorage('utm_source', '')

    utm.value = from.query?.utm_source
  }

  if (from.query?.aff_regis_code) {
    const affCode = useStorage('aff_regis_code', '')

    affCode.value = from.query?.aff_regis_code
  }

  if (from.query?.ref) {
    const referCode = useStorage('ref', '')

    referCode.value = from.query?.ref
  }

})
