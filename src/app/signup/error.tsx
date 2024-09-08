'use client' // Error components must be Client Components
import { toast, Toaster } from 'sonner'
import { useEffect } from 'react'

const Error = ({ error, reset }: {
  error: Error & { digest?: string }
  reset: () => void
}) => {

  useEffect(() => {
    // console.error(error.message)
    toast.error(error.message)
  }, [error])

  return <Toaster />

}
export default Error