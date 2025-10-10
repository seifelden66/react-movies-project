import { Check, X, AlertCircle } from 'lucide-react'
import { useToastList, toastActions } from '@/stores/toast'

export function Toaster() {
  const toasts = useToastList()

  return (
    <div className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col p-4 sm:top-0 sm:right-0 sm:flex-col md:max-w-[420px]">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`mb-2 flex gap-3 rounded-lg border p-4 shadow-lg animate-in fade-in slide-in-from-bottom-5 ${
            toast.variant === 'destructive'
              ? 'border-red-500/50 bg-red-50'
              : 'border-green-500/50 bg-green-50'
          }`}
        >
          {toast.variant === 'destructive' ? (
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          ) : (
            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            {toast.title && (
              <p
                className={`font-medium ${
                  toast.variant === 'destructive'
                    ? 'text-red-900'
                    : 'text-green-900'
                }`}
              >
                {toast.title}
              </p>
            )}
            {toast.description && (
              <p
                className={`text-sm ${
                  toast.variant === 'destructive'
                    ? 'text-red-800'
                    : 'text-green-800'
                }`}
              >
                {toast.description}
              </p>
            )}
          </div>
          <button
            onClick={() => toastActions.remove(toast.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}