import { Store } from '@tanstack/store'
import { useStore } from '@tanstack/react-store'

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

interface ToastState {
  toasts: Record<string, Toast>
  nextId: number
}

const initialState: ToastState = {
  toasts: {},
  nextId: 0,
}

export const toastStore = new Store<ToastState>(initialState)

export const toastSelectors = {
  selectAll: (state: ToastState) => Object.values(state.toasts),
  selectToast: (id: string) => (state: ToastState) => state.toasts[id],
}

export const toastActions = {
  add(props: Omit<Toast, 'id'> & { duration?: number }) {
    const { duration = 3000, ...rest } = props
    const state = toastStore.state
    const id = String(state.nextId)

    const toast: Toast = {
      id,
      ...rest,
    }

    toastStore.setState(prev => ({
      toasts: {
        ...prev.toasts,
        [id]: toast,
      },
      nextId: prev.nextId + 1,
    }))

    setTimeout(() => {
      this.remove(id)
    }, duration)

    return id
  },

  remove(id: string) {
    toastStore.setState(prev => {
      const next = { ...prev.toasts }
      delete next[id]
      return { ...prev, toasts: next }
    })
  },

  clear() {
    toastStore.setState(prev => ({ ...prev, toasts: {} }))
  },
}

export function useToastList() {
  return useStore(toastStore, toastSelectors.selectAll)
}