const LoadingCard = () => {
  return (
    <div className="startup-card animate-pulse">
      <div className="flex-between">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="flex gap-1.5">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-48 bg-gray-200 rounded w-full mb-4"></div>
          <div className="flex-between gap-3">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard; 