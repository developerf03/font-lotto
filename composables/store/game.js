import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game'

export const useGame = () => {
  // State
  const { loading, games, getGamesByCategory, isFavoriteGame } = storeToRefs(useGameStore())

  // Methods
  const {
    getGameDetail,
    fetchFavoriteGames,
    fetchGames,
    fetchRecentPlayGames,
    fetchSpecialGames,
    launcher,
    launcherDemo,
    setFavoriteGame,
  } = useGameStore()

  return {
    // State
    loading,
    games,
    // Getters
    getGamesByCategory,
    isFavoriteGame,
    // Actions
    getGameDetail,
    fetchFavoriteGames,
    fetchGames,
    fetchRecentPlayGames,
    fetchSpecialGames,
    launcher,
    launcherDemo,
    setFavoriteGame,
  }
}

export const useLaunchGame = async ({
  partner,
  gameId,
  locale,
  lobby = false,
  widget,
  widgetDetails,
} = {}) => {
  // State
  const playGameSelectCurrencyModal = useState('playGameSelectCurrencyModal', () => ({
    show: false,
    supportedCurrencies: [],
  }))
  // Compodables
  const { user } = useAuth()
  const { launcher } = useGame()
  const { getProviderByPartner } = useProvider()
  const { _route: route } = useNuxtApp()

  // Computed
  const providerDetail = computed(() => getProviderByPartner.value(partner))
  const isCurrentCurrencySupported = computed(() => {
    return providerDetail.value?.currencies?.includes(user.value?.player?.defaultCurrency)
  })

  // Init
  if (!useCheckAuth()) return

  // Set route from
  localStorage.setItem(
    'routeFrom',
    JSON.stringify({
      name: route.name,
      path: route.path,
      fullPath: route.fullPath,
      params: route.params,
    }),
  )

  // check currency supported
  if (!widget) {
    if (!isCurrentCurrencySupported.value) {
      if (providerDetail.value?.currencies) {
        playGameSelectCurrencyModal.value.show = true
        playGameSelectCurrencyModal.value.postBody = {
          playerUsername: user.value?.player?.playerUsername,
          partner,
          gameId,
          exchange: {
            source: user.value?.player?.defaultCurrency,
            target: user.value?.player?.defaultCurrency,
          },
          settings: {
            eurl: `${location.origin}${route.fullPath}`,
            lang: locale,
          },
        }
        playGameSelectCurrencyModal.value.supportedCurrencies = providerDetail.value?.currencies
      } else {
        alertError(t('noProvidersFound'))
      }

      return
    }
  }

  try {
    useShowLoading()
    const res = await launcher({
      playerUsername: user.value?.player?.playerUsername,
      partner,
      gameId,
      exchange: {
        source: user.value?.player?.defaultCurrency,
        target: user.value?.player?.defaultCurrency,
      },
      settings: {
        eurl: `${location.origin}${route.fullPath}`,
        lang: locale,
      },
      lobby,
      widget,
      widgetDetails,
    })

    useLauncherRouter(res.value.launcher, 'popup')
  } catch (error) {
    alertError(useErrorMsg({ error }))
  } finally {
    useCloseLoading()
  }
}
