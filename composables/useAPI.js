/* eslint-disable no-unused-vars */
export const useAPI = () => {
  const { notify } = useNotification()
  const config = useRuntimeConfig()
  const lang = useCookie('i18n_redirected')
  const { jwtRefreshToken, logout, accessToken } = useAuth()
  const { $i18n } = useNuxtApp()

  // Functions
  const getHeaders = (path) => {
    if (!bearerIgnorePath.some((v) => path.includes(v)) && accessToken.value)
      Object.assign(headers, tokenBearer)

    return headers
  }

  const getTimeHeader = () => {
    const date = new Date()

    return {
      timstamp: date.toString().slice(0, date.toString().indexOf('(')),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  }

  // Variables
  const bearerIgnorePath = [
    '/signin',
    '/specialGameList',
    '/gameSearch',
    '/refreshtoken',
    '/providerSearch',
    '/assets',
    '/setting',
    '/promote',
    '/information',
    '/getHeaderInfo',
  ]
  const tokenBearer = {
    Authorization: `Bearer ${accessToken.value}`,
  }

  const headers = {
    'x-signature': config.public.xSignature,
    lang: $i18n.localeProperties.value?.IETF,
    timestamp: getTimeHeader().timstamp,
    timezone: getTimeHeader().timezone,
  }

  // Using interceptors
  const onRequest = ({ request, options }) => {}

  const onRequestError = ({ request, options, error }) => {}

  const onResponse = ({ request, response, options }) => {}

  const onResponseError = async ({ request, response, options }) => {
    /*
      3002: Request Token Invalid
      3004: Request Token Expired
      3009: RefreshToken Not Found
      4004: Session Not Found
      4038: Token has been destroy
      5008: Unauthorized
    */
    // response.data
    const statusCode = response._data.code || 500
    const statusMessage = response.statusText || ''
    const errorsMsg = response._data || {}

    if ([3002, 3004].includes(response._data.code)) {
      await jwtRefreshToken()
    }

    if ([4038].includes(response._data.code)) {
      useAlert({
        error: true,
        text: t('sorryThereWasLoginFromAnother'),
      })
    }

    // if ([5008].includes(response._data.code)) {
    //   alertError({ title: t('sorryYourTokenExpiredPleaseLoginAgain') })
    // }

    if ([3009, 4004, 4038, 5008].includes(response._data.code)) {
      logout()
    }
  }

  // Options
  const options = (method, request, payload, opts) => {
    return {
      baseURL: config.public.baseURL,
      headers: getHeaders(request),
      method,
      ...payload,
      ...opts,
      onRequest,
      onRequestError,
      onResponse,
      onResponseError,
    }
  }

  return {
    get: (request, payload, opts) =>
      useFetch(request, options('GET', request, { params: payload }, opts)),
    $get: (request, payload, opts) =>
      $fetch(request, options('GET', request, { params: payload }, opts)),
    post: (request, payload, opts) =>
      useFetch(request, options('POST', request, { body: payload }, opts)),
    $post: (request, payload, opts) =>
      $fetch(request, options('POST', request, { body: payload }, opts)),
    update: (request, payload, opts) =>
      useFetch(request, options('UPDATE', request, { body: payload }, opts)),
    delete: (request, payload, opts) =>
      useFetch(request, options('DELETE', request, { body: payload }, opts)),
    patch: (request, payload, opts) =>
      useFetch(request, options('PATCH', request, { body: payload }, opts)),
    put: (request, payload, opts) =>
      useFetch(request, options('PUT', request, { body: payload }, opts)),
  }
}
