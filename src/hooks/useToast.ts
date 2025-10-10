import { useCallback } from 'react'
import { toastActions } from '@/stores/toast'
import type { Toast } from '@/stores/toast'

export function useToast() {
  const toast = useCallback(
    (props: Omit<Toast, 'id'> & { duration?: number }) => {
      return toastActions.add(props)
    },
    []
  )

  return { toast }
}