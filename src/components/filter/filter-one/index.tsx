import { useState, useEffect } from "react";
import {
  Link,
  useOutletContext,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Search } from "lucide-react";
import DropdownFlexible from "@elements-dir/dropdown";
import Button from "@elements-dir/button";
import { useDealerContext } from "@core-dir/dealer-provider";
import { fetchApi } from "@core-dir/services/Api.service";
import { transformFilterData } from "@core-dir/helpers/FilterDataProcessor";

export default function FilterOne({ styles }: { styles: any }) {
  const { dealerAuthToken, dealerData } = useDealerContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { queryString, setQueryString } = useOutletContext<{
    queryString: string;
    setQueryString: (qs: string) => void;
  }>();

  const [filtersData, setFiltersData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const isStockPage = location.pathname.toLowerCase().startsWith("/stock");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchApi(
          `/api/companies/${dealerData.CompanyId}/car-filters${
            queryString ? `?${queryString}` : ""
          }`,
          dealerAuthToken
        );
        const transformedData = transformFilterData(response);
        setFiltersData(transformedData);
      } catch (error) {
        console.error("Error fetching filters:", error);
      } finally {
        setLoading(false);
        setFirstLoad(false);
      }
    };

    fetchData();
  }, [queryString, dealerAuthToken]);

  const getSelectedFromQuery = (category: string) => {
    const params = new URLSearchParams(location.search);
    const cat = category.toLowerCase();
    const selectedParams = params.getAll(cat).map((v) => v.toLowerCase());
    return selectedParams;
  };

  const handleFilterChange = (category: string, selectedValues: string[]) => {
    const params = new URLSearchParams(queryString);
    const cat = category.toLowerCase();

    params.delete(cat);
    selectedValues.forEach((value) => params.append(cat, value.toLowerCase()));

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
  };

  return (
    <div className={styles["filter-container"]}>
      <div className={styles["filter-box"]}>
        {firstLoad && loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="w-5 h-5 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {isStockPage && (
              <div className="flex flex-row">
                <div className="grow text-lg font-semibold">
                  <h2>Filters</h2>
                </div>
                {/* <div className="flex-1 text-right cursor-pointer text-primary text-xs">
                  <h3>Reset All</h3>
                </div> */}
              </div>
            )}

            {filtersData.map(({ category, options, total }) => (
              <DropdownFlexible
                key={category}
                category={`${category} ${isStockPage ? `(${total})` : ""}`}
                options={options}
                onChange={(values: string[]) =>
                  handleFilterChange(category, values)
                }
                multiSelect
                searchable={isStockPage}
                showTags={isStockPage}
                loading={loading && !firstLoad}
                defaultValue={getSelectedFromQuery(category)}
              />
            ))}

            {!location.pathname.startsWith("/stock") && (
              <Link to={`/stock${queryString ? `?${queryString}` : ""}`}>
                <Button
                  variant="primary"
                  // btnText="Search Car"
                  btnIcon={<Search className="w-5 h-5" />}
                />
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
