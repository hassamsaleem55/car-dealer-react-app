import { memo } from "react";
import {
  Link,
  useOutletContext,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Search } from "lucide-react";
import DropdownFlexible from "@elements-dir/dropdown";
import DotLoader from "@components-dir/loader";
import Button from "@elements-dir/button";

function FilterOne({ styles }: { styles: any }) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    queryString,
    setQueryString,
    filtersData,
    filtersLoading,
    filtersFirstLoad,
  } = useOutletContext<{
    queryString: string;
    setQueryString: (qs: string) => void;
    filtersData: Array<any>;
    filtersLoading: boolean;
    filtersFirstLoad: boolean;
  }>();
  const isStockPage = location.pathname.toLowerCase().startsWith("/stock");
  const getSelectedFromQuery = (filterKey: string) => {
    const params = new URLSearchParams(location.search);
    const cat = filterKey.toLowerCase();
    const selectedParams = params.getAll(cat).map((v) => v.toLowerCase());
    return selectedParams;
  };

  const handleFilterChange = (filterKey: string, selectedValues: string[]) => {
    const params = new URLSearchParams(queryString);
    const cat = filterKey.toLowerCase();

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
        {filtersFirstLoad && filtersLoading ? (
          <div className="flex justify-center items-center py-6">
            <DotLoader size="sm" />
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

            {filtersData.map(({ filterName, filterKey, options, total }) => (
              <DropdownFlexible
                key={filterKey}
                category={`${filterName} ${isStockPage ? `(${total})` : ""}`}
                options={options}
                onChange={(values: string[]) =>
                  handleFilterChange(filterKey, values)
                }
                multiSelect
                searchable={isStockPage}
                showTags={isStockPage}
                loading={filtersLoading && !filtersFirstLoad}
                defaultValue={getSelectedFromQuery(filterKey)}
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

export default memo(FilterOne);
