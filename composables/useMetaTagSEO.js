export const useMetaTagSEO = ({
  title,
  description,
  image,
  url,
  keywords,
  type = 'website',
  faviconUrl,
} = {}) => {

  const openGraph = () => {
    return [
      {
        property: 'og:title',
        hid: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        hid: 'og:description',
        content: description,
      },
      {
        property: 'og:type',
        hid: 'og:type',
        content: type
      },
      url && {
        property: 'og:url',
        hid: 'og:type',
        content: url
      },
      image && {
        property: 'og:image',
        hid: 'og:image',
        content: image
      },
    ].filter((v) => v)
  }

  const twitterCard = () => {
    return [
      {
        name: 'twitter:card',
        hid: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        hid: 'twitter:title',
        content: description,
      },
      {
        name: 'twitter:description',
        hid: 'twitter:description',
        content: description,
      },
      image && {
        name: 'twitter:imagee',
        hid: 'twitter:image',
        content: image,
      },
      url && {
        name: 'twitter:site',
        hid: 'twitter:site',
        content: url,
      },
    ].filter((v) => v)
  }

  useHead({
    title: title,
    meta: [
      {
        name: 'title',
        hid: 'title',
        content: title,
      },
      {
        name: 'description',
        hid: 'description',
        content: title,
      },
      {
        name: 'keywords',
        hid: 'keywords',
        content: keywords,
      },
      ...openGraph(),
      ...twitterCard(),
    ],
    link: [
      faviconUrl && {
        rel: 'icon',
        type: 'image/x-icon',
        href: faviconUrl,
      },
    ].filter((v) => v)
  })
}
