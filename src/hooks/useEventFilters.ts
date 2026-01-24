import { useState, useMemo, useCallback } from "react";
import { Event } from "@/lib/data";

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  budgetRange: [number, number];
  dateRange: { from: string; to: string };
  location: string;
}

export const initialFilters: FilterState = {
  searchQuery: "",
  selectedCategory: "All",
  sortBy: "date-asc",
  budgetRange: [0, 10000000],
  dateRange: { from: "", to: "" },
  location: "",
};

export const useEventFilters = (events: Event[]) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const setFiltersDirectly = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.selectedCategory !== "All") count++;
    if (filters.budgetRange[0] > 0 || filters.budgetRange[1] < 10000000) count++;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    if (filters.location) count++;
    return count;
  }, [filters]);

  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (event) =>
          event.name.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (filters.selectedCategory !== "All") {
      result = result.filter((event) => event.category === filters.selectedCategory);
    }

    // Filter by budget range
    result = result.filter((event) => {
      const totalBudget = Object.values(event.budget).reduce((sum, val) => sum + val, 0);
      return totalBudget >= filters.budgetRange[0] && totalBudget <= filters.budgetRange[1];
    });

    // Filter by date range
    if (filters.dateRange.from) {
      const fromDate = new Date(filters.dateRange.from).getTime();
      result = result.filter((event) => new Date(event.date).getTime() >= fromDate);
    }
    if (filters.dateRange.to) {
      const toDate = new Date(filters.dateRange.to).getTime();
      result = result.filter((event) => new Date(event.date).getTime() <= toDate);
    }

    // Filter by location
    if (filters.location) {
      const locationQuery = filters.location.toLowerCase();
      result = result.filter((event) =>
        event.location.toLowerCase().includes(locationQuery)
      );
    }

    // Sort
    result.sort((a, b) => {
      const totalA = Object.values(a.budget).reduce((sum, val) => sum + val, 0);
      const totalB = Object.values(b.budget).reduce((sum, val) => sum + val, 0);

      switch (filters.sortBy) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "price-asc":
          return totalA - totalB;
        case "price-desc":
          return totalB - totalA;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return result;
  }, [events, filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredEvents,
    activeFilterCount,
    setFiltersDirectly,
  };
};
