export function HomeSkeleton() {
  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Hero Section */}
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-gray-300/50 to-transparent animate-pulse" />
      </div>
      
      {/* Featured Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="h-6 sm:h-8 w-48 sm:w-64 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse mb-6 sm:mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 space-y-4 hover:shadow-md transition-shadow duration-300 animate-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'backwards' }}
            >
              <div className="h-40 sm:h-48 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse" />
              <div className="h-5 sm:h-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
              <div className="h-3 sm:h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Brands Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-gray-50/50">
        <div className="h-6 sm:h-8 w-40 sm:w-48 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse mb-6 sm:mb-8" />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className="h-16 sm:h-20 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function StockSkeleton() {
  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="h-8 sm:h-10 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-48 sm:w-64 mb-3 sm:mb-4 animate-pulse" />
        <div className="h-5 sm:h-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full max-w-md animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Skeleton */}
          <div className="lg:col-span-1 space-y-4">
            <div className="h-7 sm:h-8 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-28 sm:w-32 mb-4 animate-pulse" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="h-11 sm:h-12 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>

          {/* Cars Grid Skeleton */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4 hover:shadow-md transition-shadow duration-300 animate-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'backwards' }}
                >
                  <div className="h-44 sm:h-48 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse" />
                  <div className="h-4 sm:h-5 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-3 sm:h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-8 sm:h-9 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg flex-1 animate-pulse" />
                    <div className="h-8 sm:h-9 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg flex-1 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CarDetailsSkeleton() {
  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="h-10 sm:h-12 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-full max-w-md mb-3 sm:mb-4 animate-pulse" />
        <div className="h-5 sm:h-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-48 sm:w-64 animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2 space-y-4">
            <div className="h-64 sm:h-80 lg:h-96 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse" />
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="h-20 sm:h-24 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-5 sm:space-y-6">
            <div className="h-9 sm:h-10 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-full animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i} 
                  className="h-5 sm:h-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
            <div className="h-11 sm:h-12 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse" />
            <div className="h-11 sm:h-12 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mt-8 sm:mt-10">
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="h-9 sm:h-10 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-24 sm:w-32 animate-pulse"
              />
            ))}
          </div>
          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="h-5 sm:h-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContentPageSkeleton() {
  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Hero Skeleton */}
      <div className="relative bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-gray-300/30 to-transparent animate-pulse" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-10 sm:h-12 bg-white/40 backdrop-blur-sm rounded-lg w-64 sm:w-96 mb-3 sm:mb-4 mx-auto animate-pulse" />
          <div className="h-5 sm:h-6 bg-white/40 backdrop-blur-sm rounded w-full max-w-md sm:max-w-2xl mx-auto animate-pulse" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className="space-y-3 sm:space-y-4 animate-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'backwards' }}
            >
              <div className="h-7 sm:h-8 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-48 sm:w-64 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactPageSkeleton() {
  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Hero Skeleton */}
      <div className="relative bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-gray-300/30 to-transparent animate-pulse" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-10 sm:h-12 bg-white/40 backdrop-blur-sm rounded-lg w-48 sm:w-64 mb-3 sm:mb-4 mx-auto animate-pulse" />
          <div className="h-5 sm:h-6 bg-white/40 backdrop-blur-sm rounded w-64 sm:w-96 mx-auto animate-pulse" />
        </div>
      </div>

      {/* Contact Content Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div className="animate-in slide-in-from-left-4">
                <div className="h-7 sm:h-8 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-40 sm:w-48 mb-3 sm:mb-4 animate-pulse" />
                <div className="h-5 sm:h-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-pulse" />
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="flex gap-4 p-4 sm:p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 animate-in slide-in-from-left-4"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'backwards' }}
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 sm:h-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-28 sm:w-32 animate-pulse" />
                    <div className="h-3 sm:h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-40 sm:w-48 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 animate-in slide-in-from-right-4" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
              <div className="h-7 sm:h-8 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-40 sm:w-48 mb-5 sm:mb-6 animate-pulse" />
              <div className="space-y-4 sm:space-y-5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="space-y-2"
                  >
                    <div className="h-3 sm:h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 sm:w-24 animate-pulse" />
                    <div className="h-11 sm:h-12 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse" />
                  </div>
                ))}
                <div className="h-11 sm:h-12 bg-linear-to-br from-gray-300 via-gray-200 to-gray-300 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DefaultPageSkeleton() {
  return (
    <div className="w-full min-h-[calc(100vh-400px)] animate-in fade-in duration-300">
      {/* Hero Skeleton */}
      <div className="relative bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-gray-300/30 to-transparent animate-pulse" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-10 sm:h-12 bg-white/40 backdrop-blur-sm rounded-lg w-64 sm:w-96 mb-3 sm:mb-4 mx-auto animate-pulse" />
          <div className="h-5 sm:h-6 bg-white/40 backdrop-blur-sm rounded w-full max-w-md sm:max-w-2xl mx-auto animate-pulse" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-4 animate-in slide-in-from-left-4">
            <div className="h-7 sm:h-8 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-40 sm:w-48 animate-pulse" />
            <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-pulse" />
          </div>
          <div className="h-56 sm:h-64 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse animate-in slide-in-from-right-4" style={{ animationDelay: '150ms', animationFillMode: 'backwards' }} />
        </div>
      </div>
    </div>
  );
}
