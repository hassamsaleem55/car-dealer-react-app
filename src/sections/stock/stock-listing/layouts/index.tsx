import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import { useDealerContext } from "@core-dir/dealer-provider";
import MotionReveal from "@components-dir/framer-motion/motion-reveal";
import DotLoader from "@components-dir/loader";
import FilterOne from "@components-dir/filter/filter-one";
import FilterOneVerticalStyles from "@components-dir/filter/filter-one/css/vertical.module.css";
import CarCardOne from "@components-dir/car-card/car-card-one";
import CarCardStyles from "@components-dir/car-card/car-card-one/css/default.module.css";
import { fetchApi } from "@core-dir/services/Api.service";
import { processCarCardData } from "@core-dir/helpers/CarCardDataProcessor";
import DropdownFlexible from "@elements-dir/dropdown";
import FinanceRepresentation from "@components-dir/finance-representation";

export function StockListingOne() {
  const location = useLocation();
  const { dealerData, dealerAuthToken } = useDealerContext();
  const { queryString, setQueryString } = useOutletContext<{
    queryString: string;
    setQueryString: (qs: string) => void;
  }>();
  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState<Array<any>>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isInitialLoading = loading && currentPage === 1;
  const PageSize = 9;
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
    setCarData([]);
  }, [location.search]);

  useEffect(() => {
    const searchParams = location.search.startsWith("?")
      ? location.search.substring(1)
      : location.search;

    const fetchData = async () => {
      if (!dealerAuthToken) return;
      if (!hasMore && currentPage !== 1) return;
      try {
        setLoading(true);

        const response = await fetchApi(
          `/stocks/list?CurrentPage=${currentPage}&PageSize=${PageSize}${
            searchParams ? `&${searchParams}` : ""
          }`,
          dealerAuthToken
        );

        const processedData = await processCarCardData(
          response.stockList || []
        );

        setCarData((prev) =>
          currentPage === 1 ? processedData : [...prev, ...processedData]
        );

        if (processedData.length < PageSize) {
          setHasMore(false);
        }

        setTotalRecords(response.totalRecords);
      } catch (error) {
        console.error("Error fetching stock list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, location.search, dealerAuthToken, hasMore]);

  useEffect(() => {
    if (!loaderRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCurrentPage((prev) => prev + 1);
      }
    });

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore]);

  const handleSortByChange = useCallback(
    (value: string[]) => {
      const params = new URLSearchParams(queryString);
      const cat = "sortby";

      params.delete(cat);
      value.forEach((v) => params.append(cat, v));

      const updatedQueryString = params.toString();
      setQueryString(updatedQueryString);

      if (location.pathname.startsWith("/stock")) {
        const newUrl = `/stock${
          updatedQueryString ? `?${updatedQueryString}` : ""
        }`;
        if (location.pathname + location.search !== newUrl) {
          navigate(newUrl, { replace: true });
        }
      }
    },
    [queryString, setQueryString, navigate, location]
  );

  return (
    <div className="container mx-auto px-4 py-4 md:py-6 md:space-y-6">
      <nav
        className="flex text-xs md:text-sm text-gray-500 gap-3"
        aria-label="breadcrumb"
      >
        <ol className="flex flex-wrap items-center space-x-1 sm:space-x-2 truncate">
          <li>
            <a
              href="/"
              className="hover:text-primary hover:font-semibold transition-all duration-200"
            >
              Home
            </a>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <li className="font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent truncate max-w-[180px] sm:max-w-xs md:max-w-sm">
            Cars Listing
          </li>
        </ol>
      </nav>

      <div className="lg:hidden sticky top-12.5 z-30 bg-transparent backdrop-blur-xs py-2 -mx-4 mt-3 px-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-primary-no-hover w-full px-4 py-2 rounded-sm transition-transform duration-200 active:scale-95"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="relative w-5 h-5">
              <SlidersHorizontal
                size={20}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  showFilters
                    ? "rotate-180 opacity-0 scale-0"
                    : "rotate-0 opacity-100 scale-100"
                }`}
              />
              <X
                size={20}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  showFilters
                    ? "rotate-0 opacity-100 scale-100"
                    : "-rotate-180 opacity-0 scale-0"
                }`}
              />
            </div>
            <span className="transition-all duration-500 ease-in-out">
              {showFilters ? "Hide Filters" : "Show Filters"}
            </span>
          </div>
        </button>
      </div>

      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          showFilters
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
            showFilters ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setShowFilters(false)}
        />

        <div
          className={`absolute inset-x-0 top-[120px] bottom-0 bg-white overflow-y-auto transition-transform duration-500 ease-out ${
            showFilters ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="sticky top-0 flex justify-end z-10 mb-4">
            <button
              onClick={() => setShowFilters(false)}
              className="px-2 py-2 bg-primary text-white rounded-bl-xl shadow-2xl"
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
          </div>
          <FilterOne
            setShowFilters={setShowFilters}
            styles={FilterOneVerticalStyles}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <aside className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24 h-fit">
          <FilterOne styles={FilterOneVerticalStyles} />
        </aside>

        <section className="lg:col-span-3 space-y-2">
          {dealerData.FCANumber && (
            <>
              <FinanceRepresentation
                totalCash={37537}
                deposit={3527}
                apr={5.9}
                nbrOfMonths={24}
                currencySymbol="£"
                financeType="PCP"
              />
            </>
          )}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                {`Browse All ${!loading ? totalRecords : ""} Cars`}
              </h2>
              <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-3 w-full sm:w-auto">
                {/* <div className="relative flex-1 sm:flex-initial sm:min-w-60">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-9 pr-9 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none placeholder:text-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-primary transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div> */}
                <div className="w-full sm:w-56">
                  <DropdownFlexible
                    category="Sort By"
                    options={[
                      {
                        id: 1,
                        label: "Mileage (High to Low)",
                        value: "mileage_desc",
                      },
                      {
                        id: 2,
                        label: "Mileage (Low to High)",
                        value: "mileage_asc",
                      },
                      {
                        id: 3,
                        label: "Price (High to Low)",
                        value: "price_desc",
                      },
                      {
                        id: 4,
                        label: "Price (Low to High)",
                        value: "price_asc",
                      },
                    ]}
                    onChange={(value: string[]) => handleSortByChange(value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {isInitialLoading ? (
            <div className="flex items-center justify-center h-[60vh]">
              <DotLoader size="lg" />
            </div>
          ) : carData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
                {carData.map((item, index) => (
                  <MotionReveal key={item.id ?? index} preset="slideLeft">
                    <div className="h-full flex flex-col">
                      <CarCardOne car={item} styles={CarCardStyles} />
                    </div>
                  </MotionReveal>
                ))}
              </div>

              {loading && currentPage > 1 && (
                <div className="flex justify-center py-10">
                  <DotLoader size="md" />
                </div>
              )}

              {!loading && hasMore && <div ref={loaderRef} className="h-10" />}
            </>
          ) : (
            <div className="flex items-center justify-center h-[40vh] text-gray-500 text-base">
              No cars found matching your filters.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
