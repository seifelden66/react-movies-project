interface MovieCardSkeletonProps {
    count?: number;
  }
  
  export const MovieCardSkeleton = ({ count = 10 }: MovieCardSkeletonProps) => {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm animate-pulse"
          >
            <div className="relative pb-[150%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
            
            <div className="p-4">
              <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-3/4 mb-2" />
              
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded w-1/4 mb-3" />
              
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full w-16" />
            </div>
          </div>
        ))}
      </>
    );
  };