'use client'
import { toast } from 'sonner'
interface ErrorComponentProps {
  type: string
  message: string
}
const ErrorComponent = (props: ErrorComponentProps) => {
  const { type, message } = props
  

  return (
    type === 'error' ? toast.error(message) : toast.success(message)
  )
}

export default ErrorComponent