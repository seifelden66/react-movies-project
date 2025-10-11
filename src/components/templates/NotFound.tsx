import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/atoms/Button'
import { Text } from '@/components/atoms/Text'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate({ to: '/' })} 
          className="mb-6"
        >
        
          Back to Home
        </Button>

        <div className="text-center py-20">
          
          <Text variant="h1" className="text-6xl font-bold text-gray-900 mb-4">
            404
          </Text>

          <Text variant="h2" className="text-2xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </Text>

          <Text variant="body" className="text-gray-600 mb-12 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist
          </Text>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => navigate({ to: '/' })}
              variant="primary"
            >
              Go to Home
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}