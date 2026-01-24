import { useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterState } from "./useEventFilters";

const initialFilters: FilterState = {
  searchQuery: "",
  selectedCategory: "All",
  sortBy: "date-asc",
  budgetRange: [0, 10000000],
  dateRange: { from: "", to: "" },
  location: "",
};

export const useFilterUrlSync = (
  filters: FilterState,
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void,
  setFilters: (filters: FilterState) => void
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialMount = useRef(true);
  const isUpdatingFromUrl = useRef(false);

  // Parse URL params on mount and when URL changes
  useEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;

    const urlFilters: Partial<FilterState> = {};

    const search = searchParams.get("q");
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const budgetMin = searchParams.get("budgetMin");
    const budgetMax = searchParams.get("budgetMax");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    const location = searchParams.get("location");

    if (search) urlFilters.searchQuery = search;
    if (category) urlFilters.selectedCategory = category;
    if (sort) urlFilters.sortBy = sort;
    if (budgetMin || budgetMax) {
      urlFilters.budgetRange = [
        budgetMin ? parseInt(budgetMin, 10) : 0,
        budgetMax ? parseInt(budgetMax, 10) : 10000000,
      ];
    }
    if (dateFrom || dateTo) {
      urlFilters.dateRange = {
        from: dateFrom || "",
        to: dateTo || "",
      };
    }
    if (location) urlFilters.location = location;

    if (Object.keys(urlFilters).length > 0) {
      isUpdatingFromUrl.current = true;
      setFilters({ ...initialFilters, ...urlFilters });
      setTimeout(() => {
        isUpdatingFromUrl.current = false;
      }, 100);
    }
  }, [searchParams, setFilters]);

  // Sync filters to URL when they change
  useEffect(() => {
    if (isUpdatingFromUrl.current) return;

    const params = new URLSearchParams();

    if (filters.searchQuery) params.set("q", filters.searchQuery);
    if (filters.selectedCategory !== "All") params.set("category", filters.selectedCategory);
    if (filters.sortBy !== "date-asc") params.set("sort", filters.sortBy);
    if (filters.budgetRange[0] > 0) params.set("budgetMin", filters.budgetRange[0].toString());
    if (filters.budgetRange[1] < 10000000) params.set("budgetMax", filters.budgetRange[1].toString());
    if (filters.dateRange.from) params.set("dateFrom", filters.dateRange.from);
    if (filters.dateRange.to) params.set("dateTo", filters.dateRange.to);
    if (filters.location) params.set("location", filters.location);

    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const getShareableUrl = useCallback(() => {
    const params = new URLSearchParams();

    if (filters.searchQuery) params.set("q", filters.searchQuery);
    if (filters.selectedCategory !== "All") params.set("category", filters.selectedCategory);
    if (filters.sortBy !== "date-asc") params.set("sort", filters.sortBy);
    if (filters.budgetRange[0] > 0) params.set("budgetMin", filters.budgetRange[0].toString());
    if (filters.budgetRange[1] < 10000000) params.set("budgetMax", filters.budgetRange[1].toString());
    if (filters.dateRange.from) params.set("dateFrom", filters.dateRange.from);
    if (filters.dateRange.to) params.set("dateTo", filters.dateRange.to);
    if (filters.location) params.set("location", filters.location);

    const base = window.location.origin + window.location.pathname;
    const queryString = params.toString();
    return queryString ? `${base}?${queryString}` : base;
  }, [filters]);

  return { getShareableUrl };
};
