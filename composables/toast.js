import { toast } from 'vue3-toastify'
import ToastCustom from '~/components/toast/ToastCustom.vue'

export const useToasts = () => {
  const success = ({ status = 'success', text, duration = 3000 } = {}) => {
    toast(ToastCustom, {
      closeOnClick: false,
      data: { status, text, duration },
      autoClose: duration,
    })
  }

  const error = ({ status = 'error', text, duration = 3000 } = {}) => {
    toast(ToastCustom, {
      closeOnClick: false,
      data: { status, text, duration },
      autoClose: duration,
    })
  }

  const copy = ({ status = 'copy', text, duration = 2000 } = {}) => {
    toast(ToastCustom, {
      closeOnClick: false,
      data: { status, text, duration },
      autoClose: duration,
    })
  }

  return { success, error, copy }
}
