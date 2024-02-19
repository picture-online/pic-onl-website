import { toast as toastMain } from 'vue-sonner'
import type { ExternalToast } from 'vue-sonner/lib/types'

export type ToastType = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR' | 'DEFAULT'
// export type PluginOptionsType = PluginOptions

export default () => {
  const toastInstance = toastMain

  const toast = (message: string, toastType: ToastType = 'DEFAULT', modifierOptions?: ExternalToast) => {
    const defaultOptions = toastCfg().defaultOptions()
    // const defaultOptions: ExternalToast = {}
    const options: ExternalToast = { ...defaultOptions, ...modifierOptions }

    let id
    switch (toastType) {
      case 'SUCCESS':
        id = toastInstance.success(message, options)
        break
      case 'INFO':
        id = toastInstance.info(message, options)
        break
      case 'WARNING':
        id = toastInstance.warning(message, options)
        break
      case 'ERROR':
        id = toastInstance.error(message, options)
        break
      default:
        id = toastInstance(message, options)
    }
    return [id, toastInstance]
  }

  return {
    toast
    // ToastPosition: vueToastification.POSITION
  }
}
