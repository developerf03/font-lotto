 
import { defineStore } from 'pinia'

export const useInformationStore = defineStore(
  'information',
  () => {
    // Composables
    // const { langDefault } = useLobbySetting()
    // const { $i18n } = useNuxtApp()
    const { user } = useAuth()

    // State
    const loading = ref(false)
    const promotes = ref([])
    const promotesDontShowAgainDuration = ref(24)
    const showAllCloseBtn = ref(false)
    const information = ref({
      faq: {},
      privacyPolicy: {},
      cookiePolicy: {},
      termsAndCondition: {},
      social: {},
    })

    // Functions
    // const getPromotes = async () => {
    //   loading.value = true
    //   const { data, error } = await useAPI().get('/api/promote')

    //   loading.value = false
    //   if (error.value) return Promise.reject(error.value)
    //   promotes.value = data.value.data || []
    //   showAllCloseBtn.value = data.value?.showAllCloseBtn
    //   promotesDontShowAgainDuration.value = data.value?.dontShowAgainDuration || 24
    // }

    const getPromotes = async () => {
      try {
        loading.value = true
        const res = await useAPI().$get('/api/promote')
        
        promotes.value = res.data || []
        showAllCloseBtn.value = res?.showAllCloseBtn
        promotesDontShowAgainDuration.value = res?.dontShowAgainDuration || 24
      } catch (error) {
        return new Promise.reject(error)
      } finally {
        loading.value = false
      }
    }

    const getInformations = async () => {
      try {
        loading.value = true
        const { data } = await useAPI().$get('/api/information')

        if (!isObjEmpty(data))
          information.value = data
      } catch (error) {
        return Promise.reject(error)
      } finally {
        loading.value = false
      }
    }

    // Computed
    const activePromotes = computed(() =>
      promotes.value.filter((v) => v?.isActive && v?.type === 'promote'),
    )
    // const socials = computed(() => {
    //   const socialList =
    //     information.value.social[localeProperties.value.IETF] ?? information.value.social[langDefault] ?? []

    //   return socialList.filter((o) => o?.key !== 'phone')
    // })
    // const phone = computed(() => {
    //   const phoneList =
    //     information.value.social[localeProperties.value.IETF] ?? information.value.social[langDefault] ?? []

    //   return phoneList.find((o) => o?.key === 'phone')
    // })
    // const socialsChat = computed(() => {
    //   const socials =
    //     information.value.social[localeProperties.value.IETF] ?? information.value.social[langDefault]

    //   return {
    //     contact: socials?.find((v) => v.key === 'contact')?.value,
    //     whatsapp: socials?.find((v) => v.key === 'whatsapp')?.value,
    //     telegram: socials?.find((v) => v.key === 'telegram'),
    //     line: socials?.find((v) => v.key === 'line')?.value,
    //     kakaotalk: socials?.find((v) => v.key === 'kakaotalk')?.value,
    //   }
    // })
    const popupAnnouncement = computed(() => {
      const today = new Date()
      const type = user.value?.player?.playerId ? 'popup_afterlogin' : 'popup_prelogin'

      return promotes.value?.filter((o) => {
        const startDate = new Date(o?.startDate)
        const endDate = new Date(o?.endDate)

        return o?.type === type && o?.isActive && today >= startDate && today <= endDate
      })
    })

    return {
      activePromotes,
      loading,
      information,
      // phone,
      popupAnnouncement,
      // socials,
      // socialsChat,
      promotesDontShowAgainDuration,
      showAllCloseBtn,

      getInformations,
      getPromotes,
    }
  },
  // {
  //   persist: {
  //     storage: persistedState.localStorage,
  //   },
  // },
)
