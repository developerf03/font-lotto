
export const globalAlerts = ref({
  show: false,
  title: null,
  text: null,
  confirmButtonText: null,
  cancelButtonText: null,
  html: null,
  duration: null,
  confirmCallback: null,
  cancelCallback: null,
  closeCallback: null,
  clickToClose: true,
  logo: false,
  success: false,
  error: false,
  warning: false,
  copy: false,
  info: false,
  wifi: false,
  noWifi: false,
  autoHide: true,
  // showCountdown: false,
})

let globalAlertTimeoutID = null

export const useClearAlert = () => {
  globalAlerts.value = {}
  clearTimeout(globalAlertTimeoutID)
}

// function set state alobal alert And set timeout
export const useAlert = ({
  title, // title alert
  text, // text alert
  confirmButtonText, // confirm button text
  cancelButtonText, // cancel button text
  html, // element
  duration = 2000, // time to close
  confirmCallback, // use confirm callback
  cancelCallback, // use cancel callback
  closeCallback,
  clickToClose = true, // close when click outside
  logo,
  success,
  error,
  warning,
  copy,
  info,
  wifi,
  noWifi,
  autoHide = true, // auto hide
  // showCountdown,
} = {}) => {
  globalAlerts.value = {
    show: true,
    title,
    text,
    confirmButtonText,
    cancelButtonText,
    html,
    duration,
    confirmCallback,
    cancelCallback,
    closeCallback,
    clickToClose,
    logo,
    success,
    error,
    warning,
    copy,
    info,
    wifi,
    noWifi,
    autoHide,
    // showCountdown,
  }

  if (autoHide && !confirmButtonText && !cancelButtonText && clickToClose) {
    clearTimeout(globalAlertTimeoutID)
    globalAlertTimeoutID = setTimeout(() => {
      useClearAlert()
    }, duration + 1000)
  }
}
