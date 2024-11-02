export const useErrorMsg = ({ code = '', error = {}, message = '', custom = {} } = {}) => {
  error = error?.data || {}
  const { $i18n } = useNuxtApp()
  const errorCode = code || error.code

  let errorCustomMsg = ''
  let errorTranslated = errorCode ? $i18n.t(errorCode) : ''
  const errorMgsFromInvalidList = error.invalidList?.length ? error.invalidList[0]?.message : ''

  // Check translated of error code
  errorTranslated = `${errorTranslated}` === `${errorCode}` ? '' : errorTranslated

  // Check custom message
  const codeKeys = Object.keys(custom)

  if (codeKeys.length && errorCode && codeKeys.includes(`${errorCode}`)) {
    errorCustomMsg = custom[errorCode]
  }

  return message || errorTranslated || errorMgsFromInvalidList || errorCustomMsg || error?.message
}
