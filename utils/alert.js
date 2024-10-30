export const alertSuccess = ({ title, text } = {}) => {
  const { $i18n } = useNuxtApp()

  useAlert({
    autoHide: false,
    status: 'success',
    title: title ?? $i18n.t('success'),
    text,
  })
}

export const alertError = ({ title, text } = {}) => {
  const { $i18n } = useNuxtApp()

  useAlert({
    autoHide: false,
    status: 'error',
    title: title ?? $i18n.t('anErrorOccurred'),
    text,
  })
}

export const alertWarning = ({ title, text } = {}) => {
  const { $i18n } = useNuxtApp()

  useAlert({
    autoHide: false,
    status: 'warning',
    title: title ?? $i18n.t('warning'),
    text,
  })
}

export const toastSuccess = (text) => {
  const { toast } = useToast()

  toast(text, {
    theme: 'auto',
    type: 'success',
    dangerouslyHTMLString: true,
  })
}

export const toastError = (text) => {
  const { toast } = useToast()

  toast(text, {
    theme: 'auto',
    type: 'error',
    // dangerouslyHTMLString: true,
  })
}
