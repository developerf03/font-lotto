export default defineNuxtPlugin(() => {
  const setting = useSetting()
  const gtag = setting.value?.gaTag

  const initGTAG = (gtagId) => {
    function gtag() {
      window.dataLayer.push(arguments)
    }

    window.dataLayer = window.dataLayer || []

    gtag('js', new Date())
    gtag('config', gtagId)

    useHead({
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
          async: true,
        },
      ],
    })
  }

  if (gtag) initGTAG(gtag)

})
