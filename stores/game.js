import { defineStore } from 'pinia'

export const useGameStore = defineStore(
  'game',
  () => {
    // State
    const loading = ref(false)
    const games = reactive({
      category: {},
      search: {
        list: [],
        total: 0,
      },
      demo: {},
      favorite: {
        list: [],
      },
      recently: {
        list: [],
      },
    })

    // Computed
    const getGamesByCategory = computed(() => (category) => games[category])
    const isFavoriteGame = computed(
      () =>
        ({ partner, gameId } = {}) =>
          !!games.favorite.list.find((v) => v.partner === partner && v.gameId === gameId),
    )

    // Functions
    const fetchGames = async (payload = {}) => {

      loading.value = true
      const { data, error } = await useAPI().post('/api/v2/game/gameSearch', payload)

      loading.value = false
      if (error.value) return new Promise.reject(error.value)

      if ('partner' in payload) {
        const field = 'isDemo' in payload ? 'demo' : 'category'

        if (payload.page !== 1) {
          games[field][payload.partner] = {
            list: [...games[field][payload.partner].list, ...data.value.list],
            page: data.value.page,
            pageTotal: data.value.pageTotal,
          }
        } else {
          games[field][payload.partner] = {
            list: data.value.list,
            page: data.value.page,
            pageTotal: data.value.pageTotal,
          }
        }
      } else {
        games.search = data.value
      }

      return data.value
    }

    const getGameDetail = async (payload = {}) => {
      loading.value = true
      const { data, error } = await useAPI().get('/api/v2/game/gameDetail', payload)

      loading.value = false
      if (error.value) return Promise.reject(error.value)

      return data.value
    }

    const fetchSpecialGames = async (payload = {}) => {
      loading.value = true
      const { data, error } = await useAPI().post('/api/game/specialGameList', payload)

      loading.value = false
      if (error.value) return Promise.reject(error.value)
      games.games[payload.categories] = data.value.list
    }

    const fetchFavoriteGames = async () => {
      loading.value = true
      const { data, error } = await useAPI().post('/api/v2/game/getGameFavorite')

      loading.value = false
      if (error.value) return Promise.reject(error.value)
      games.favorite.list = data.value.favorites
    }

    const manageStateFavoriteGame = ({ partner, gameId, type } = {}) => {
      if (type === 'follow') {
        games.favorite.list.unshift({ partner, gameId })
      } else if (type === 'unfollow') {
        games.favorite.list.splice(
          games.favorite.list.findIndex((v) => v.partner === partner && v.gameId === gameId),
          1,
        )
      }
    }

    const setFavoriteGame = async (payload) => {
      manageStateFavoriteGame(payload)
      const { data, error } = await useAPI().post('/api/v2/game/gameFavorite', {
        providerPrefix: payload.partner,
        gameId: payload.gameId,
        type: payload.type,
      })

      if (error.value) return Promise.reject(error.value)

      return data.value
    }

    const fetchRecentPlayGames = async () => {
      loading.value = true
      const { data, error } = await useAPI().post('/api/v2/game/getGameRecentPlay')

      loading.value = false
      if (error.value) return Promise.reject(error.value)
      games.recently.list = data.value.recentPlay
    }

    const launcher = async (payload = {}) => {
      loading.value = true
      const { data, error } = await useAPI().post('/api/game/launcher', payload)

      loading.value = false
      if (error.value) return Promise.reject(error.value)

      return data
    }

    const launcherDemo = async (payload = {}) => {
      loading.value = true
      const { data, error } = await useAPI().post('/api/game/launcherDemo', payload)

      loading.value = false
      if (error.value) return Promise.reject(error.value)

      return data
    }

    return {
      loading,
      games,

      getGamesByCategory,
      isFavoriteGame,

      getGameDetail,
      fetchFavoriteGames,
      fetchGames,
      fetchRecentPlayGames,
      fetchSpecialGames,
      launcher,
      launcherDemo,
      setFavoriteGame,
    }
  },
  // {
  //   persist: {
  //     storage: persistedState.localStorage,
  //   },
  // },
)
