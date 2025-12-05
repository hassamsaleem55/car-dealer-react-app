export function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navbar */}
        <div className="hidden lg:flex items-center justify-between h-20">
          {/* Logo Skeleton */}
          <div className="h-12 w-32 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse" />

          {/* Navigation Links Skeleton */}
          <div className="flex items-center gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="h-5 w-16 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse"
              />
            ))}
          </div>

          {/* CTA Button Skeleton */}
          <div className="h-10 w-32 bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg animate-pulse" />
        </div>

        {/* Mobile Navbar */}
        <div className="flex lg:hidden items-center justify-between h-16">
          {/* Logo Skeleton */}
          <div className="h-10 w-28 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse" />

          {/* Menu Button Skeleton */}
          <div className="h-10 w-10 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </header>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto animate-in fade-in duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Footer Columns */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 w-32 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div 
                    key={j} 
                    className="h-4 w-24 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="h-4 w-48 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="h-9 w-9 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

