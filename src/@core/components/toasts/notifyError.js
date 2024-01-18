import toast from 'react-hot-toast'

const toastError = {
  color: '#fff',
  textAlign: 'center',
  backgroundColor: 'red',
  letterSpacing: '0.14px'
}

export const notifyError = (message) =>
  toast.error(message, {
    position: 'top-right',
    style: toastError
  })
