export const $navigateTo = (opt) => {
  const localePath = useLocalePath()

  return navigateTo(localePath(opt))
}