export function HomeSkeleton() {
  return (
    <div className="w-full">
      {/* Hero Section Skeleton */}
      <div className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden bg-linear-to-br from-gray-100 via-gray-50 to-gray-100">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-gray-200/40 to-transparent animate-pulse" />
          <div
            className="absolute top-0 left-0 w-72 h-72 bg-gray-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "200ms" }}
          />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-gray-300/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "400ms" }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-700/10 via-gray-700/20 to-gray-700/40" />

        {/* Shimmer Effect */}
        <div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-in slide-in-from-left-full duration-1500 repeat-infinite"
          style={{ animationDelay: "500ms" }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-center h-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
          {/* Heading Skeleton */}
          <div
            className="text-center max-w-5xl mx-auto space-y-6 sm:space-y-8 mt-24 md:mt-0 mb-18 animate-in fade-in"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            {/* Main Heading Lines */}
            <div className="space-y-4">
              <div className="h-14 sm:h-20 lg:h-24 w-70 md:w-4xl bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 rounded-3xl mx-auto shadow-2xl border border-gray-200/50 animate-pulse" />
              <div
                className="block md:hidden h-14 sm:h-20 lg:h-24 w-65 max-w-3xl bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 rounded-3xl mx-auto shadow-xl border border-gray-200/50 animate-pulse"
                style={{ animationDelay: "150ms" }}
              />
            </div>

            {/* Subheading */}
            <div className="flex flex-col items-center gap-3 pt-4">
              <div
                className="h-6 sm:h-7 w-50 md:w-2xl bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-2xl shadow-lg border border-gray-200/30 animate-pulse"
                style={{ animationDelay: "200ms" }}
              />
              <div
                className="block md:hidden h-6 sm:h-7 w-45 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-2xl shadow-lg border border-gray-200/30 animate-pulse"
                style={{ animationDelay: "250ms" }}
              />
            </div>
          </div>

          {/* Filter Skeleton - Horizontal (Desktop) */}
          <div
            className="hidden md:flex max-w-7xl mx-auto bg-white/98 backdrop-blur-xl p-7 rounded-3xl shadow-2xl gap-4 items-end border border-gray-100/50 animate-in slide-in-from-bottom-8"
            style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className="flex-1 space-y-2.5 animate-in fade-in"
                style={{
                  animationDelay: `${350 + i * 50}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div className="h-4 w-32 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-pulse" />
                <div className="h-12 bg-linear-to-r from-gray-100 via-gray-50 to-gray-100 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow duration-300 animate-pulse" />
              </div>
            ))}
            <div className="h-12 w-36 bg-linear-to-r from-primary/30 via-primary/20 to-primary/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse" />
          </div>

          {/* Filter Skeleton - Mobile */}
          <div
            className="md:hidden bg-white/98 backdrop-blur-xl p-6 rounded-3xl shadow-2xl space-y-4 border border-gray-100/50 animate-in slide-in-from-bottom-8"
            style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="space-y-2.5 animate-in fade-in"
                style={{
                  animationDelay: `${350 + i * 70}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div className="h-4 w-28 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-pulse" />
                <div className="h-12 bg-linear-to-r from-gray-100 via-gray-50 to-gray-100 rounded-xl border border-gray-200/50 shadow-sm animate-pulse" />
              </div>
            ))}
            <div className="h-12 w-full bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Featured Cars Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div
          className="text-center mb-12 sm:mb-16 space-y-3 animate-in fade-in"
          style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
        >
          <div className="h-8 sm:h-10 w-56 sm:w-72 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100/50 p-5 sm:p-6 space-y-5 hover:shadow-xl hover:border-gray-200/80 transition-all duration-500 animate-in slide-in-from-bottom-6"
              style={{
                animationDelay: `${200 + i * 80}ms`,
                animationFillMode: "backwards",
              }}
            >
              <div className="relative h-48 sm:h-52 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-gray-300/20 to-transparent" />
              </div>
              <div className="space-y-3">
                <div className="h-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse w-4/5" />
                <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-3/5" />
                <div className="flex gap-2 pt-2">
                  <div className="h-9 flex-1 bg-linear-to-r from-gray-200 via-gray-200 to-gray-200 rounded-lg animate-pulse" />
                  <div className="h-9 w-9 bg-linear-to-r from-gray-200 via-gray-200 to-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Listing Section */}
      <div className="bg-linear-to-b from-gray-50/50 to-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-12 space-y-2 animate-in fade-in"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div className="h-7 sm:h-8 w-48 sm:w-56 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse mx-auto" />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div
                key={i}
                className="bg-white h-20 sm:h-24 bg-linear-to-br from-gray-100 via-white to-gray-100 rounded-xl border border-gray-100/50 animate-pulse hover:scale-105 hover:shadow-md transition-all duration-500 animate-in zoom-in"
                style={{
                  animationDelay: `${200 + i * 50}ms`,
                  animationFillMode: "backwards",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Body Type Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div
          className="text-center mb-12 space-y-2 animate-in fade-in"
          style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
        >
          <div className="h-7 sm:h-8 w-56 sm:w-64 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse mx-auto" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 space-y-4 hover:shadow-lg transition-all duration-500 animate-in zoom-in"
              style={{
                animationDelay: `${200 + i * 60}ms`,
                animationFillMode: "backwards",
              }}
            >
              <div className="h-16 sm:h-20 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse" />
              <div className="h-5 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-linear-to-b from-white via-gray-50/30 to-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-12 sm:mb-16 space-y-4 animate-in fade-in"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div className="h-8 sm:h-10 w-72 sm:w-96 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse mx-auto" />
            <div className="h-5 w-64 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="text-center space-y-3 animate-in zoom-in"
                style={{
                  animationDelay: `${200 + i * 80}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div className="h-16 sm:h-20 w-16 sm:w-20 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse mx-auto" />
                <div className="h-8 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse w-20 mx-auto" />
                <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AA Banner Section */}
      <div className="bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 py-12 sm:py-16 animate-pulse">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 space-y-3">
              <div className="h-8 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 rounded-xl w-64" />
              <div className="h-5 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg w-48" />
            </div>
            <div className="h-12 w-32 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Trusted Partners Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div
          className="text-center mb-12 space-y-3 animate-in fade-in"
          style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
        >
          <div className="h-8 sm:h-9 w-56 sm:w-64 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse mx-auto" />
          <div className="h-5 w-72 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse mx-auto" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100/50 p-6 h-24 animate-pulse hover:shadow-lg transition-all duration-500 animate-in zoom-in"
              style={{
                animationDelay: `${200 + i * 50}ms`,
                animationFillMode: "backwards",
              }}
            />
          ))}
        </div>
      </div>

      {/* Right Choice Section */}
      <div className="bg-linear-to-b from-gray-50/50 to-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-12 sm:mb-16 space-y-4 animate-in fade-in"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div className="h-8 sm:h-10 w-80 sm:w-96 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse mx-auto" />
            <div className="h-5 w-64 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 sm:p-8 space-y-4 hover:shadow-xl transition-all duration-500 animate-in slide-in-from-bottom-6"
                style={{
                  animationDelay: `${200 + i * 100}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div className="h-12 w-12 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse" />
                <div className="h-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ready Set Sold Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div
          className="text-center mb-12 sm:mb-16 space-y-4 animate-in fade-in"
          style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
        >
          <div className="h-8 sm:h-10 w-64 sm:w-80 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse mx-auto" />
          <div className="h-5 w-72 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6 sm:p-8 space-y-4 hover:shadow-xl transition-all duration-500 animate-in slide-in-from-bottom-6"
              style={{
                animationDelay: `${200 + i * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              <div className="absolute -top-4 left-6 h-10 w-10 bg-linear-to-br from-gray-300 via-gray-200 to-gray-300 rounded-full animate-pulse" />
              <div className="pt-4 space-y-4">
                <div className="h-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse w-2/3" />
                <div className="space-y-2">
                  <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse w-4/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StockSkeleton() {
  return (
    <div className="w-full bg-linear-to-b from-gray-50/30 to-white min-h-screen">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div
            className="space-y-4 animate-in fade-in"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div className="h-4 md:h-6 sm:h-11 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl w-56 sm:w-72 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Filters Skeleton */}
          <div className="lg:col-span-1">
            <div
              className="bg-white rounded-2xl border border-gray-100/50 p-6 space-y-5 sticky top-24 animate-in slide-in-from-left-6"
              style={{
                animationDelay: "200ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="h-7 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-24 animate-pulse" />
                <div className="h-5 w-16 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
              </div>

              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-12 bg-linear-to-r from-gray-100 via-gray-50 to-gray-100 rounded-xl border border-gray-100/50 animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Cars Grid Skeleton */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden hover:shadow-xl hover:border-gray-200/80 transition-all duration-500 animate-in slide-in-from-bottom-6"
                  style={{
                    animationDelay: `${300 + i * 50}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <div className="relative h-48 sm:h-52 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-gray-300/20 to-transparent" />
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="space-y-2">
                      <div className="h-6 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-4/5 animate-pulse" />
                      <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-2/3 animate-pulse" />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <div className="h-10 bg-linear-to-r from-gray-200 via-gray-200 to-gray-200 rounded-xl flex-1 animate-pulse" />
                      <div className="h-10 w-10 bg-linear-to-r from-gray-200 via-gray-200 to-gray-200 rounded-xl animate-pulse" />
                    </div>
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
    <div className="w-full bg-linear-to-b from-gray-50/30 to-white">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div
            className="space-y-4 animate-in fade-in"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div className="h-4 md:h-6 sm:h-11 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl w-56 sm:w-72 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Image Gallery */}
          <div
            className="lg:col-span-2 space-y-4 sm:space-y-6 animate-in slide-in-from-left-6"
            style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
          >
            <div className="relative h-72 sm:h-96 lg:h-[500px] bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 rounded-2xl animate-pulse overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-linear-to-t from-gray-300/30 to-transparent" />
            </div>

            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-20 sm:h-28 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 rounded-xl border border-gray-100/50 animate-pulse hover:scale-105 hover:shadow-md transition-all duration-500"
                />
              ))}
            </div>
          </div>

          {/* Right Column - Details Card */}
          <div
            className="lg:col-span-1 animate-in slide-in-from-right-6"
            style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
          >
            <div className="bg-white rounded-2xl border border-gray-100/50 p-6 sm:p-8 space-y-6 sticky top-24 shadow-sm">
              <div className="h-10 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl w-full animate-pulse" />

              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-linear-to-r from-gray-200 via-gray-200 to-gray-200 rounded-full animate-pulse shrink-0" />
                    <div className="h-5 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded flex-1 animate-pulse" />
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4">
                <div className="h-14 bg-linear-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl animate-pulse" />
                <div className="h-14 bg-linear-to-r from-gray-200 via-gray-200 to-gray-200 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div
          className="mt-12 sm:mt-16 bg-white rounded-2xl border border-gray-100/50 p-6 sm:p-8 shadow-sm animate-in slide-in-from-bottom-6"
          style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
        >
          <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-gray-100">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-11 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl w-28 sm:w-36 animate-pulse"
              />
            ))}
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-5 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse"
                style={{ width: `${100 - i * 8}%` }}
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
    <div className="w-full bg-linear-to-b from-white via-gray-50/20 to-white">
      {/* Hero Header */}
      <div className="relative bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 py-56 overflow-hidden">
        {/* <div className="absolute inset-0 bg-linear-to-t from-gray-300/40 to-transparent animate-pulse" /> */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-700/10 via-gray-700/20 to-gray-700/40" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div
            className="space-y-4 animate-in fade-in"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div className="h-12 sm:h-14 bg-white/50 backdrop-blur-md rounded-xl w-72 sm:w-96 mx-auto animate-pulse shadow-sm" />
            <div className="h-6 bg-white/30 backdrop-blur-sm rounded-lg w-full max-w-lg sm:max-w-2xl mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100/50 p-6 sm:p-8 space-y-5 shadow-sm hover:shadow-md transition-shadow duration-500 animate-in slide-in-from-bottom-6"
              style={{
                animationDelay: `${200 + i * 100}ms`,
                animationFillMode: "backwards",
              }}
            >
              <div className="h-8 sm:h-9 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl w-56 sm:w-72 animate-pulse" />
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse"
                    style={{ width: `${100 - j * 15}%` }}
                  />
                ))}
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
    <div className="w-full bg-linear-to-b from-white via-gray-50/20 to-white">
      {/* Hero Header */}
      <div className="relative bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 py-56 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-gray-700/10 via-gray-700/20 to-gray-700/40" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div
            className="space-y-4 animate-in fade-in"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div className="h-12 sm:h-14 bg-white/50 backdrop-blur-md rounded-xl w-56 sm:w-72 mx-auto animate-pulse shadow-sm" />
            <div className="h-6 bg-white/30 backdrop-blur-sm rounded-lg w-72 sm:w-96 mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left Column - Contact Info Cards */}
            <div
              className="space-y-6 sm:space-y-8 animate-in slide-in-from-left-6"
              style={{
                animationDelay: "200ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="space-y-3">
                <div className="h-8 sm:h-9 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl w-48 sm:w-56 animate-pulse" />
                <div className="h-5 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-full max-w-md animate-pulse" />
              </div>

              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex gap-5 p-5 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-lg hover:border-gray-200/80 transition-all duration-500 animate-in slide-in-from-left-4"
                  style={{
                    animationDelay: `${300 + i * 80}ms`,
                    animationFillMode: "backwards",
                  }}
                >
                  <div className="w-14 h-14 bg-linear-to-br from-primary/20 via-primary/10 to-primary/5 rounded-xl animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2.5">
                    <div className="h-6 bg-linear-to-r from-gray-200 via-gray-200 to-gray-200 rounded-lg w-32 sm:w-36 animate-pulse" />
                    <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-44 sm:w-52 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Contact Form */}
            <div
              className="bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-gray-100/50 animate-in slide-in-from-right-6"
              style={{
                animationDelay: "400ms",
                animationFillMode: "backwards",
              }}
            >
              <div className="h-8 sm:h-9 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl w-44 sm:w-52 mb-8 animate-pulse" />

              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-2.5">
                    <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 sm:w-28 animate-pulse" />
                    <div className="h-12 sm:h-13 bg-linear-to-r from-gray-100 via-gray-50 to-gray-100 rounded-xl border border-gray-100/50 animate-pulse" />
                  </div>
                ))}

                <div className="pt-4">
                  <div className="h-13 sm:h-14 bg-linear-to-r from-primary/30 via-primary/20 to-primary/30 rounded-xl animate-pulse" />
                </div>
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
    <div className="w-full min-h-[calc(100vh-400px)] bg-linear-to-b from-white via-gray-50/20 to-white">
      {/* Hero Header */}
      <div className="relative bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-gray-300/40 to-transparent animate-pulse" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div
            className="space-y-4 animate-in fade-in"
            style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
          >
            <div className="h-12 sm:h-14 bg-white/50 backdrop-blur-md rounded-xl w-72 sm:w-96 mx-auto animate-pulse shadow-sm" />
            <div className="h-6 bg-white/30 backdrop-blur-sm rounded-lg w-full max-w-lg sm:max-w-2xl mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div
            className="space-y-6 animate-in slide-in-from-left-6"
            style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
          >
            <div className="h-9 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl w-48 sm:w-56 animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse"
                  style={{ width: `${100 - i * 12}%` }}
                />
              ))}
            </div>
          </div>

          <div
            className="h-64 sm:h-80 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 rounded-2xl animate-pulse shadow-sm animate-in slide-in-from-right-6"
            style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
          >
            <div className="h-full w-full bg-linear-to-t from-gray-300/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
