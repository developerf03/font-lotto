// https://nuxt.com/docs/api/configuration/nuxt-config
import { locales } from './locales/setting'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: false,
  devtools: { enabled: false },
  colorMode: {
    preference: 'nuxt',
  },
  app: {
    head: {
      htmlAttrs: {
        class: '',
      },
      title: 'Test',
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no, initial-scale=1.0, viewport-fit=cover',
        },
      ],
    },
  },

  css: ['~/assets/styles/main.scss'],

  // Components
  components: {
    dirs: [
      {
        path: '~/components/base',
        global: true,
        prefix: 'base',
      },
      {
        path: '~/components',
        global: false,
        pathPrefix: false,
      },
    ],
  },

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'nuxt3-notifications',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-icons',
    '@nuxt/ui',
  ],

  ui: {
    global: true,
  },

  // Runtime Config
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '',
    // Keys within public are also exposed client-side
    public: {
      baseURL: process.env.API_URL,
      socketUrl: process.env.SOCKETIO_URL,
      xSignature: process.env.X_SIGNATURE,
      theme: process.env.THEME,
    },
  },

  // i18n
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'th'
    },
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    locales,
    defaultLocale: 'th',
    vueI18n: './i18n.config.ts',
  },
})
