import { useCallback } from 'react'

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

let toastId = 0
const toastListeners: Set<(toast: Toast) => void> = new Set()
const toastRemoveListeners: Set<(id: string) => void> = new Set()
const activeToasts: Set<string> = new Set()

export function useToast() {
  const toast = useCallback((props: Omit<Toast, 'id'> & { duration?: number }) => {
    const id = String(toastId++)
    const { duration = 3000, ...rest } = props

    const toastItem: Toast = {
      id,
      ...rest,
    }

    activeToasts.add(id)
    toastListeners.forEach(listener => listener(toastItem))

    setTimeout(() => {
      activeToasts.delete(id)
      toastRemoveListeners.forEach(listener => listener(id))
    }, duration)

    return id
  }, [])

  return { toast }
}

export function useToastListener() {
  return { toastListeners, toastRemoveListeners }
}

export function hasActiveToasts(): boolean {
  return activeToasts.size > 0
}