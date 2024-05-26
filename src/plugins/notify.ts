import type { ToastServiceMethods } from 'primevue/toastservice'

export default class Notify {
  static success(toast: ToastServiceMethods, message: string) {
    toast.add({ severity: 'success', summary: 'Успешно', detail: message })
  }

  static info(toast: ToastServiceMethods, message: string) {
    toast.add({ severity: 'info', summary: 'Информация', detail: message })
  }

  static warn(toast: ToastServiceMethods, message: string) {
    toast.add({ severity: 'warn', summary: 'Предупреждение', detail: message })
  }

  static error(toast: ToastServiceMethods, message: string) {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: message })
  }
}
