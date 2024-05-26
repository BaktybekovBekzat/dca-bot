import { format } from 'date-fns'

export function formatDate(date: Date, dateFormat = 'dd-MM-yyyy') {
  if (!date) return ''
  return format(new Date(date), dateFormat)
}
