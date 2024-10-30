export const useLoading = () => useState('loading', () => false)
export const useSplashScreen = () => useState('splashScreen', () => true)

export const useShowLoading = () => {
  const loading = useLoading()

  loading.value = true
}

export const useCloseLoading = () => {
  const loading = useLoading()

  loading.value = false
}

export const useShowSplashScreen = () => {
  const splashScreen = useSplashScreen()

  splashScreen.value = true
}

export const useCloseSplashScreen = () => {
  const splashScreen = useSplashScreen()

  splashScreen.value = false
}
