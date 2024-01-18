
import toast from 'react-hot-toast'

const toastStyles = {
  color: '#fff',
  textAlign: 'center',
  backgroundColor: '#27592d',
  letterSpacing: '0.14px'
}

export const notifySuccess = (message) =>
  toast.success(message, {
    position: 'top-right',
    style: toastStyles
  })
