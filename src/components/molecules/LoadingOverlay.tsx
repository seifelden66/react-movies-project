import { Spinner } from '../atoms/Spinner';
import { Text } from '../atoms/Text';

interface LoadingOverlayProps {
  message?: string;
}

export const LoadingOverlay = ({ message = 'Loading...' }: LoadingOverlayProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg text-center">
        <Spinner size="lg" />
        <Text className="mt-4">{message}</Text>
      </div>
    </div>
  );
};