import { useEffect, useState, useCallback } from "react";
import { ChevronRight } from "lucide-react";
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

export function StockListingOne() {
  const location = useLocation();
  const { dealerAuthToken } = useDealerContext();
  const { queryString, setQueryString } = useOutletContext<{
    queryString: string;
    setQueryString: (qs: string) => void;
  }>();
  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState<Array<any>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = location.search.startsWith("?")
      ? location.search.substring(1)
      : location.search;
    const fetchData = async () => {
      if (!dealerAuthToken) return;
      
      try {
        setLoading(true);
        const response = await fetchApi(
          `/stocks/list${searchParams ? `?${searchParams}` : ""}`,
          dealerAuthToken
        );

        setCarData([...processCarCardData(response.stockList)]);
      } catch (error) {
        console.error("Error fetching filters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search, dealerAuthToken]);

  const handleSortByChange = useCallback((value: string[]) => {
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
  }, [queryString, setQueryString, navigate, location]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* === Breadcrumb === */}
      <nav className="flex text-sm text-gray-500 gap-3" aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center space-x-1 sm:space-x-2 truncate">
          <li>
            <a href="/" className="hover:text-primary transition-colors">
              Home
            </a>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          <li className="font-semibold text-basicFont truncate max-w-[180px] sm:max-w-xs md:max-w-sm">
            Cars Listing
          </li>
        </ol>
      </nav>

      {/* === Main Content === */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* === Sidebar (Filters) === */}
        <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
          <FilterOne styles={FilterOneVerticalStyles} />
        </aside>

        {/* === Right Content === */}
        <section className="lg:col-span-3 space-y-4">
          {/* Header */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Browse All Cars
            </h2>

            <div className="w-full sm:w-48">
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
                  { id: 3, label: "Price (High to Low)", value: "price_desc" },
                  { id: 4, label: "Price (Low to High)", value: "price_asc" },
                ]}
                onChange={(value: string[]) => handleSortByChange(value)}
              />
            </div>
          </div>

          {/* === Car Listing Grid === */}
          <div className="md:bg-white md:rounded-2xl md:shadow-sm md:border md:border-gray-100 md:p-5">
            {loading ? (
              <div className="flex items-center justify-center h-[60vh]">
                <DotLoader size="lg" />
              </div>
            ) : carData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {carData.map((item, index) => (
                  <MotionReveal key={item.id ?? index} once preset="slideLeft">
                    <CarCardOne car={item} styles={CarCardStyles} />
                  </MotionReveal>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[40vh] text-gray-500 text-base">
                No cars found matching your filters.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
