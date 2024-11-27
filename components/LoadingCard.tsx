const LoadingCard = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm animate-pulse">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200/80 rounded-full w-28"></div>
        <div className="h-4 bg-gray-200/80 rounded-full w-16"></div>
      </div>

      {/* Main content section */}
      <div className="mt-6 space-y-4">
        {/* Title and subtitle */}
        <div className="space-y-3">
          <div className="h-5 bg-gray-200/80 rounded-full w-3/4"></div>
          <div className="h-4 bg-gray-200/80 rounded-full w-1/2"></div>
        </div>

        {/* Main image placeholder */}
        <div className="h-52 bg-gray-200/80 rounded-lg w-full"></div>

        {/* Footer section */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-gray-200/80 rounded-full w-24"></div>
          <div className="h-8 bg-gray-200/80 rounded-md w-28"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard; 