'use client'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const showSuccessNotification = (message: string | undefined) => {
  toast.success(message, {
    autoClose: 2000,
    delay: 0,
    hideProgressBar: true
  })
}

export const showErrorNotification = (message: string | undefined) => {
  toast.error(message, {
    autoClose: 2000,
    delay: 0,
    hideProgressBar: true
  })
}

export const showErrorNotification3000 = (message: any) => {
  toast.error(message, {
    autoClose: 2000,
    delay: 0
  })
}

// export const showErrorNotificationNottime = (message: any) => {
//   toast.error(message, {
//     autoClose: false,
//     delay: 0,
//     bodyClassName: 'text-sm font-semibold',
//     autoClose: false,
//     closeOnClick: true
//   })
// }
